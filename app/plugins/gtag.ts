/**
 * Google Analytics (gtag.js) injection.
 *
 * Universal plugin so the script tags land in prerendered HTML and analytics
 * loads on first paint. The gtag function itself only runs in the browser.
 *
 * No-op when runtimeConfig.public.gaId is empty or malformed — local dev,
 * forks of this open-source repo, and any deploy without NUXT_PUBLIC_GA_ID
 * set ship without analytics. Production sets the env var via App Hosting
 * Backend → Settings → Environment.
 *
 * Initial config passes send_page_view: false so the page:finish hook is the
 * single source of page_view events (the hook fires for the initial route
 * too, after document.title has been applied by useSeoMeta).
 */
const GA_ID_PATTERN = /^G-[A-Z0-9]+$/i

export default defineNuxtPlugin((nuxtApp) => {
  const gaId = useRuntimeConfig().public.gaId as string
  if (!GA_ID_PATTERN.test(gaId)) return

  useHead({
    script: [
      { src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true },
      {
        innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: false });`,
      },
    ],
  })

  if (import.meta.client) {
    nuxtApp.hook('page:finish', () => {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void }
      w.gtag?.('event', 'page_view', {
        page_path: window.location.pathname + window.location.search,
        page_location: window.location.href,
        page_title: document.title,
      })
    })
  }
})
