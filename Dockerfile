# Base Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Build Vite frontend for production
RUN npm run build

# Expose production port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Command to run server
CMD ["node", "server.js"]
