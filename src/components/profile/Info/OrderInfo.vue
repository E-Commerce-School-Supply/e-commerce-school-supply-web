<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue'
</script>

<template>
  <div class="border border-default border-dashed rounded-base p-5">
    <h1 class="mb-5">All Orders <span class="text-gray-400">168</span></h1>

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
            <th scope="col" class="px-3 py-3 font-medium">Order ID</th>
            <th scope="col" class="px-3 py-3 font-medium">Method</th>
            <th scope="col" class="px-3 py-3 font-medium">Total</th>
            <th scope="col" class="px-3 py-3 font-medium">Date</th>
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
              #ORDER1001
            </th>
            <td class="px-3 py-4">ABA Pay</td>
            <td class="px-3 py-4">$39.99</td>
            <td class="px-3 py-4">Jul 15, 2025</td>
            <td class="px-3 py-4 text-success">Completed</td>
            <td class="px-3 py-4">
              <a href="#" class="font-medium text-accent hover:underline">View</a>
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
              #ORDER1002
            </th>
            <td class="px-3 py-4">Credit Card</td>
            <td class="px-3 py-4">$39.99</td>
            <td class="px-3 py-4">Jun 25, 2025</td>
            <td class="px-3 py-4 font-medium text-error">Cancel</td>
            <td class="px-3 py-4">
              <a href="#" class="font-medium text-accent hover:underline">View</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
