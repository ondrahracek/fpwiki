<template>
  <div class="r-runner">
    <div class="r-code-toolbar">
      <span class="r-code-lang">R</span>
      <span class="r-runner-status" role="status">{{ statusText }}</span>
      <UButton
        size="xs"
        color="neutral"
        variant="ghost"
        icon="i-lucide-rotate-ccw"
        :disabled="busy"
        @click="emit('reset')"
      >
        Obnovit původní
      </UButton>
      <UButton size="xs" variant="soft" icon="i-lucide-play" :loading="busy" @click="run">
        Spustit znovu
      </UButton>
    </div>
    <label :for="textareaId" class="sr-only">Kód v R (upravitelný)</label>
    <textarea
      :id="textareaId"
      v-model="source"
      class="r-runner-editor"
      :rows="rows"
      spellcheck="false"
      autocapitalize="off"
      autocomplete="off"
      @keydown.enter.ctrl.prevent="run"
      @keydown.enter.meta.prevent="run"
    />

    <div aria-live="polite" :aria-busy="busy">
      <div v-if="ranOnce" class="r-runner-output" :class="{ 'r-runner-stale': busy }">
        <pre
          v-if="lines.length"
          class="r-runner-console"
        ><span v-for="(l, i) in lines" :key="i" :class="`r-out-${l.type}`">{{ l.text }}{{ l.text.endsWith('\n') ? '' : '\n' }}</span></pre>
        <p v-else-if="!images.length" class="r-runner-empty">Kód nevypsal žádný výstup.</p>
        <canvas
          v-for="(img, i) in images"
          :key="`${runId}-${i}`"
          :ref="(el) => draw(el as HTMLCanvasElement | null, img)"
          class="r-runner-plot"
          role="img"
          :aria-label="`Graf ${i + 1} z ${images.length}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ROutputLine, RStatus } from '~/composables/useWebR'
import type { RBlock } from '~/utils/r-blocks'

const props = defineProps<{ code: string; block: RBlock }>()
const emit = defineEmits<{ settled: []; reset: [] }>()

const textareaId = useId()
const source = ref(props.code)
const rows = computed(() => Math.max(3, source.value.split('\n').length))
const status = ref<RStatus | 'earlier' | null>(null)
const busy = computed(() => status.value !== null)
const lines = ref<ROutputLine[]>([])
const images = shallowRef<ImageBitmap[]>([])
const ranOnce = ref(false)
const runId = ref(0)

const statusText = computed(() => {
  switch (status.value) {
    case 'loading':
      return 'Načítám R…'
    case 'installing':
      return 'Instaluji balíčky…'
    case 'earlier':
      return 'Spouštím předchozí bloky…'
    case 'running':
      return 'Počítám…'
    default:
      return ''
  }
})

const { run: runR } = useWebR()

async function run() {
  if (busy.value) return
  status.value = 'loading'
  try {
    for (const earlier of claimEarlierRBlocks(props.block)) {
      await runR(earlier.code, (s) => (status.value = s === 'running' ? 'earlier' : s))
    }
    markRBlockRun(props.block, source.value)
    const res = await runR(source.value, (s) => (status.value = s))
    lines.value = res.output
    images.value = res.images
  } catch (err) {
    lines.value = [
      {
        type: 'error',
        text: `R se nepodařilo spustit: ${err instanceof Error ? err.message : String(err)}`,
      },
    ]
  } finally {
    status.value = null
    ranOnce.value = true
    runId.value++
    emit('settled')
  }
}

function draw(canvas: HTMLCanvasElement | null, img: ImageBitmap) {
  if (!canvas || canvas.dataset.drawn) return
  canvas.dataset.drawn = '1'
  canvas.width = img.width
  canvas.height = img.height
  canvas.getContext('2d')?.drawImage(img, 0, 0)
}

onMounted(run)
</script>
