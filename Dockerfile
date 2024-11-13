# Use the official Node.js image with the desired version (e.g., 18 for latest LTS)
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the server
CMD ["npm", "start"]
