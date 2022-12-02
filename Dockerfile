# syntax=docker/dockerfile:1
FROM node:current-alpine

# Setting environment variables coming from the GitHub actions secrets
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ARG NEXT_PUBLIC_PLACEHOLDER_IMAGE
ENV NEXT_PUBLIC_PLACEHOLDER_IMAGE=${NEXT_PUBLIC_PLACEHOLDER_IMAGE}
ARG NEXT_PUBLIC_UPLOAD_IMAGE
ENV NEXT_PUBLIC_UPLOAD_IMAGE=${NEXT_PUBLIC_UPLOAD_IMAGE}
ARG NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL=${NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL}

# updating alpine package manager
RUN apk add --update tini

# creating the directory that will hold our code
RUN mkdir -p /usr/jardinbinario/app

# moving to that directory inside of the container
WORKDIR /usr/jardinbinario/app

# copying package.json and package-lock.json to the container
COPY package.json package.json
COPY package-lock.json package-lock.json

# installing via the recommended way for Docker (not npm install)
RUN npm ci --only=production && npm cache clean --force

# copying our source code
COPY . .

#exposing port 3000
EXPOSE 3000

# building the 'production' version
# RUN npm run build

# running our code
CMD ["npm", "run", "dev"]
