import type { ZodObject } from 'zod'
import type { H3Event } from 'h3'

export default function useQuery(event: H3Event, schema: ZodObject<any>) {
  const query = getQuery(event)
  return schema.safeParse(query)
}
