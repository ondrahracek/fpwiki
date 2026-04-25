<template>
  <UAlert
    v-if="!dismissed"
    color="secondary"
    variant="subtle"
    title="Neoficiální studijní materiály"
    description="fpwiki není oficiální web ani oficiální materiál FP VUT. Najdeš tu moje zápisky k vybraným předmětům, zpracované s pomocí AI. Obsah nemusí být kompletní ani bezchybný — ber ho jako pomůcku ke studiu."
    :close="{
      color: 'neutral',
      variant: 'link',
    }"
    @close="dismiss"
  />
</template>

<script setup lang="ts">
// Cookie-based, NOT localStorage — SSR sees the value before render so there's
// no flash of the banner for users who already dismissed it.
const cookie = useCookie<'1' | undefined>('fp-disclaimer-dismissed', {
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
})

const dismissed = computed(() => cookie.value === '1')

const dismiss = () => {
  cookie.value = '1'
}
</script>
