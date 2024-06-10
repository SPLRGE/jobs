import type { H3Event } from 'h3'
import type { ZodObject } from 'zod'

export default async function useBody(event: H3Event, schema: ZodObject<any>) {
  const body = await readBody(event)
  return schema.safeParse(body)
}
