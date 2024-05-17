<script lang="ts" setup>
useSeoMeta({
  title: 'Open positions @ SPLRGE',
})

const { data, pending } = useLazyFetch('/api/category/posts')

const route = useRoute()
const isLoggedOutModalOpen = ref(route.query.loggedOut === 'true')
const isAccountDeletedModalOpen = ref(route.query.accountDeleted === 'true')
useRouter().replace({ query: { loggedOut: undefined, accountDeleted: undefined } })
</script>

<template>
  <div>
    <UModal v-model="isLoggedOutModalOpen">
      <UCard>
        <template #header>
          <div class="flex items-center">
            <UIcon class="text-3xl text-royal-purple-500" name="i-mdi-check-circle" />
            <div class="ml-4">
              <h1 class="text-xl font-bold">Successful logout</h1>
            </div>
          </div>
        </template>

        <p>You have been disconnected.</p>
      </UCard>
    </UModal>

    <UModal v-model="isAccountDeletedModalOpen">
      <UCard>
        <template #header>
          <div class="flex items-center">
            <UIcon class="text-3xl text-royal-purple-500" name="i-mdi-check-circle" />
            <div class="ml-4">
              <h1 class="text-xl font-bold">Account delete</h1>
            </div>
          </div>
        </template>

        <p>Your account and all associated data have been deleted.</p>
      </UCard>
    </UModal>

    <!-- We need you -->
    <div class="mb-4 mt-8 text-4xl font-bold">
      We need
      <TextGradient text="YOU!" />
    </div>
    <p>
      As a new project, SPLRGE is looking to expand its team. If you're interested in joining a young, dynamic team,
      feel
      free to contact us. <br>
      Everyone is important - we'll find a place for you!
    </p>

    <!-- Why work with us -->
    <div class="mb-4 mt-8 text-3xl font-bold">
      <span>Work @ </span><TextGradient text="SPLRGE" />
    </div>
    <p>Join an organisation that actively contributes to open-source software and enjoy the following advantages : </p>
    <ul class="list-inside list-disc leading-loose marker:text-royal-purple-500">
      <li>Work efficiently and collaboratively with Microsoft 365</li>
      <li>Benefits from a stable environnement to develop your project</li>
      <li>Work at your convenience, with flexible hours and no constraints</li>
    </ul>

    <!-- Open positions -->
    <div class="mb-4 mt-8 text-3xl font-bold">
      <TextGradient text="Open" /> <span>positions</span>
    </div>

    <UProgress v-if="pending" animation="carousel" class="my-6" />
    <p v-else-if="!data || !Array.isArray(data) || data?.length == 0" class="my-4 italic text-gray-500">
      No job available, come back later
    </p>
    <PostsCategory v-for="category in data" v-else-if="data" :key="category.id" :name="category.name"
      :posts="category.posts" />
    <PrimaryError v-else>
      <p>Cannot load jobs</p>
    </PrimaryError>

    <!-- Contact us -->
    <div class="mb-4 mt-8 text-3xl font-bold">
      <p>
        Contact us
      </p>
    </div>
    <p>If you have any question, contact us.</p>
    <PrimaryButton class="my-4" text="hello@splrge.dev" url="mailto:hello@splrge.dev" />
  </div>
</template>

<style scoped></style>
