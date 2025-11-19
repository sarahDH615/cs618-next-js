FROM node:20 AS base

# define a new image for building the app, based on the base image
FROM base AS build

# set working directory to /app folder and copy over the package.json and package-lock.json files
WORKDIR /app
COPY package.json .
COPY package-lock.json .

# install all dependencies, as well as sharp (used by Next.js to resize and optimise images)
RUN npm install
RUN npm install sharp

# copy over all files
COPY . .

# define all envvars here because Next.js uses them during the build process to statically build certain routes
ARG DATABASE_URL
ARG JWT_SECRET
ARG BASE_URL

# build command
RUN npm run build

# new image for the final app, based on the base image as well:
FROM base AS final

WORKDIR /app

# permissions to run app as special nextjs user instead of root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# copy necessary files to run a standalone Next.js server from the build image
COPY --from=build /app/public ./public
RUN mkdir -p .next
RUN chown nextjs:nodejs .next
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV production

# execute the standalone Next.js server as the nextjs user defined earlier
USER nextjs
CMD ["node", "server.js"]