<script lang="ts" setup>
definePageMeta({
  layout: 'protected',
  middleware: 'auth',
})
useSeoMeta({
  title: 'SPLRGE Jobs - Dashboard',
})

const welcomeMessage = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 18) return 'Good afternoon'
  return 'Good evening'
})
const { user } = storeToRefs(useUserStore())

function disconnect() {
  useAuthStore().logout()
}
</script>

<template>
  <div class="mt-4">
    <div class="flex flex-row flex-wrap justify-between">
      <p class="text-2xl font-bold">{{ welcomeMessage }}, {{ user?.email }} !</p>
      <PrimaryButton class="my-4" url="https://splrge.dev/discord" text="Need help?" />
    </div>
    <div>
      <p class="font-bold">Links</p>
      <ul class="list-inside list-disc">
        <li>
          <NuxtLink to="/" class="text-blue-500 hover:underline">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://splrge.dev/discord" target="_blank" class="text-blue-500 hover:underline">SPLRGE's discord</NuxtLink>
          <CopyButton content="https://splrge.dev/discord" />
        </li>
      </ul>
    </div>
    <div class="mt-8 flex flex-row items-center justify-between md:hidden">
      <NuxtLink to="/admin/account" class="rounded bg-blue-500 px-4 py-2 dark:bg-blue-800">Account</NuxtLink>
      <ColorModeButton />
      <NuxtLink to="#" class="rounded bg-red-500 px-4 py-2 dark:bg-red-800" @click="disconnect">Logout</NuxtLink>
    </div>
  </div>
</template>
