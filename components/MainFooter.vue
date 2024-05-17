<script lang="ts" setup>
const year = new Date().getFullYear()
let adminDashText = 'Login'

if (useUserStore().user) {
  adminDashText = 'Dashboard'
}
</script>

<template>
  <div class="my-6">
    <hr />
    <div class="flex flex-row items-center justify-between">
      <p class="my-4 text-center">
        Made by
        <NuxtLink class="text-blue-500 hover:underline" target="_blank" to="https://splrge.dev">SPLRGE</NuxtLink>
        - &copy;
        {{ year }} -
        <NuxtLink class="text-blue-500 hover:underline" to="/admin">{{ adminDashText }}</NuxtLink>
      </p>
      <ColorModeButton />
    </div>
  </div>
</template>
