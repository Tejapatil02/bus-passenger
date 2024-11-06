# Use official Node.js image from Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port and start the application
EXPOSE 3000
CMD ["node", "app.js"]
