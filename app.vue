<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: 'font-sans dark:bg-gray-900',
  },
})

useSeoMeta({
  ogSiteName: 'Open positions @ SPLRGE',
  ogImage: '/ogImage.png',
  description: 'Discover open positions @ SPLRGE',
  ogDescription: 'Discover open positions @ SPLRGE',
  twitterDescription: 'Discover open positions @ SPLRGE',
  ogUrl: 'https://jobs.splrge.dev',
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
