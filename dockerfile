# Use an official Node runtime as the base image
FROM node:20-alpine

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port that your app listens on
EXPOSE 3000

# Start the server (adjust the filename if needed)
CMD [ "node", "server.js" ]
