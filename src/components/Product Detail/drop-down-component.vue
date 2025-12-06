<template>
  <div class="relative w-full">
    <select
      v-model="selected"
      class="appearance-none w-full px-4 py-3 pr-10 bg-[#D9D9D9] rounded-sm
             border border-gray-300 text-gray-800
             focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <!-- Custom Image Icon -->
    <img
      :src="icon || '/src/assets/images/drop-down-icon.png'"
      class="pointer-events-none absolute inset-y-0 right-4 w-[13px] h-[8px] my-auto"
      alt="dropdown icon"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

interface DropdownOption {
  label: string;
  value: any;
}

export default defineComponent({
  name: "drop-down-component",
  props: {
    options: {
      type: Array as PropType<DropdownOption[]>,
      required: true
    },
    modelValue: {
      type: [String, Number, Object] as PropType<any>,
      default: null
    },
    icon: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  computed: {
    selected: {
      get() {
        return this.modelValue;
      },
      set(value: any) {
        this.$emit("update:modelValue", value);
      }
    }
  }
});
</script>
