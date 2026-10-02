<template>
  <div v-if="isR" class="r-code">
    <RCodeRunner v-if="active" :code="(code ?? '').replace(/\n$/, '')" />
    <template v-else>
      <div class="r-code-toolbar">
        <span class="r-code-lang" aria-hidden="true">R</span>
        <UButton
          size="xs"
          variant="soft"
          icon="i-lucide-play"
          @click="active = true"
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
const active = ref(false)
</script>
