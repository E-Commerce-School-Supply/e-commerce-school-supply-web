<template>
  <footer class="bg-teal-800 text-white mt-8">
    <div class="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div>
        <h4 class="text-2xl font-bold">TovRean</h4>
        <p class="text-xs mt-2">Subscribe and get 10% off your first order.</p>
        <div class="mt-4">
          <input placeholder="Enter your email" class="text-sm px-3 py-2 rounded" />
          <button class="ml-2 bg-white text-teal-800 px-3 py-2 rounded">Subscribe</button>
        </div>
      </div>

      <div>
        <h5 class="font-semibold">Support</h5>
        <p class="text-xs mt-2">Techno, Phnom Penh</p>
        <p class="text-xs">tov.rean88@gmail.com</p>
      </div>

      <div>
        <h5 class="font-semibold">Account</h5>
        <ul class="text-xs mt-2 space-y-1">
          <li>My account</li>
          <li>Login / Sign up</li>
          <li>Cart</li>
        </ul>
      </div>

      <div>
        <h5 class="font-semibold">Quick Link</h5>
        <ul class="text-xs mt-2 space-y-1">
          <li>Privacy policy</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-teal-700 text-center text-xs py-4">© Copyright e-commerce teamss 2025. All right reserved</div>
  </footer>
</template>

<script setup lang="ts">
// Reusable footer component
</script>

<style scoped>
input { border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; }
input::placeholder { color: rgba(255,255,255,0.8); }
button { font-weight: 600; }
</style>
