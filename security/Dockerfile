# ==============================================================================
# Hardened Multi-Stage Dockerfile — TutorCare (Milestone sec-0.2)
# Keamanan: Pengguna Non-Root (UID 1001), Minimal Attack Surface (Alpine Linux),
# Pemisahan Build Dependency, Bebas Kerentanan Kritis (0 Critical CVE)
# ==============================================================================

# --- STAGE 1: Dependency Resolver ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Salin manifest dependensi
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install dependensi secara deterministik
RUN npm ci

# --- STAGE 2: Source Builder ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client & Build Aplikasi Next.js
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build

# --- STAGE 3: Hardened Runtime Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 1. Hardening Pengguna: Jalankan sebagai pengguna non-root (Least Privilege)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 2. Hardening Berkas: Hapus file dan package manager yang tidak dibutuhkan saat runtime
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

# Salin aset statis dan hasil build teroptimasi
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/generated ./generated
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Tetapkan kepemilikan direktori kerja kepada non-root user
USER nextjs

# Expose port internal container (tidak otomatis mempublikasikan ke host luar)
EXPOSE 3000

# Metadata Keamanan & Healthcheck Container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
