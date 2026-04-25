<template>
  <footer
    class="mt-16 border-t border-(--ui-border) bg-(--ui-bg-muted) py-8 text-sm text-(--ui-text-muted)"
  >
    <div
      class="mx-auto flex max-w-screen-xl flex-col items-start gap-3 px-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-2">
        <img src="/icons/icon-cut-512.png" alt="" width="24" height="24" class="size-6" />
        <span class="font-semibold text-(--ui-text-highlighted)">fpwiki</span>
      </div>
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span>
          Nejde o oficiální materiály FP VUT. Obsah je výběrový a slouží jako pomůcka ke studiu.
        </span>
        <a
          href="https://github.com/ondrahracek/fpwiki"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1 text-(--ui-text-muted) hover:text-(--ui-text-highlighted)"
        >
          <UIcon name="i-simple-icons-github" class="size-3.5" />
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>
