<script setup lang="ts">
import CardEdit from './edit/CardEdit.vue'
import CardInfo from './Info/CardInfo.vue'
</script>

<template>
  <div>
    <h1 class="font-bold mb-4">Payment Options</h1>
    <div class="border border-default border-dashed rounded-base p-5">
      <h2 class="font-semibold mb-3">Saved Cards</h2>
      <CardInfo />
    </div>
  </div>
</template>
