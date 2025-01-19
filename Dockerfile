# Dependencies stage
FROM node:20-alpine AS deps

WORKDIR /app

# Install build essentials
RUN apk add --no-cache python3 make g++

# Enable pnpm with specific version
RUN corepack enable \
    && corepack prepare pnpm@9.15.4 --activate

# Copy package files and prisma schema
COPY package.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./

# Install dependencies
RUN pnpm install

# Compile seed.ts to seed.js
RUN npx tsc prisma/seed.ts --outDir prisma --module ES2020 --moduleResolution node

# Generate Prisma Client
RUN npx prisma generate

# Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm with specific version
RUN corepack enable \
    && corepack prepare pnpm@9.15.4 --activate

# Copy from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/prisma ./prisma/

# Copy source files
COPY . .

# Build application
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Create data directory for database
RUN mkdir -p /app/data && chmod 777 /app/data

# Copy only necessary files
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/prisma ./prisma
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Start command
CMD ["node", ".output/server/index.mjs"]
