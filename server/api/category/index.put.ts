import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { categories, insertCategorySchema } from '~/db/schema'

export default defineRequestHandler(async event => {
  const parsedBody = await useBody(
    event,
    insertCategorySchema.merge(
      z.object({
        id: z.number(),
      })
    )
  )

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  if (!isUserAdmin(event)) {
    throw createError({
      statusCode: 403,
      message: 'Unauthorized',
    })
  }

  const category = await event.context.drizzle
    .update(categories)
    .set({
      name: parsedBody.data.name,
    })
    .where(eq(categories.id, parsedBody.data.id))
    .returning()

  if (!category || category.length === 0) {
    throw createError({
      statusCode: 500,
      message: 'Cannot update category',
    })
  }

  return {
    category: category[0],
  }
})
