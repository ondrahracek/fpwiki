<template>
  <ClientOnly>
    <!-- z-50 so it sits above AppHeader (z-20 sticky + backdrop-blur stacking context). -->
    <div class="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-(--ui-border)">
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
// Listener lifecycle and state live in useReadingProgress; this component is
// only the top-of-page presentation. The rail chip subscribes to the same
// composable.
const { progress } = useReadingProgress()
</script>
