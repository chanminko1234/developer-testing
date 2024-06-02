# Use specific Node.js version
FROM node:20-alpine

RUN apk add --no-cache bash

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]
