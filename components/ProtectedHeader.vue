<script lang="ts" setup>
import type { UseFetchOptions } from '#app'

const authStore = useAuthStore()
const userStore = useUserStore()

const { data } = await useFetch('/api/user/me', {
  headers: {
    Authorization: 'Bearer ' + authStore.token,
  },
  method: 'GET',
} as UseFetchOptions<any>)
userStore.setUser(data.value.user || null)
const { user } = storeToRefs(userStore)

const isOpen = ref(false)

const items = [
  [
    {
      label: 'Account',
      icon: 'i-mdi-account-circle',
      to: '/admin/account',
    },
    {
      label: 'Logout',
      icon: 'i-mdi-logout',
      click: () => authStore.logout(),
    },
  ],
]
</script>

<template>
  <div>
    <div class="hidden flex-row justify-between py-4 md:flex">
      <div class="flex flex-row items-center space-x-6">
        <NuxtLink to="/admin">
          <svg width="35" height="35" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M250 0C167.352 0 93.9818 40.3389 48.4372 102.333C41.6245 110.932 35.6654 120.237 30.6757 130.137C11.1332 165.745 0 206.595 0 250C0 387.851 112.149 500 250 500C387.851 500 500 387.851 500 250C500 112.149 387.851 0 250 0ZM221.521 311.483C179.913 311.483 146.06 277.203 146.06 235.068C146.06 192.932 179.913 158.653 221.521 158.653C263.13 158.653 296.983 192.932 296.983 235.068C296.983 277.203 263.13 311.483 221.521 311.483ZM221.521 136.249C167.557 136.249 123.656 180.577 123.656 235.068C123.656 289.559 167.557 333.887 221.521 333.887C222.133 333.887 222.723 333.802 223.329 333.792C207.922 339.819 191.204 343.155 173.722 343.155C97.5963 343.155 35.6601 280.481 35.6601 203.449C35.6601 180.914 40.9975 159.627 50.4025 140.754C55.2025 132.018 60.5768 123.641 66.4464 115.642C91.7794 84.013 130.448 63.7435 173.722 63.7435C247.545 63.7435 308.016 122.676 311.615 196.478C296.699 161.118 261.939 136.249 221.521 136.249ZM250 477.597C127.166 477.597 26.8083 379.763 22.6037 257.935C44.8069 320.598 104.156 365.563 173.722 365.563C262.208 365.563 334.192 292.842 334.192 203.454C334.192 114.067 262.203 41.3453 173.717 41.3453C168.2 41.3453 162.747 41.6298 157.367 42.1777C185.682 29.506 217.017 22.3982 249.995 22.3982C375.49 22.3982 477.591 124.499 477.591 249.995C477.591 375.49 375.495 477.597 250 477.597Z"
              fill="white" />
          </svg>


        </NuxtLink>
        <div class="border border-black dark:border-white py-4"></div>
        <NuxtLink class="border-b-2 border-transparent hover:border-royal-purple-500" to="/admin/users"
          active-class="!border-royal-purple-500">Users</NuxtLink>
        <NuxtLink class="border-b-2 border-transparent hover:border-royal-purple-500" to="/admin/posts"
          active-class="!border-royal-purple-500">Jobs</NuxtLink>
        <NuxtLink class="border-b-2 border-transparent hover:border-royal-purple-500" to="/admin/categories"
          active-class="!border-royal-purple-500">Categories</NuxtLink>
      </div>
      <div class="flex flex-row items-center space-x-2">
        <ColorModeButton />
        <UDropdown :items="items">
          <div class="flex flex-row items-center">
            <span>{{ user?.email }}</span>
            <UIcon name="i-mdi-chevron-down" />
          </div>
        </UDropdown>
      </div>
    </div>

    <!-- burger menu mobiles -->
    <div>
      <div class="flex flex-row items-center justify-between p-4 md:hidden">
        <NuxtLink to="/admin">
          <svg fill="none" height="25" viewBox="0 0 58 42" width="58" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.3174 41.8655H22.2817L0 0H10.4671C14.2244 0 17.6559 2.13098 19.3226 5.498L37.3174 41.8655Z"
              fill="#06F47C" />
            <path
              d="M39.8225 36.7768L58 0H47.3311C43.6795 0 40.3257 2.01434 38.6099 5.23758L31.1519 19.247L39.8225 36.7768Z"
              fill="#06F47C" />
          </svg>
        </NuxtLink>
        <UIcon class="text-xl" :name="isOpen ? 'i-mdi-close' : 'i-mdi-menu'" @click="isOpen = !isOpen" />
      </div>

      <div v-if="isOpen" class="flex flex-col">
        <NuxtLink class="rounded bg-transparent p-2 hover:bg-gray-100" to="/admin/users"
          active-class="!bg-gray-100 dark:!bg-gray-800">Users</NuxtLink>
        <NuxtLink class="rounded bg-transparent p-2 hover:bg-gray-100" to="/admin/posts"
          active-class="!bg-gray-100 dark:!bg-gray-800">Jobs</NuxtLink>
        <NuxtLink class="rounded bg-transparent p-2 hover:bg-gray-100" to="/admin/categories"
          active-class="!bg-gray-100 dark:!bg-gray-800">Categories</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
