<script setup lang="ts">
import AddressInfo from './Info/AddressInfo.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <h1>{{ t('profile.my_address') }}</h1>
    <AddressInfo />
  </div>
</template>
