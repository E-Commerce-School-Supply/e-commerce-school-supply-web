<template>
  <div class="border border-default border-dashed rounded-base p-5 mt-5">
    <h1 class="text-accent">Edit your address</h1>

    <form class="w-full max-w-4xl mx-auto mt-5">
      <div class="relative z-0 w-full mb-10 group">
        <input
          type="text"
          name="floating_name"
          id="floating_name"
          class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
          placeholder=" "
          required
        />
        <label
          for="floating_email"
          class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >Address name</label
        >
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-10 group">
          <input
            type="text"
            name="floating_country"
            id="floating_country"
            class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
            placeholder=" "
            required
          />
          <label
            for="floating_country"
            class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >Country
          </label>
        </div>
        <div class="relative z-0 w-full mb-10 group">
          <input
            type="text"
            name="floating_provide_city"
            id="floating_provide_city"
            class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
            placeholder=" "
            required
          />
          <label
            for="floating_provide_city"
            class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >Provide/City</label
          >
        </div>
      </div>
      <div class="relative z-0 w-full mb-10 group">
        <input
          type="text"
          name="address"
          id="floating_address"
          class="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
          placeholder=" "
          required
        />
        <label
          for="floating_address"
          class="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >Address Line 1</label
        >
      </div>
      <div class="mt-3 w-full flex flex-row gap-2 items-center justify-end">
        <button
          type="button"
          class="text-body bg-neutral-primary border border-default hover:bg-neutral-secondary-soft hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="text-white bg-secondary box-border border border-transparent hover:bg-secondary/80 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Save Change
        </button>
      </div>
    </form>
  </div>
</template>
