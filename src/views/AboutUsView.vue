<template>
  <div class="dark:bg-gray-900 transition-colors">
    <section class="relative w-full h-screen">
      <!-- Background image with dark overlay -->
      <div class="absolute inset-0">
        <img
          :src="bgSchool"
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
          <h2 class="text-[60px] font-bold italic">{{ $t('aboutUs.title') }}</h2>
          <p class="text-[20px]">
            {{ $t('aboutUs.description') }}
          </p>
        </div>
  
        <!-- Bottom right content -->
        <div class="flex justify-end mr-20 mb-10">
            <p class="font-bold text-6xl/relaxed italic text-right w-[850px]">
            {{ $t('aboutUs.mission') }}
          </p>
        </div>
      </div>
  
    </section>
  
    <section class="flex items-center justify-around w-full py-12 px-4 bg-white dark:bg-gray-800 transition-colors">
      <div class="bg-[#1A535C] dark:bg-[#1A535C] rounded-xl text-white p-8 w-3xl">
        <h2 class="text-[55px] font-bold font-quicksand dark:text-white">{{ $t('aboutUs.goal_title') }}</h2>
        <p class="text-[20px] font-lato dark:text-gray-100">
          {{ $t('aboutUs.goal_description') }}
        </p>
      </div>
  
      <div class="bg-[#1A535C] dark:bg-[#1A535C] rounded-xl text-white p-8 w-3xl">
        <h2 class="text-[55px] font-bold font-quicksand dark:text-white">{{ $t('aboutUs.goal_title') }}</h2>
        <p class="text-[20px] font-lato dark:text-gray-100">
          {{ $t('aboutUs.goal_description') }}
        </p>
      </div>
    </section>
  
    <section class="py-12 px-6 bg-gray-50 dark:bg-gray-800 transition-colors">
      <h2 class="text-[55px] font-bold text-center mb-10 font-quicksand dark:text-white">{{ $t('aboutUs.team_title') }}</h2>
  
      <div class="flex gap-10 mb-10 justify-center">
        <MemberCard
          name="Lim Kity"
          :role="$t('aboutUs.role_backend')"
          email="kitylim123@gmail.com"
          avatar="/avatars/kity.jpg"
          facebook="https://facebook.com/kity"
          github="https://github.com/kity"
          linkedin="https://linkedin.com/in/kity"
        />
        <MemberCard
          name="Luy Lyhor"
          :role="$t('aboutUs.role_frontend_designer')"
          email="horhorsloy@gmail.com"
          avatar="/avatars/lyhor.jpg"
          facebook="https://facebook.com/lyhor"
          github="https://github.com/lyhor"
          linkedin="https://linkedin.com/in/lyhor"
        />
        <MemberCard
          name="Im Chheanngim"
          :role="$t('aboutUs.role_tester')"
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
          :role="$t('aboutUs.role_frontend')"
          email="tratra67@gmail.com"
          avatar="/avatars/pheaktra.jpg"
          facebook="https://facebook.com/pheaktra"
          github="https://github.com/pheaktra"
          linkedin="https://linkedin.com/in/pheaktra"
        />
        <MemberCard
          name="La Vireak"
          :role="$t('aboutUs.role_fullstack')"
          email="lavireak@gmail.com"
          avatar="/avatars/vireak.jpg"
          facebook="https://facebook.com/vireak"
          github="https://github.com/vireak"
          linkedin="https://linkedin.com/in/vireak"
        />
      </div>
  
    </section>
  </div>

</template>


<script setup lang="ts">
import bgSchool from '@/assets/images/image37.jpg'
import MemberCard from '@/components/MemberCard.vue'
</script>
