import { eq } from 'drizzle-orm'
import { insertUserSchema, users } from '~/db/schema'
import isUserAdmin from '~/server/utils/isUserAdmin'
import isUserItself from '~/server/utils/isUserItself'

export default defineRequestHandler(async event => {
  const parsedBody = await useBody(
    event,
    insertUserSchema.pick({
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

  /* eslint-disable no-empty */
  if (isUserAdmin(event)) {
  } else if (!isUserItself(event, parsedBody.data.id)) {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized',
    })
  }

  const user = await event.context.drizzle.delete(users).where(eq(users.id, parsedBody.data.id)).returning()

  if (user.length === 0) {
    throw createError({
      statusCode: 500,
      message: "Cannot delete user",
    })
  }

  return {
    success: true,
  }
})
