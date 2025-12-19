<template>
  <section class="relative w-full h-[748px]">
    <!-- Background image with dark overlay -->
    <div class="absolute inset-0">
      <img
        :src="image37"
        alt="Back-to-school scene"
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <!-- Overlay content -->
    <div class="relative z-10 flex flex-col justify-between h-full text-white">
      <!-- Top left content -->
      <div class="text-left w-[500px] ml-20 mt-30">
        <h2 class="text-[60px] font-bold italic font-lato">About Us</h2>
        <p class="text-[20px]">
          TovRean is an e-commerce shopping website that is filled with all the necessary items
          for students to be prepared to go to school.
        </p>
      </div>

      <!-- Bottom right content -->
      <div class="flex justify-end mr-20 mb-10">
          <p class="font-bold text-[60px] italic text-right w-[850px] font-lato">
          We combine quality, convenience, and care to deliver a smooth shopping experience.
        </p>
      </div>
    </div>

  </section>

  <section class="flex items-center justify-around w-full py-12 px-4">
    <div class="bg-[#1A535C] rounded-xl text-white p-8 w-3xl">
      <h2 class="text-[55px] font-bold font-quicksand">Our goal</h2>
      <p class="text-[20px] font-lato">
        Our goal is to provide students, parents, and educators with easy access to affordable,
        high-quality school supplies through a seamless and reliable online shopping experience.
      </p>
    </div>

    <div class="bg-[#1A535C] rounded-xl text-white p-8 w-3xl">
      <h2 class="text-[55px] font-bold font-quicksand">Our goal</h2>
      <p class="text-[20px] font-lato">
        Our goal is to provide students, parents, and educators with easy access to affordable,
        high-quality school supplies through a seamless and reliable online shopping experience.
      </p>
    </div>
  </section>

  <section class="py-12 px-6 bg-gray-50">
    <h2 class="text-[55px] font-bold text-center mb-10 font-quicksand">Meet Our Team</h2>

    <div class="flex gap-10 mb-10 justify-center">
      <MemberCard
        name="Lim Kity"
        role="Back-end developer"
        email="kitylim123@gmail.com"
        avatar="/avatars/kity.jpg"
        facebook="https://facebook.com/kity"
        github="https://github.com/kity"
        linkedin="https://linkedin.com/in/kity"
      />
      <MemberCard
        name="Luy Lyhor"
        role="Front-end developer, designer"
        email="horhorsloy@gmail.com"
        avatar="/avatars/lyhor.jpg"
        facebook="https://facebook.com/lyhor"
        github="https://github.com/lyhor"
        linkedin="https://linkedin.com/in/lyhor"
      />
      <MemberCard
        name="Im Chheanngim"
        role="Tester"
        email="ngimgim168@gmail.com"
        avatar="/avatars/gim.jpg"
        facebook="https://facebook.com/gim"
        github="https://github.com/gim"
        linkedin="https://linkedin.com/in/gim"
      />
    </div>
    <div class="flex gap-10 justify-center">
      <MemberCard
        name="Loeng Pheaktra"
        role="Front-end developer"
        email="tratra67@gmail.com"
        avatar="/avatars/pheaktra.jpg"
        facebook="https://facebook.com/pheaktra"
        github="https://github.com/pheaktra"
        linkedin="https://linkedin.com/in/pheaktra"
      />
      <MemberCard
        name="La Vireak"
        role="Full-Stack developer"
        email="lavireak@gmail.com"
        avatar="/avatars/vireak.jpg"
        facebook="https://facebook.com/vireak"
        github="https://github.com/vireak"
        linkedin="https://linkedin.com/in/vireak"
      />
    </div>

  </section>

</template>


<script setup lang="ts">
import image37 from '@/components/bgSchool.png'
import MemberCard from '@/components/MemberCard.vue'
</script>
