import { hash } from 'bcrypt'
import { insertUserSchema, users } from '~/db/schema'
import isUserAdmin from '~/server/utils/isUserAdmin'

export default defineRequestHandler(async event => {
  if (!isUserAdmin(event)) {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized',
    })
  }

  const parsedBody = await useBody(
    event,
    insertUserSchema.omit({
      id: true,
    })
  )
  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  const hashed = await hash(parsedBody.data.password, useRuntimeConfig().saltRounds)

  const user = await event.context.drizzle
    .insert(users)
    .values({
      email: parsedBody.data.email,
      password: hashed,
      role: parsedBody.data.role,
    })
    .returning()
    .catch(err => {
      if (err.code === '23505') {
        throw createError({
          statusCode: 409,
          message: "Email already used",
        })
      }
      return []
    })

  if (user.length === 0) {
    throw createError({
      statusCode: 500,
      message: "Cannot create user",
    })
  }

  return {
    success: true,
  }
})
