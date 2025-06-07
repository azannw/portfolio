#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "Deploy the 'dist' folder to your GitHub Pages repository."
    echo "Or use GitHub Actions for automatic deployment."
else
    echo "Build failed!"
    exit 1
fi 