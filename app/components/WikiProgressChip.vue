<template>
  <ClientOnly>
    <div class="px-2 pt-1 pb-2">
      <div class="h-1 overflow-hidden rounded bg-(--ui-bg-elevated)">
        <div
          class="h-full transition-[width] duration-150 ease-out"
          :style="{ width: progress + '%', backgroundImage: 'var(--gradient-fp)' }"
        />
      </div>
      <div class="mt-1 text-xs text-(--ui-text-muted)">přečteno {{ Math.round(progress) }} %</div>
    </div>
    <template #fallback>
      <div class="px-2 pt-1 pb-2">
        <div class="h-1 rounded bg-(--ui-bg-elevated)" />
        <div class="mt-1 h-4" />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const { progress } = useReadingProgress()
</script>
