import { z } from 'zod'
import isUserLogged from '~/server/utils/isUserLogged'
import useBody from '~/server/utils/useBody'
import { insertPostSchema, posts, stringToNumber } from '~/db/schema'

export default defineRequestHandler(async event => {
  isUserLogged(event)

  const parsedBody = await useBody(
    event,
    insertPostSchema
      .omit({
        id: true,
        createdBy: true,
        createdAt: true,
        clicks: true,
      })
      .merge(
        z.object({
          categoryId: z
            .number()
            .or(stringToNumber("Category ID must be a number"))
            .transform(value => Number(value)),
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

  const post = await event.context.drizzle
    .insert(posts)
    .values({
      title: parsedBody.data.title,
      description: parsedBody.data.description,
      link: parsedBody.data.link,
      isActive: parsedBody.data.isActive,
      categoryId: parsedBody.data.categoryId,
      createdBy: event.context.user.id,
    })
    .catch(err => {
       
      if (err.code == 23503) {
        // violates foreign key constraint
        throw createError({
          statusCode: 404,
          message: "User or category not found",
        })
      }
      return null
    })

  if (!post) {
    throw createError({
      statusCode: 500,
      message: 'Cannot create job',
    })
  }

  return {
    success: true,
  }
})
