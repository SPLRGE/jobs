<script setup lang="ts">
import { insertCategorySchema } from '~/db/schema'

const category = useCurrentCategory()
const schema = insertCategorySchema.pick({
  id: true,
})
const state = ref({
  id: category.value?.id,
  name: category.value?.name,
})
watch(category, () => {
  state.value.id = category.value?.id
  state.value.name = category.value?.name
})
</script>

<template>
  <SlideOverModel
    is-open-state="isCategoryDeleteSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/category"
    method="DELETE"
    title="Delete a category"
    success-toast-message="Category delete"
    submit-button-text="Delete permanently"
    button-color="red"
  >
    <UFormGroup label="ID" name="id"> <UInput v-model="state.id" type="text" :disabled="true" /> </UFormGroup>
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" :disabled="true" />
    </UFormGroup>

    <template #pre-form>
      <p class="mb-4 italic text-gray-500">
        Please note that deleting this category will automatically and <span class="font-bold">irreversibly delete</span> the associated jobs!
      </p>
    </template>
  </SlideOverModel>
</template>
