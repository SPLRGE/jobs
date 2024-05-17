<script setup lang="ts">
import { insertCategorySchema } from '~/db/schema'

const schema = insertCategorySchema.pick({
  name: true,
})
const state = ref({
  name: '',
})

const successCallback = () => {
  useCategoriesStore().fetchCategories()
}
</script>

<template>
  <SlideOverModel
    is-open-state="isCategoryAddSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/category"
    method="POST"
    title="Add a category"
    success-toast-message="Category created"
    submit-button-text="Add"
    :success-callback="successCallback"
  >
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
  </SlideOverModel>
</template>
