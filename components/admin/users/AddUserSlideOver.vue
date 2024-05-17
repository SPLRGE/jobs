<script setup lang="ts">
import { insertUserSchema } from '~/db/schema'

const schema = insertUserSchema.pick({
  email: true,
  password: true,
  role: true,
})
const state = ref({
  email: '',
  password: '',
  role: 'USER',
})
const options = ref(['ADMIN', 'USER'])
</script>

<template>
  <SlideOverModel
    is-open-state="isUserAddSlideOverOpen"
    :schema="schema"
    :state="state"
    route="/api/user"
    method="POST"
    title="Add a user"
    success-toast-message="User created"
    submit-button-text="Add"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormGroup>
    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <UFormGroup label="Role" name="role">
      <USelect v-model="state.role" :options="options" />
    </UFormGroup>
  </SlideOverModel>
</template>
