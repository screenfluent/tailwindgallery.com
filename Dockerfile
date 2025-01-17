# Build stage
FROM node:20 AS build
# Use Node.js version 20 as the base image for the build stage

WORKDIR /app
# Set the working directory to /app

# Dodaj zależności dla Sharp
RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev

RUN npm install -g pnpm
# Install pnpm globally

COPY package.json pnpm-lock.yaml ./
# Copy package.json and pnpm-lock.yaml to the working directory

# Ważne: instaluj z --unsafe-perm dla Sharp
RUN pnpm install --frozen-lockfile --unsafe-perm=true

COPY . .
# Copy the rest of the application files to the working directory

RUN pnpm run build
# Build the Astro application

# Serve stage
FROM nginx:alpine
# Use the lightweight Nginx Alpine image for the serve stage

COPY --from=build /app/dist /usr/share/nginx/html
# Copy the built files from the previous stage to the Nginx HTML directory

EXPOSE 80
# Expose port 80 for HTTP traffic

CMD ["nginx", "-g", "daemon off;"]
# Start Nginx in the foreground