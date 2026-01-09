<template>
  <section class="bg-white py-16">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center gap-12">

        <!-- Left Image -->
        <div class="flex-1 flex justify-center">
          <img
            src="@/assets/images/image 36.png"
            alt="Customer Support"
            class="w-full max-w-sm"
          />
        </div>

        <!-- Right Form -->
        <div class="flex-1 border border-gray-200 p-8">
          <h2 class="text-red-500 text-xl font-semibold mb-6">
            Contact Us
          </h2>

          <form @submit.prevent="submitForm" class="space-y-4">

            <!-- Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm mb-1">First Name</label>
                <input
                  v-model="form.firstName"
                  type="text"
                  placeholder="Lim"
                  class="w-full bg-gray-100 px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label class="block text-sm mb-1">Last Name</label>
                <input
                  v-model="form.lastName"
                  type="text"
                  placeholder="Phoktoit"
                  class="w-full bg-gray-100 px-3 py-2 outline-none"
                />
              </div>
            </div>

            <!-- Contact -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm mb-1">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="lucky@gmail.com"
                  class="w-full bg-gray-100 px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label class="block text-sm mb-1">Phone Number</label>
                <input
                  v-model="form.phone"
                  type="text"
                  placeholder="0123456789"
                  class="w-full bg-gray-100 px-3 py-2 outline-none"
                />
              </div>
            </div>

            <!-- Message -->
            <div>
              <label class="block text-sm mb-1">Message</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Type your message here..."
                class="w-full bg-gray-100 px-3 py-2 outline-none resize-none"
              ></textarea>
            </div>

            <!-- Button -->
            <div class="pt-2">
              <button
                type="submit"
                class="bg-teal-900 text-white px-6 py-2 hover:opacity-90"
              >
                Send
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: ""
});

const submitForm = () => {
  console.log(form);
  alert("Message sent!");
};
</script>
