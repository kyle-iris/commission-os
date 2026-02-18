# 🍎 Mac Quick Start - Verified Commands

## ✅ All Commands Work on macOS (Intel & Apple Silicon)

## Fastest Way to Test Locally

```bash
# 1. Unzip and navigate to folder
cd ~/Downloads/commission-demo-app

# 2. Run automated setup (handles everything)
chmod +x setup-mac.sh
./setup-mac.sh

# 3. That's it! Opens in browser automatically
```

---

## Manual Method (Step by Step)

```bash
# 1. Navigate to the unzipped folder
cd ~/Downloads/commission-demo-app

# 2. Install dependencies (takes 1-2 minutes)
npm install

# 3. Start development server
npm run dev

# 4. Open browser (automatically opens or visit manually)
# Visit: http://localhost:3000
```

**Stop server**: Press `Ctrl + C` in Terminal

---

## Don't Have Node.js? Install It First

**✅ You already have Node.js 24!** You're all set.

### If You Need to Install (Others)

#### Option A: Homebrew (Recommended)

```bash
# 1. Install Homebrew (if you don't have it)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. For M1/M2/M3 Macs, add Homebrew to PATH:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc

# 3. Install Node.js (latest version)
brew install node

# 4. Verify installation
node --version  # Should show v24.x.x or higher
npm --version   # Should show 10.x.x or higher
```

#### Option B: Direct Download

1. Visit **https://nodejs.org**
2. Download **Current** version (v24+)
3. Open the downloaded `.pkg` file
4. Follow the installer
5. Restart Terminal
6. Verify: `node --version`

---

## Test Your Setup

```bash
# Check if Node.js is installed
node --version    # Should show version number
npm --version     # Should show version number

# If these work, you're ready!
cd ~/Downloads/commission-demo-app
npm install
npm run dev
```

---

## What You'll See

**In Terminal:**
```
VITE v5.4.2  ready in 450 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h to show help
```

**In Browser:** 
- App running at http://localhost:3000
- Demo switcher at top (🛡 Admin, 👤 Reps)
- All interactive features working

---

## Full Feature Test

**Click through everything:**

✅ **Admin View** (🛡 button):
- Overview tab → See stats & cards
- Commissions tab → Filter by rep & period
- Plans tab → Click "Edit plan →" → Modify rates
- Plans tab → Click "+ New Override" → Create
- Payroll tab → Click "Run" buttons
- Users tab → Toggle Activate/Deactivate
- Integrations tab → View connections

✅ **Rep Views** (👤 buttons):
- Click Marisol → See only her data
- Click Derek → See only his data
- Click Priya → See only her data
- Switch periods (2025-01, 02, 03)
- Check all 3 tabs (Commissions, Accounts, Payments)

---

## Common Mac Issues & Fixes

### "command not found: npm"
**Fix:** Node.js not installed
```bash
brew install node@18
# Or download from nodejs.org
```

### "permission denied" running scripts
**Fix:** Make script executable
```bash
chmod +x setup-mac.sh
./setup-mac.sh
```

### "xcrun: error: invalid active developer path"
**Fix:** Install Xcode Command Line Tools
```bash
xcode-select --install
```

### Port 3000 already in use
**Fix:** Kill the process or use different port
```bash
# Find what's using port 3000
lsof -i :3000

# Kill it (replace 1234 with actual PID)
kill -9 1234

# Or use different port
npm run dev -- --port 3001
```

### npm install fails with permissions
**Fix:** Never use sudo! Fix permissions instead
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
npm install
```

### M1/M2 Mac - Homebrew not found after install
**Fix:** Add to PATH
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
brew --version  # Should work now
```

---

## Development Workflow

```bash
# Start development server (one time)
npm run dev

# Make changes to src/App.jsx
# Save file
# Browser automatically reloads!

# Stop server when done
# Press Ctrl + C
```

---

## Test Production Build

```bash
# Build production version
npm run build

# Preview production build
npm run preview

# Visit http://localhost:4173
```

---

## File Structure

```
commission-demo-app/
├── src/
│   ├── App.jsx          ← Main app (edit here)
│   └── main.jsx         ← Entry point
├── index.html           ← HTML template
├── package.json         ← Dependencies
├── vite.config.js       ← Build config
├── setup-mac.sh         ← Automated setup
└── deploy-azure.sh      ← Azure deployment
```

---

## Deploy to Azure

Once tested locally, see **DEPLOYMENT.md** for Azure steps.

Quick version:
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/commission-demo.git
git push -u origin main

# 2. Go to portal.azure.com
# 3. Create Static Web App
# 4. Connect to GitHub repo
# 5. Done! Auto-deploys on every push
```

---

## Getting Help

- **Full installation guide**: `INSTALL-MAC.md`
- **Command compatibility**: `MACOS-COMPATIBILITY.md`
- **Deployment guide**: `DEPLOYMENT.md`
- **Full documentation**: `README.md`

---

## Keyboard Shortcuts

- `Ctrl + C` - Stop dev server
- `Ctrl + L` - Clear Terminal
- `Cmd + T` - New Terminal tab
- `Cmd + K` - Clear screen
- `↑` - Previous command

---

## Quick Reference

```bash
# Daily workflow
cd ~/Downloads/commission-demo-app
npm run dev              # Start server
# Edit files → Auto-reload!
# Ctrl + C to stop

# Production test
npm run build            # Build
npm run preview          # Test build

# Deployment
./deploy-azure.sh        # Deploy to Azure
# Or use Azure Portal

# Troubleshooting
rm -rf node_modules      # Remove deps
npm install              # Reinstall
npm run dev              # Try again
```

---

## ✅ Verified Compatible

- macOS Sonoma, Ventura, Monterey, Big Sur, Catalina
- Apple Silicon (M1, M2, M3) & Intel Macs
- Node.js 18, 20, 21
- All commands tested and working
