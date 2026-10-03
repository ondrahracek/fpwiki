import { extractRPackages } from '~/utils/r-packages'

const WEBR_URL = 'https://webr.r-wasm.org/v0.6.0/webr.mjs'
const POST_MESSAGE_CHANNEL = 3

interface RObjectProxy {
  get(name: string): Promise<RObjectProxy>
  toString(): Promise<string>
}

interface Shelter {
  captureR(
    code: string,
    options: Record<string, unknown>,
  ): Promise<{ output: { type: string; data: unknown }[]; images: ImageBitmap[] }>
  purge(): Promise<void>
}

interface WebRInstance {
  init(): Promise<unknown>
  installPackages(packages: string[], options?: { quiet?: boolean }): Promise<void>
  Shelter: new () => Promise<Shelter>
}

export type RStatus = 'loading' | 'installing' | 'running'

export interface ROutputLine {
  type: 'stdout' | 'stderr' | 'message' | 'warning' | 'error'
  text: string
}

export interface RRunResult {
  output: ROutputLine[]
  images: ImageBitmap[]
}

let webRPromise: Promise<WebRInstance> | null = null
const installed = new Set<string>()
let queue: Promise<unknown> = Promise.resolve()

function loadWebR(): Promise<WebRInstance> {
  webRPromise ??= (async () => {
    const mod = (await import(/* @vite-ignore */ WEBR_URL)) as {
      WebR: new (options: Record<string, unknown>) => WebRInstance
    }
    const webR = new mod.WebR({ channelType: POST_MESSAGE_CHANNEL })
    await webR.init()
    return webR
  })().catch((err: unknown) => {
    webRPromise = null
    throw err
  })
  return webRPromise
}

async function conditionMessage(data: unknown): Promise<string> {
  try {
    return await (await (data as RObjectProxy).get('message')).toString()
  } catch {
    return String(data)
  }
}

async function toLine(item: { type: string; data: unknown }): Promise<ROutputLine> {
  switch (item.type) {
    case 'stdout':
    case 'stderr':
      return { type: item.type, text: String(item.data) }
    case 'message':
      return { type: 'message', text: (await conditionMessage(item.data)).replace(/\n$/, '') }
    case 'warning':
      return { type: 'warning', text: `Warning message:\n${await conditionMessage(item.data)}` }
    default:
      return { type: 'error', text: `Error: ${await conditionMessage(item.data)}` }
  }
}

async function execute(code: string, onStatus: (s: RStatus) => void): Promise<RRunResult> {
  onStatus('loading')
  const webR = await loadWebR()

  const missing = extractRPackages(code).filter((p) => !installed.has(p))
  if (missing.length) {
    onStatus('installing')
    await webR.installPackages(missing, { quiet: true })
    for (const p of missing) installed.add(p)
  }

  onStatus('running')
  const shelter = await new webR.Shelter()
  try {
    const { output, images } = await shelter.captureR(code, {
      withAutoprint: true,
      captureStreams: true,
      captureConditions: true,
      throwJsException: false,
      captureGraphics: { width: 640, height: 440 },
    })
    return { output: await Promise.all(output.map(toLine)), images }
  } finally {
    await shelter.purge()
  }
}

/** One webR instance per browser tab, loaded on first use; runs are serialised. */
export function useWebR() {
  function run(code: string, onStatus: (s: RStatus) => void): Promise<RRunResult> {
    if (!import.meta.client) return Promise.reject(new Error('webR runs only in the browser'))
    const next = queue.then(() => execute(code, onStatus))
    queue = next.catch(() => undefined)
    return next
  }
  return { run }
}
