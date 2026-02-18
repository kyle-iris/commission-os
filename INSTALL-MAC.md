# 🍎 Mac Installation Guide - Commission Demo

## Quick Install (5 minutes)

### Prerequisites Check

Open **Terminal** (Applications → Utilities → Terminal) and verify:

```bash
# Check Node.js (need 18+)
node --version

# Check npm
npm --version

# Check git
git --version
```

**Don't have these?** Follow "Install Prerequisites" below.

---

## Option 1: Quick Start (If you have Node.js)

```bash
# 1. Download and unzip (or use the zip file provided)
cd ~/Downloads
unzip commission-demo-app.zip
cd commission-demo-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to:
# http://localhost:3000
```

**Done!** The app is running locally.

---

## Option 2: Fresh Mac Setup (Need to install Node.js first)

### Install Prerequisites

#### Method A: Using Homebrew (Recommended)

```bash
# 1. Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Node.js (latest version includes npm)
brew install node

# 3. Verify installation
node --version  # Should show v24.x.x or higher
npm --version   # Should show 10.x.x or higher
```

#### Method B: Direct Download

1. Go to https://nodejs.org
2. Download "Current" version (24 or higher)
3. Open the .pkg file and follow installer
4. Restart Terminal
5. Verify: `node --version`

### Then Install & Run the App

```bash
# Navigate to the unzipped folder
cd ~/Downloads/commission-demo-app

# Install dependencies
npm install

# Start development server
npm run dev
```

**Visit**: http://localhost:3000

---

## Full Testing Workflow

### 1. Local Development Server

```bash
# Start dev server with hot reload
npm run dev

# You should see:
# ➜ Local:   http://localhost:3000/
# ➜ press h to show help
```

- **Hot reload**: Edit `src/App.jsx` → saves → browser auto-updates
- **Stop server**: Press `Ctrl + C` in Terminal

### 2. Production Build Test

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Visit: http://localhost:4173
```

This tests the exact code that will run on Azure.

### 3. Test All Features

**Admin View** (default):
- ✅ Overview tab: Stats, rep earnings, payroll cards
- ✅ Commissions tab: Filter by rep (Marisol/Derek/Priya), filter by period
- ✅ Plans tab: Click "Edit plan →" on any rep, modify rates, save
- ✅ Plans tab: Click "+ New Override", fill form, create
- ✅ Payroll tab: Click "Confirm" button, run sync buttons
- ✅ Users tab: Click "Activate/Deactivate"
- ✅ Integrations tab: View QBO/Gusto status

**Rep Views** (use demo switcher at top):
- ✅ Click 👤 Marisol → See her data only
- ✅ Click 👤 Derek → See his data only  
- ✅ Click 👤 Priya → See her data only
- ✅ Check period filter (2025-01, 02, 03)
- ✅ Switch between tabs (Commissions, Accounts, Payments)

---

## Common Mac Issues & Fixes

### "npm: command not found"

**Fix**: Node.js not installed or not in PATH

```bash
# Check if node is installed
which node

# If nothing appears, install Node.js using Homebrew or direct download
brew install node@18

# Close and reopen Terminal
```

### "permission denied" when running npm install

**Fix**: Don't use sudo! Fix permissions:

```bash
# Fix npm permissions (one time)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# Now retry
npm install
```

### Port 3000 already in use

**Fix**: Something else is using port 3000

```bash
# Find what's using port 3000
lsof -i :3000

# Kill it (replace PID with actual number)
kill -9 PID

# Or use a different port
npm run dev -- --port 3001
```

### Browser doesn't open automatically

**Fix**: Manually open browser

```bash
# After running npm run dev, manually visit:
open http://localhost:3000

# Or just type in browser: http://localhost:3000
```

### "Module not found" errors

**Fix**: Clean install

```bash
# Remove node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Try again
npm run dev
```

### M1/M2 Mac specific issues

**Fix**: Use Rosetta or ensure arm64 compatibility

```bash
# If issues persist, try:
arch -arm64 npm install
arch -arm64 npm run dev
```

---

## Development Tips

### File Locations

```
commission-demo-app/
├── src/
│   ├── App.jsx          ← Main app (edit this for changes)
│   └── main.jsx         ← React entry (usually don't touch)
├── index.html           ← HTML template
├── package.json         ← Dependencies
└── vite.config.js       ← Build config
```

### Live Editing

1. Open project in **VS Code** (or any editor)
2. Run `npm run dev` in Terminal
3. Open http://localhost:3000 in browser
4. Edit `src/App.jsx`
5. Save → Browser auto-refreshes!

### Recommended VS Code Extensions

```bash
# Install VS Code
brew install --cask visual-studio-code

# Launch and install these extensions:
# - ES7+ React/Redux/React-Native snippets
# - Prettier - Code formatter
# - ESLint
```

---

## Make Changes to Test

### Example: Change the App Title

1. Open `src/App.jsx` in editor
2. Find line ~785: `<span>CommissionOS</span>`
3. Change to: `<span>My Commission Demo</span>`
4. Save
5. Browser updates automatically!

### Example: Change Demo Switcher Button

1. In `src/App.jsx`, find the `DemoBar` function (around line 600)
2. Modify button labels or add new views
3. Save and test

### Example: Modify Data

1. Find the `LINES` constant (around line 35)
2. Add a new commission line
3. Save → See it appear in the tables

---

## Testing Checklist

Before deploying, verify:

- [ ] App loads at http://localhost:3000
- [ ] Can switch between Admin/Marisol/Derek/Priya views
- [ ] All 6 admin tabs work
- [ ] Can open drawers (Edit plan, New override)
- [ ] Period selectors work (2025-01/02/03)
- [ ] Buttons trigger actions (Confirm, Run, etc.)
- [ ] Toast notifications appear
- [ ] Rep views show correct scoped data
- [ ] Production build works (`npm run build && npm run preview`)
- [ ] No console errors (open browser DevTools)

---

## Next Steps

### Ready to Deploy?

See **DEPLOYMENT.md** for Azure deployment steps.

### Want to Modify?

1. Learn React basics: https://react.dev/learn
2. Vite documentation: https://vitejs.dev
3. Edit `src/App.jsx` and experiment!

### Need Help?

```bash
# See all available scripts
npm run

# Check package info
npm list

# Clear cache if issues
npm cache clean --force
```

---

## Keyboard Shortcuts in Terminal

- `Ctrl + C` - Stop the dev server
- `Ctrl + L` - Clear terminal screen
- `↑` - Previous command
- `Tab` - Auto-complete paths

---

## Quick Reference Card

```bash
# Install and run (first time)
npm install && npm run dev

# Daily development
npm run dev                # Start dev server
# Make changes → Auto-reloads!

# Before deploying
npm run build              # Create production build
npm run preview            # Test production build

# Troubleshooting
rm -rf node_modules        # Remove dependencies
npm install                # Reinstall
npm run dev                # Try again
```

---

## Performance on Mac

- **Dev server starts**: 2-3 seconds
- **Hot reload**: <1 second
- **Production build**: 5-10 seconds
- **RAM usage**: ~200MB
- **CPU**: Minimal (only during build)

Works great on **all Macs** (Intel or Apple Silicon M1/M2/M3)!
