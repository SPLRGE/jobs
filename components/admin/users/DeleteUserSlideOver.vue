<script setup lang="ts">
import { insertUserSchema } from '~/db/schema'

const user = useCurrentUser()
const schema = insertUserSchema.pick({
  id: true,
})
const state = ref({
  id: user.value?.id,
  email: user.value?.email,
  role: user.value?.role,
})
watch(user, () => {
  state.value.id = user.value?.id
  state.value.email = user.value?.email
  state.value.role = user.value?.role
})
const options = ref(['ADMIN', 'USER'])
</script>

<template>
  <SlideOverModel
    is-open-state="isUserDeleteSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/user"
    method="DELETE"
    title="Delete a user"
    success-toast-message="User deleted"
    submit-button-text="Permanently delete"
    button-color="red"
  >
    <UFormGroup label="ID" name="id"> <UInput v-model="state.id" type="text" :disabled="true" /> </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" :disabled="true" />
    </UFormGroup>
    <UFormGroup label="Role" name="role">
      <USelect v-model="state.role" :options="options" :disabled="true" />
    </UFormGroup>
  </SlideOverModel>
</template>
