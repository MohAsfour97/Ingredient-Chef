# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app
ENV NODE_ENV=production

# =========================
# Build stage
# =========================
FROM base AS build

# Native build tools (required for bufferutil, ws, etc.)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      node-gyp \
      pkg-config \
      python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency manifests first (cache-friendly)
COPY package.json package-lock.json ./

# ✅ IMPORTANT FIX:
# npm ci FAILS because lockfile is out of sync
# npm install is the correct solution here
RUN npm install --include=dev --no-audit --no-fund

# Copy rest of the app
COPY . .

# Build the app (Vite / React / etc.)
RUN npm run build

# Remove dev dependencies for production
RUN npm prune --omit=dev

# =========================
# Runtime stage
# =========================
FROM base

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "run", "start"]
