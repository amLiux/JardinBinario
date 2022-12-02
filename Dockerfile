# syntax=docker/dockerfile:1
# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache --update tini libc6-compat

# creating the directory that will hold our code
RUN mkdir -p /usr/jardinbinario/app

# moving to that directory inside of the container
WORKDIR /usr/jardinbinario/app

# Setting environment variables coming from the GitHub actions secrets
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ARG NEXT_PUBLIC_PLACEHOLDER_IMAGE
ENV NEXT_PUBLIC_PLACEHOLDER_IMAGE=${NEXT_PUBLIC_PLACEHOLDER_IMAGE}
ARG NEXT_PUBLIC_UPLOAD_IMAGE
ENV NEXT_PUBLIC_UPLOAD_IMAGE=${NEXT_PUBLIC_UPLOAD_IMAGE}
ARG NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL=${NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL}

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci && npm cache clean --force; \
  else echo "Lockfile not found." && exit 1; \
  fi

# copying our source code
COPY . .

#exposing port 3000
EXPOSE 3000

# building the 'production' version
RUN npm run build

# running our code
CMD ["npm", "run", "start"]

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /usr/jardinbinario/app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /usr/jardinbinario/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
