<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex',
    },
  ],
})
</script>

<template>
  <div class="space-y-4">
    <h1 class="mt-6 text-2xl font-bold">Create the first user</h1>
    <p class="text-gray-500">It will be administrator</p>
    <InitializeForm />
  </div>
</template>
