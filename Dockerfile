FROM node:alpine3.19 AS deps
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM node:alpine3.19 AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build

FROM node:alpine3.19 AS runner
WORKDIR /app
COPY --from=builder /app/.output ./.output
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/bin/migrate.js ./bin/migrate.js

ENTRYPOINT ["sh", "-c", "node ./bin/migrate.js && node ./.output/server/index.mjs"]
