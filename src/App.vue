<script setup lang="ts">
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'
import Toast from './components/ui/Toast.vue'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
  <Toast />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-form,
.fade-leave-to {
  opacity: 0;
}
</style>
