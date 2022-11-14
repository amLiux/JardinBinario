# syntax=docker/dockerfile:1
FROM node:current-alpine
RUN apk add --update tini
RUN mkdir -p /usr/jardinbinario/app
WORKDIR /usr/jardinbinario/app
COPY package.json package.json
COPY package-lock.json package-lock.json
# Environment variables
# Setting environment variables coming from the GitHub actions secrets
RUN --mount=type=secret,id=NEXT_PUBLIC_BACKEND_URL \
    --mount=type=secret,id=NEXT_PUBLIC_PLACEHOLDER_IMAGE \
    --mount=type=secret,id=NEXT_PUBLIC_UPLOAD_IMAGE \
    --mount=type=secret,id=NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL \
    NEXT_PUBLIC_BACKEND_URL=$(cat /run/secrets/NEXT_PUBLIC_BACKEND_URL) \
    NEXT_PUBLIC_PLACEHOLDER_IMAGE=$(cat /run/secrets/NEXT_PUBLIC_PLACEHOLDER_IMAGE) \
    NEXT_PUBLIC_UPLOAD_IMAGE=$(cat /run/secrets/NEXT_PUBLIC_UPLOAD_IMAGE) \
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL=$(cat /run/secrets/NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL) \
    && export NEXT_PUBLIC_BACKEND_URL \
    && export NEXT_PUBLIC_PLACEHOLDER_IMAGE \
    && export NEXT_PUBLIC_UPLOAD_IMAGE \
    && export NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL

RUN npm ci

# Environment variables done
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
