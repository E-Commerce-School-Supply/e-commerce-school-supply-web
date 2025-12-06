<template>
  <!-- Main Image -->
  <div class="row-span-4 col-start-2 col-end-8 bg-[#F5F5F5] rounded-md justify-center flex items-center border border-gray-300 ...">
    <img :src="activeImage" alt="" class="max-h-[95%] max-w-[95%]  ..." />
  </div>

  <!-- Thumbnails -->
  <div
    v-for="(img, index) in images"
    :key="index"
    class="col-span-1 bg-[#F5F5F5] rounded-md justify-center flex border border-gray-300 ..."
    @click="activeImage = img"
  >
    <img :src="img" alt="">
  </div>
</template>

<script lang="ts">
export default {
  name: "productImageComponent",
  props: {
    images: {
      type: Array as () => string[],
      required: true
    }
  },
  data() {
    return {
      activeImage: this.images[0] // default image
    };
  }
}
</script>
