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

# Native build dependencies (needed for bufferutil, utf-8-validate, etc.)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      node-gyp \
      pkg-config \
      python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency manifests first (better layer caching)
COPY package.json package-lock.json ./

# ✅ FIX: npm install instead of npm ci
RUN npm install --include=dev --no-audit --no-fund

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --omit=dev

# =========================
# Runtime stage
# =========================
FROM base

WORKDIR /app
ENV NODE_ENV=production

# Copy built app
COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "run", "start"]
