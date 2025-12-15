<script setup lang="ts">
import CardEdit from './edit/CardEdit.vue'
import CardInfo from './Info/CardInfo.vue'
import QRImage from '@/assets/images/QR.jpg'
</script>

<template>
  <div>
    <h1 class="font-bold mb-4">Payment Options</h1>
    <div class="border border-default border-dashed rounded-base p-5">
      <h2 class="font-semibold mb-3">Saved Cards</h2>
      <CardInfo />

      <h2 class="font-semibold mt-6 mb-3">QR Payment</h2>
      <div class="flex items-center gap-4">
        <img :src="QRImage" alt="QR Payment" class="w-40 h-40 object-contain rounded-md border" />
        <div>
          <p class="text-sm text-body">Scan this QR code with your banking app to pay.</p>
          <p class="text-xs text-gray-500 mt-2">Supports ABA/KhQR</p>
        </div>
      </div>
    </div>
  </div>
</template>
