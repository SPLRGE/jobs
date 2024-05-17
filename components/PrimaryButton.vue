<script lang="ts" setup>
defineProps({
  url: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
    default: 'Apply',
  },
})
</script>

<template>
  <div>
    <NuxtLink
      :to="url"
      class="hover:bg-royal-purple-600 rounded bg-royal-purple-500 px-4 py-2 font-semibold text-black transition"
      target="_blank"
    >
      {{ text }}
    </NuxtLink>
  </div>
</template>

<style scoped></style>
