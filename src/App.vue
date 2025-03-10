<script lang="ts">
import { defineComponent } from 'vue'
import { useLayout } from './composables/useLayout'

export default defineComponent({
  name: 'App',
  setup() {
    const { layout } = useLayout()
    return { layout }
  },
})
</script>
<template>
  <component :is="layout || 'div'">
    <router-view></router-view>
  </component>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
* {
  font-family: 'Roboto', sans-serif;
}
</style>
