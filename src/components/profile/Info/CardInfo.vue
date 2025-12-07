<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue'
import { computed, ref } from 'vue'

function maskCreditCard(cardNumber: string): string {
  // 1. Remove all non-numeric characters
  const cleanNum = cardNumber.replace(/\D/g, '')

  // 2. Return original if it's too short to mask (e.g., placeholder)
  if (cleanNum.length < 10) return cardNumber

  // 3. Extract parts
  // Example: Show first 3 digits, mask the rest in groups of 4
  const visiblePart = cleanNum.slice(0, 3)
  const maskedSection = cleanNum.slice(3)

  // 4. Create the masked string with groups of 4 for readability
  // This turns "1234567890123" into "**** **** ****"
  const maskedGroups =
    maskedSection
      .replace(/./g, '*')
      .match(/.{1,4}/g)
      ?.join(' ') || ''

  return `${visiblePart}* ${maskedGroups}`
}

const rawCardNumber = ref('4351234567891234') // Example data

const hiddenCardNumber = computed(() => {
  return maskCreditCard(rawCardNumber.value)
})
</script>

<template>
  <div class="border border-default border-dashed rounded-base p-5">
    <div class="w-full flex flex-row justify-between items-center">
      <h1>All Address</h1>
      <button
        type="button"
        class="flex flex-row gap-2 items-center justify-center text-white bg-secondary box-border border border-transparent hover:bg-secondary/80 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-md text-sm px-2 py-2 mb-4 focus:outline-none"
      >
        <IconPlus size="16" /> Add new Card
      </button>
    </div>
    <div
      class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default"
    >
      <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="table-checkbox-38"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                />
                <label for="table-checkbox-38" class="sr-only">Table checkbox</label>
              </div>
            </th>
            <th scope="col" class="px-3 py-3 font-medium">Card name</th>
            <th scope="col" class="px-3 py-3 font-medium">Card Number</th>
            <th scope="col" class="px-3 py-3 font-medium">Status</th>
            <th scope="col" class="px-3 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="table-checkbox-39"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                />
                <label for="table-checkbox-39" class="sr-only">Table checkbox</label>
              </div>
            </td>
            <th scope="row" class="px-3 py-4 font-medium text-heading whitespace-nowrap">
              Ngim Ngim
            </th>
            <td class="px-3 py-4">
              {{ hiddenCardNumber }}
            </td>
            <td class="px-3 py-4 text-success">Default</td>
            <td class="px-3 py-4">
              <a href="#" class="font-medium text-dark hover:underline">Edit</a>
            </td>
          </tr>

          <tr
            class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="table-checkbox-40"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                />
                <label for="table-checkbox-40" class="sr-only">Table checkbox</label>
              </div>
            </td>
            <th scope="row" class="px-3 py-4 font-medium text-heading whitespace-nowrap">
              Pheaktra
            </th>
            <td class="px-3 py-4">
              {{ hiddenCardNumber }}
            </td>
            <td class="px-3 py-4 font-medium text-accent hover:underline">Set Default</td>
            <td class="px-3 py-4">
              <a href="#" class="font-medium text-dark hover:underline">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
