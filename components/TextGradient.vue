<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <span class="bg-gradient-to-r from-royal-purple-700 dark:to-royal-purple-500 to-royal-purple-900 bg-clip-text text-transparent">
    {{ text }}
  </span>
</template>

<style scoped></style>
