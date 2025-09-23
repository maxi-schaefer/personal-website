---
title: "Dockerizing Next.js Applications"
description: "A step-by-step guide to dockerize your nextjs applications using a Dockerfile and docker-compose."
coverImage: "https://gokimax.dev/images/dockerizing_next_js.png"
author: "Maxi Schäfer"
date: "2025-09-23"
readTime: "3 min"
---

Running your Next.js application in Docker is a great way to ensure consistency across enviroments and simplify deployment. In this post, I'll walk you through the process of containerizing a Next.js project using a multi-stage `Dockerfile` and a simple `docker-compose.yml`. This is the exact setup I use to run this portfolio website.

<br>

---

<br>

## ❓ Why Dockerize a Next.js App?

<br>

Docker allows you to package your app with all it's dependencies so it runs the same on every machine — no more "works on my machine" issues. With multi-staged builds, we can also keep the final image small, secure and optimized for production.

<br>

---

<br>

## 📦 Project structure

<br>

```bash
📂 portfolio
    📂 app
    📄 DOCKERFILE
    📄 docker-compose.yml
    📄 next.config.ts
```

<br>

---

<br>


### 📄 The Next.js config

<br>

Here's the `next.config.ts` I use:

<br>

```typescript
const nextConfig = {
  output: 'standalone', // <- This is very important
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
```

<br>

We are using the **standalone** output option, so a server.js file is being created when building the application.

<br>

### 📂 The Dockerfile

<br>

Here's the `Dockerfile` I use:

<br>

```docker
# syntax=docker.io/docker/dockerfile:1
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the lockfile
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

<br>


### 🤨 What's happening here?

<br>

- `deps` **stage** → Installs dependencies using the appropriate package manager (Yarn, npm or pnpm).
- `builder` **stage** → Builds the Next.js Application
- `runner` **stage** → Prepares the minimal production image with only what's needed to serve the app.

<br>

The result is a lean image that contains only your compiled Next.js app and it's required runtime.

<br>

---

<br>

### 📂 The docker-compose.yml

<br>

To make running the container easier, I use `docker-compose`:

<br>

```yaml
version: "3.9"
services:
  web:
    build: .
    container_name: portfolio
    restart: always
    environment:
      SPOTIFY_CLIENT_ID: CLIENT_ID
      SPOTIFY_CLIENT_SECRET: CLIENT_SECRET
      SPOTIFY_REFRESH_TOKEN: REFRESH_TOKEN
    ports:
      - "3000:3000"
```

<br>

This setup:

<br>

- Builds the app from the local `Dockerfile`.
- Maps port **3000** inside the container to **3000** on your host.
- Passes enviroment variables (for my example Spotify API keys).
- Ensures the container restarts automatically if it crashes.

<br>

---

<br>

## 🏃 Running it

<br>

1. Build and start the container:

<br>

```bash
docker-compose up -d --build
```

<br>

2. Visit your app at: [http://localhost:3000](http://localhost:3000)

<br>

---

<br>

✅ Conclusion

<br>

With this setup your Next.js app is fully containerized, portable and production-ready. Using multi-stage builds keeps the image size small, while `docker-compose` simplifies running and managing the container.

<br>

If you're deploying to a VPS or cloud provider, you can use this exact configuration to run your Next.js app reliably anywhere. 🚀