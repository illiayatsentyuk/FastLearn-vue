import { ref, markRaw } from 'vue'
import type { Component } from 'vue'

const layout = ref<Component | null>(null)

export function useLayout() {
  const setLayout = (newLayout: Component) => {
    layout.value = markRaw(newLayout)
  }

  return {
    layout,
    setLayout,
  }
}
