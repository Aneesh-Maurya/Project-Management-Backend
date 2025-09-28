# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all source code
COPY . .

# Expose the port your API runs on
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
