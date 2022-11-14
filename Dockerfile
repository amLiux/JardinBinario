# syntax=docker/dockerfile:1
FROM node:current-alpine
# Environment variables
# Setting environment variables coming from the GitHub actions secretsARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ARG NEXT_PUBLIC_PLACEHOLDER_IMAGE
ENV NEXT_PUBLIC_PLACEHOLDER_IMAGE=${NEXT_PUBLIC_PLACEHOLDER_IMAGE}
ARG NEXT_PUBLIC_UPLOAD_IMAGE
ENV NEXT_PUBLIC_UPLOAD_IMAGE=${NEXT_PUBLIC_UPLOAD_IMAGE}
ARG NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL=${NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL}
# done with environment variables
RUN apk add --update tini
RUN mkdir -p /usr/jardinbinario/app
WORKDIR /usr/jardinbinario/app
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

# Environment variables done
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
