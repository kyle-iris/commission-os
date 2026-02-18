# ⚡ QUICK DEPLOY - 3 Steps to Live

## 🚀 Deploy in 5 Minutes

### 1️⃣ Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/commission-demo.git
git push -u origin main
```

### 2️⃣ Create Azure Static Web App
**Portal**: https://portal.azure.com → Create Resource → "Static Web App"

**Quick Settings**:
- Name: `commission-demo-app-YOUR_NAME`
- Plan: **Free**
- GitHub: Connect and select your repo
- Branch: `main`
- Build: **React**
- App location: `/`
- Output: `dist`

Click **Create**

### 3️⃣ Wait & Visit
- ⏱️ First deploy: 2-3 minutes
- 🔗 URL: Check Azure Portal → Your app → "URL"
- ✅ Done! Your app is live globally with HTTPS!

---

## 📋 Files Included

```
commission-demo-app/
├── src/
│   ├── App.jsx                 # Main demo app (850 lines)
│   └── main.jsx                # React entry point
├── .github/workflows/
│   └── azure-static-web-apps.yml  # Auto-deploy on push
├── package.json                # Dependencies
├── vite.config.js              # Build config
├── index.html                  # Entry HTML
├── staticwebapp.config.json   # Azure routing
├── deploy-azure.sh            # Automated deploy script
├── README.md                  # Full documentation
├── DEPLOYMENT.md              # Detailed deploy guide
└── .gitignore                 # Git ignore rules
```

---

## 💰 Cost: $0/month
Free tier includes everything you need!

---

## 🔄 Update App
```bash
# Make changes
git add .
git commit -m "Update"
git push
# Live in 1-2 minutes automatically!
```

---

## 🆘 Help
- Build failing? Check GitHub Actions tab
- 404 error? Wait 3 min for first deploy
- Questions? Read DEPLOYMENT.md
