#!/bin/bash

# Exit on any error
set -e

echo "Installing root dependencies..."
npm install

echo "Installing client dependencies..."
cd client
npm install
cd ..

echo "Installing server dependencies..."
cd server
npm install
cd ..

echo "Building client..."
cd client
npm run build
cd ..

echo "Build completed successfully!"
