# Build stage
FROM node:20 AS build
WORKDIR /app

# Cache dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Dodaj zależności dla Sharp
RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev

# Build app
COPY . .
RUN pnpm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]