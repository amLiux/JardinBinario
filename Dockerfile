FROM node:current-alpine
# Environment variables
# Setting environment variables coming from the GitHub actions secrets
RUN --mount=type=secret,id=NEXT_PUBLIC_BACKEND_URL \
  --mount=type=secret,id=NEXT_PUBLIC_PLACEHOLDER_IMAGE \
  --mount=type=secret,id=NEXT_PUBLIC_UPLOAD_IMAGE \
  --mount=type=secret,id=NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL \
   export API_ENDPOINT=$(cat /run/secrets/NEXT_PUBLIC_BACKEND_URL) && \
   export API_PASSWORD=$(cat /run/secrets/NEXT_PUBLIC_PLACEHOLDER_IMAGE) && \
   export API_ENDPOINT=$(cat /run/secrets/NEXT_PUBLIC_UPLOAD_IMAGE) && \
   export API_ENDPOINT=$(cat /run/secrets/NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL)
# Environment variables done
RUN apk add --update tini
RUN mkdir -p /usr/jardinbinario/app
WORKDIR /usr/jardinbinario/app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
