#!/bin/bash

# Commission Demo - Mac Setup Script
# This script will check prerequisites and set up the app

set -e

echo "🍎 Commission Demo - Mac Setup"
echo "=============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "🔍 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js is installed: $NODE_VERSION"
    
    # Check version is 24+
    NODE_MAJOR=$(node -v | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -lt 24 ]; then
        echo -e "${YELLOW}⚠${NC} Warning: Node.js 24+ recommended. You have v$NODE_MAJOR"
        echo "   Your current version should work, but consider upgrading: brew upgrade node"
    fi
else
    echo -e "${RED}✗${NC} Node.js is not installed"
    echo ""
    echo "Would you like to install Node.js using Homebrew? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        # Check if Homebrew is installed
        if ! command -v brew &> /dev/null; then
            echo "📦 Installing Homebrew first..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        echo "📦 Installing Node.js..."
        brew install node
        echo -e "${GREEN}✓${NC} Node.js installed!"
    else
        echo ""
        echo "Please install Node.js manually:"
        echo "  1. Visit https://nodejs.org"
        echo "  2. Download LTS version (or v24+)"
        echo "  3. Run the installer"
        echo "  4. Restart Terminal and run this script again"
        exit 1
    fi
fi

# Check npm
echo ""
echo "🔍 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm is installed: v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm is not installed (should come with Node.js)"
    exit 1
fi

# Check git (optional but nice to have)
echo ""
echo "🔍 Checking git..."
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓${NC} $GIT_VERSION"
else
    echo -e "${YELLOW}⚠${NC} git is not installed (optional for local testing)"
    echo "   Install with: brew install git"
fi

# Install dependencies
echo ""
echo "📦 Installing project dependencies..."
echo "   This may take 1-2 minutes..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed successfully!"
else
    echo -e "${RED}✗${NC} Failed to install dependencies"
    exit 1
fi

# Success message
echo ""
echo "════════════════════════════════════════"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "════════════════════════════════════════"
echo ""
echo "🚀 To start the development server:"
echo "   npm run dev"
echo ""
echo "📖 Then open your browser to:"
echo "   http://localhost:3000"
echo ""
echo "💡 Tips:"
echo "   • Press Ctrl+C to stop the server"
echo "   • Edit src/App.jsx to make changes"
echo "   • Browser auto-reloads when you save"
echo ""
echo "📚 For help, see INSTALL-MAC.md"
echo ""

# Ask if they want to start the dev server now
echo "Would you like to start the development server now? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Starting development server..."
    echo "   Press Ctrl+C to stop"
    echo ""
    npm run dev
else
    echo ""
    echo "Run 'npm run dev' when you're ready!"
    echo ""
fi
