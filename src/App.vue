<script setup lang="ts">
import { initFlowbite } from 'flowbite'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Toast from './components/ui/Toast.vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

const route = useRoute()

const hideHeaderFooter = computed(() => {
  return route.meta.guest === true || route.meta.hideLayout === true
})

onMounted(() => {
  initFlowbite()
})
</script>

<template>
<div class="flex flex-col min-h-screen">

    <Header v-if="!hideHeaderFooter"/>

    <main class="grow">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>

    <Toast />

    <Footer v-if="!hideHeaderFooter"/>

  </div>
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
