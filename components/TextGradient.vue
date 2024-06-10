<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <span class="bg-gradient-to-r from-royal-purple-700 to-royal-purple-900 bg-clip-text text-transparent dark:to-royal-purple-500">
    {{ text }}
  </span>
</template>

<style scoped></style>
