<template>
  <ClientOnly>
    <div class="pointer-events-none fixed inset-x-0 top-0 z-30 h-1 bg-(--ui-border)">
      <div
        class="h-full transition-[width] duration-150 ease-out"
        :style="{ width: progress + '%', backgroundImage: 'var(--gradient-fp)' }"
      />
    </div>
    <template #fallback>
      <div class="h-1" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const progress = ref(0)

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>
