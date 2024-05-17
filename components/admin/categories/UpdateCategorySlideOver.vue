<script setup lang="ts">
import { insertCategorySchema } from '~/db/schema'

const category = useCurrentCategory()
const schema = insertCategorySchema.pick({
  id: true,
  name: true,
})
const state = ref({
  id: category.value?.id,
  name: category.value?.name,
})
watch(category, () => {
  state.value.id = category.value?.id
  state.value.name = category.value?.name
})
const successCallback = () => {
  useCategoriesStore().fetchCategories()
}
</script>

<template>
  <SlideOverModel
    is-open-state="isCategoryUpdateSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/category"
    method="PUT"
    title="Update a category"
    success-toast-message="Category updated"
    submit-button-text="Update"
    :success-callback="successCallback"
  >
    <UFormGroup label="ID" name="id">
      <UInput v-model="state.id" type="text" disabled />
    </UFormGroup>
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
  </SlideOverModel>
</template>
