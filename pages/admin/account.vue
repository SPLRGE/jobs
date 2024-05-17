<script lang="ts" setup>
definePageMeta({
  layout: 'protected',
  middleware: 'auth',
})

useSeoMeta({
  title: 'SPLRGE Jobs - Dashboard - Account',
})
</script>

<template>
  <div class="space-y-8">
    <EditAccount />
    <DeleteAccount />
  </div>
</template>
