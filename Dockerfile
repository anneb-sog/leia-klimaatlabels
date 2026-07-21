# Use an official Node.js runtime as the base image (last node LTS version running on Alpine)
FROM node:24.4.1-alpine

# Set the working directory in the Docker container
WORKDIR /app

# Install git and curl (curl is needed for the HEALTHCHECK below)
RUN apk add --no-cache git curl

# For now copy (cloned repo) code contents to workdir
# Make sure a production .env (based on .env.example) is present before building:
# APP_URL and CONFIG_URL are baked into the client bundle at build time.
COPY . /app/

# Install dependencies
RUN npm install

# Build the static version
RUN npm run build --adapter=static

# Serve the static files with a lightweight server (like serve)
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Let Docker restart the container if the server stops responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
	CMD curl -fs http://localhost:5000/ || exit 1

# Command to run the app
CMD ["serve", "-s", "build", "-l", "5000"]
