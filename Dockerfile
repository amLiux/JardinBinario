FROM node:current-alpine
EXPOSE 3000
ENV NODE_ENV=docker
RUN apk add --update tini
RUN mkdir -p /usr/jardinbinario/app
WORKDIR /usr/jardinbinario/app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci
COPY . .
CMD ["npm", "run", "build"]
