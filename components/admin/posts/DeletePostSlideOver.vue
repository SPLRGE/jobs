<script setup lang="ts">
import { insertPostSchema } from '~/db/schema'

const post = useCurrentPost()
// @ts-ignore
const schema = insertPostSchema.pick({
  id: true,
})

const state = ref({
  id: post.value?.id,
  title: post.value?.title,
  description: post.value?.description,
  link: post.value?.link,
  isActive: post.value?.isActive,
  categoryId: post.value?.category.id,
})
watch(post, () => {
  state.value.id = post.value?.id
  state.value.title = post.value?.title
  state.value.description = post.value?.description
  state.value.link = post.value?.link
  state.value.isActive = post.value?.isActive
  state.value.categoryId = post.value?.category.id
})
const categoriesStore = useCategoriesStore()
categoriesStore.fetchCategoriesIfNot()
const { categories } = storeToRefs(categoriesStore)
</script>

<template>
  <SlideOverModel
    is-open-state="isPostDeleteSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/post"
    method="DELETE"
    title="Delete a job"
    success-toast-message="Job deleted"
    submit-button-text="Permanently delete"
    button-color="red"
  >
    <UFormGroup label="ID" name="id"> <UInput v-model="state.id" type="text" :disabled="true" /> </UFormGroup>
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" :disabled="true" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UInput v-model="state.description" :disabled="true" />
    </UFormGroup>
    <UFormGroup label="Link" name="link">
      <UInput v-model="state.link" :disabled="true" />
    </UFormGroup>
    <UFormGroup label="Enabled" name="isActive">
      <UCheckbox v-model="state.isActive" :disabled="true" />
    </UFormGroup>
    <UFormGroup label="Category" name="categoryId">
      <USelect v-model="state.categoryId" :options="categories" :disabled="true" option-attribute="name" />
    </UFormGroup>
  </SlideOverModel>
</template>
