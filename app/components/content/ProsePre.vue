<template>
  <div v-if="isR" ref="root" class="r-code">
    <RCodeRunner
      v-if="active && block"
      :code="(code ?? '').replace(/\n$/, '')"
      :block="block"
      @settled="state = 'live'"
      @reset="state = 'idle'"
    />
    <template v-else>
      <div class="r-code-toolbar">
        <span class="r-code-lang" aria-hidden="true">R</span>
        <UButton
          size="xs"
          variant="soft"
          icon="i-lucide-play"
          @click="state = 'pending'"
        >
          Spustit v prohlížeči
        </UButton>
      </div>
      <UiProsePre v-bind="{ ...$attrs, ...preProps }" :class="props.class"><slot /></UiProsePre>
    </template>
  </div>
  <UiProsePre
    v-else
    v-bind="{ ...$attrs, ...preProps }"
    :class="[props.class, { 'prose-pre-output': isOutput }]"
    ><slot
  /></UiProsePre>
</template>

<script setup lang="ts">
import UiProsePre from '@nuxt/ui/components/prose/Pre.vue'
import type { RBlock } from '~/utils/r-blocks'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  hideHeader?: boolean
  meta?: string
  class?: unknown
}>()

const preProps = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const isR = computed(() => props.language === 'r')
// MDC sets meta to '' for an explicit ```text fence and leaves it undefined
// for an untagged one, which it also reports as language 'text'.
const isOutput = computed(() => props.language === 'text' && props.meta !== undefined)

// The course's printed output is the next sibling block. It stays in place,
// dimmed, until the first browser run settles, then the live output replaces it.
type RunState = 'idle' | 'pending' | 'live'
const state = ref<RunState>('idle')
const active = computed(() => state.value !== 'idle')
const root = ref<HTMLElement>()

function staticOutput(): HTMLElement | null {
  const next = root.value?.nextElementSibling
  return next instanceof HTMLElement &&
    Array.from(next.children).some((c) => c.matches('pre.prose-pre-output'))
    ? next
    : null
}

// Running a block first runs the page's earlier blocks, so it sees their variables.
const block = shallowRef<RBlock>()
onMounted(() => {
  if (root.value) block.value = registerRBlock(root.value, (props.code ?? '').replace(/\n$/, ''))
})
onBeforeUnmount(() => block.value && unregisterRBlock(block.value))

watch(state, (s) => {
  const el = staticOutput()
  if (!el) return
  el.hidden = s === 'live'
  el.classList.toggle('r-output-pending', s === 'pending')
})
</script>
