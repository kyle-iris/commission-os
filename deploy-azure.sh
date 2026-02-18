#!/bin/bash

# Azure Static Web App Deployment Script
# Run this script to deploy to Azure Static Web Apps
# Compatible with macOS

set -e

echo "🚀 Commission Demo - Azure Deployment Script"
echo "=============================================="
echo ""

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed."
    echo ""
    echo "📥 Install it on macOS with Homebrew:"
    echo "   brew update && brew install azure-cli"
    echo ""
    echo "Or download from: https://aka.ms/installazureclimacos"
    echo ""
    exit 1
fi

echo "✅ Azure CLI found"
echo ""

# Login to Azure
echo "🔐 Logging in to Azure..."
echo "   (A browser window will open for authentication)"
echo ""
az login

if [ $? -ne 0 ]; then
    echo "❌ Azure login failed"
    exit 1
fi

echo ""
echo "✅ Successfully logged in to Azure"
echo ""

# Set variables
RESOURCE_GROUP="commission-demo-rg"
LOCATION="eastus"
APP_NAME="commission-demo-app-$(date +%s)"  # Add timestamp for uniqueness
GITHUB_REPO_URL=""

# Prompt for GitHub repository URL
echo "📦 GitHub Repository Setup"
echo "=========================="
echo ""
echo "Enter your GitHub repository URL"
echo "Example: https://github.com/username/commission-demo"
echo ""
read -p "Repository URL: " GITHUB_REPO_URL

if [ -z "$GITHUB_REPO_URL" ]; then
    echo ""
    echo "❌ GitHub repository URL is required"
    exit 1
fi

# Confirm details
echo ""
echo "📋 Deployment Configuration"
echo "==========================="
echo "Resource Group: $RESOURCE_GROUP"
echo "Location: $LOCATION"
echo "App Name: $APP_NAME"
echo "GitHub Repo: $GITHUB_REPO_URL"
echo ""
read -p "Continue with deployment? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Create resource group
echo ""
echo "📁 Creating resource group: $RESOURCE_GROUP..."
az group create \
    --name "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --output table

if [ $? -ne 0 ]; then
    echo "❌ Failed to create resource group"
    exit 1
fi

echo ""
echo "✅ Resource group created"

# Create Static Web App
echo ""
echo "🌐 Creating Azure Static Web App: $APP_NAME..."
echo "⏳ This may take 2-3 minutes..."
echo ""

az staticwebapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --source "$GITHUB_REPO_URL" \
    --location "$LOCATION" \
    --branch main \
    --app-location "/" \
    --output-location "dist" \
    --login-with-github \
    --output table

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Failed to create Static Web App"
    echo "💡 This might be because:"
    echo "   - The app name is already taken"
    echo "   - GitHub authorization failed"
    echo "   - Network issues"
    echo ""
    echo "Try again or use the Azure Portal method instead"
    exit 1
fi

# Get the URL
echo ""
echo "🔍 Retrieving application URL..."
APP_URL=$(az staticwebapp show \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --query "defaultHostname" \
    --output tsv)

echo ""
echo "════════════════════════════════════════════════"
echo "✅ Deployment Complete!"
echo "════════════════════════════════════════════════"
echo ""
echo "🌍 Your app URL: https://$APP_URL"
echo ""
echo "📝 Next Steps:"
echo ""
echo "   1. Push your code to GitHub:"
echo "      git add ."
echo "      git commit -m \"Initial commit\""
echo "      git push origin main"
echo ""
echo "   2. GitHub Actions will automatically deploy"
echo "      (Check: https://github.com/YOUR_USERNAME/YOUR_REPO/actions)"
echo ""
echo "   3. Wait 2-3 minutes for first deployment"
echo ""
echo "   4. Visit https://$APP_URL"
echo ""
echo "💡 Manage Your App:"
echo "   Azure Portal: https://portal.azure.com"
echo "   Resource Group: $RESOURCE_GROUP"
echo "   App Name: $APP_NAME"
echo ""
echo "🎉 All done! Your app will be live shortly."
echo ""
