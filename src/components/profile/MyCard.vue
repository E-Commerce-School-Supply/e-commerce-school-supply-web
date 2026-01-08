<script setup lang="ts">
import CardEdit from './edit/CardEdit.vue'
import CardInfo from './Info/CardInfo.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <h1 class="font-bold mb-4">{{ t('profile.payment_options') }}</h1>
    <div class="border border-default border-dashed rounded-base p-5">
      <h2 class="font-semibold mb-3">{{ t('profile.saved_cards') }}</h2>
      <CardInfo />
    </div>
  </div>
</template>
