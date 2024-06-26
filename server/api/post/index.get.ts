import { z } from 'zod'
import { and, eq } from 'drizzle-orm'
import { categories, posts, users } from '~/db/schema'

export default defineRequestHandler(async event => {
  const parsedQuery = useQuery(
    event,
    z.object({
      id: z.string().uuid(),
      adminMode: z
        .boolean()
        .optional()
        .or(
          z.string().refine(value => value === 'true', {
            message: 'Invalid admin mode',
          })
        )
        .optional(),
    })
  )

  if (!parsedQuery.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid query',
      data: parsedQuery.error,
    })
  }
  let selectFields = {
    id: posts.id,
    title: posts.title,
    description: posts.description,
    link: posts.link,
    category: {
      name: categories.name,
    },
  }
  let whereCondition = and(eq(posts.id, parsedQuery.data.id), eq(posts.isActive, true))

  if (parsedQuery.data.adminMode) {
    if (!isUserAdmin(event)) {
      throw createError({
        statusCode: 403,
        message: 'Unauthorized',
      })
    }

    selectFields = {
      ...selectFields,
      clicks: posts.clicks,
      createdAt: posts.createdAt,
      createdBy: {
        id: users.id,
        email: users.email,
      },
      isActive: posts.isActive,
    }

    whereCondition = eq(posts.id, parsedQuery.data.id)
  }

  const post = await event.context.drizzle
    .select(selectFields)
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(users, eq(posts.createdBy, users.id))
    .where(whereCondition)

  if (!post || post.length === 0) {
    throw createError({
      statusCode: 404,
      message: 'Job not found',
    })
  }

  return {
    post: post[0],
  }
})
