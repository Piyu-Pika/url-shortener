#!/bin/bash

echo "Starting deployment..."

# Check if pm2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing pm2..."
    npm install -g pm2
fi

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Build assets if needed
# npm run build

# Start application with pm2
echo "Starting application..."
pm2 start src/server.js --name "url-shortener"

echo "Deployment complete!"
