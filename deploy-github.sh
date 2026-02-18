#!/bin/bash
# Quick GitHub Deployment Script for CommissionOS

echo "🚀 CommissionOS - GitHub Deployment"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the commission-demo-app directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Check if user has configured git
if ! git config user.name > /dev/null 2>&1; then
    echo ""
    echo "⚙️  Git Configuration Needed"
    read -p "Enter your name: " git_name
    read -p "Enter your email: " git_email
    git config user.name "$git_name"
    git config user.email "$git_email"
    echo "✅ Git configured"
fi

# Stage all files
echo ""
echo "📝 Staging files..."
git add .
echo "✅ Files staged"

# Commit
echo ""
echo "💾 Creating commit..."
git commit -m "Initial commit - CommissionOS v4.0.1"
echo "✅ Commit created"

# Get GitHub username
echo ""
echo "🔗 GitHub Setup"
echo "==============="
read -p "Enter your GitHub username: " github_user

# Add remote
echo ""
echo "📡 Adding GitHub remote..."
git remote add origin "https://github.com/$github_user/commission-os.git"
echo "✅ Remote added"

# Rename branch to main
echo ""
echo "🔄 Renaming branch to main..."
git branch -M main
echo "✅ Branch renamed"

echo ""
echo "================================"
echo "✅ LOCAL SETUP COMPLETE!"
echo "================================"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Create GitHub repository:"
echo "   → Go to: https://github.com/new"
echo "   → Repository name: commission-os"
echo "   → Click 'Create repository'"
echo "   → DO NOT initialize with README"
echo ""
echo "2. Push code to GitHub:"
echo "   → Run: git push -u origin main"
echo "   → Enter your GitHub password when prompted"
echo ""
echo "3. Deploy to Azure:"
echo "   → Go to: https://portal.azure.com"
echo "   → Create Static Web App"
echo "   → Connect to GitHub repo: commission-os"
echo "   → Select branch: main"
echo "   → Build preset: React"
echo "   → App location: /"
echo "   → Output location: dist"
echo ""
echo "See DEPLOYMENT.md for detailed instructions!"
echo ""
