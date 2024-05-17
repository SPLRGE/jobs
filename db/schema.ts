import { boolean, integer, pgEnum, pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', {
    length: 256,
  }).notNull(),
})

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', {
    length: 256,
  }).notNull(),
  link: varchar('link', {
    length: 256,
  }).notNull(),
  description: varchar('description', {
    length: 256,
  }).notNull(),
  isActive: boolean('isActive').notNull(),
  clicks: integer('clicks').notNull().default(0),
  categoryId: integer('categoryId')
    .notNull()
    .references(() => categories.id, {
      onDelete: 'cascade',
      onUpdate: 'restrict',
    }),
  createdBy: integer('createdBy')
    .references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'restrict',
    }),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
})

export const roleEnum = pgEnum('role', ['USER', 'ADMIN'])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', {
    length: 256,
  })
    .unique()
    .notNull(),
  password: varchar('password', {
    length: 256,
  }).notNull(),
  role: roleEnum('role').notNull(),
})

export const stringToNumber = (errMsg: string) =>
  z.string().refine(value => !isNaN(Number(value)), {
    message: errMsg,
  })

export const insertUserSchema = createInsertSchema(users, {
  id: schema => schema.id.or(stringToNumber("The ID must be a number")).transform(value => Number(value)),
  email: schema => schema.email.email("Invalid email address format"),
  password: schema => schema.password.min(8, 'The password must contain at least 8 characters'),
  // role: schema => schema.role... // Custom error message?
})

export const insertPostSchema = createInsertSchema(posts, {
  title: schema =>
    schema.title
      .min(3, 'The title must contain at least 8 characters')
      .max(256, 'The title can only contain 256 characters'),
  link: schema => schema.link.url('Invalid URL'),
})

export const insertCategorySchema = createInsertSchema(categories, {
  name: schema =>
    schema.name
      .min(3, 'The category name must contain at least 3 characters')
      .max(256, 'The category name can only contain 256 characters'),
})
