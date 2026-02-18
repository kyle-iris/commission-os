# ✅ Deployment Checklist - Follow These Steps Exactly

## Part 1: Push to GitHub (5 minutes)

### Step 1: Open Terminal
```bash
cd ~/Downloads/commission-demo-app
```

### Step 2: Run Deployment Script
```bash
./deploy-github.sh
```

**The script will**:
- ✅ Initialize git
- ✅ Ask for your name and email (if needed)
- ✅ Stage all files
- ✅ Create commit
- ✅ Ask for your GitHub username
- ✅ Set up remote
- ✅ Show you next steps

### Step 3: Create GitHub Repository

1. **Go to**: https://github.com/new
2. **Repository name**: `commission-os`
3. **Description**: `Sales Commission Management System`
4. **Public** or **Private** (your choice)
5. **IMPORTANT**: Do NOT check "Add README" ❌
6. Click **"Create repository"**

### Step 4: Push Your Code

```bash
git push -u origin main
```

**Enter your GitHub password when prompted**

### Step 5: Verify

Go to `https://github.com/YOUR-USERNAME/commission-os`

You should see all your files! ✅

---

## Part 2: Deploy to Azure (5 minutes)

### Step 1: Go to Azure Portal

**Visit**: https://portal.azure.com

Sign in with your Microsoft account

### Step 2: Create Static Web App

1. Click **"+ Create a resource"** (top left)
2. Search: `Static Web App`
3. Click **"Create"**

### Step 3: Fill Out Form

**Basics Tab**:
- Subscription: (your subscription)
- Resource Group: Click "Create new" → Name: `commission-os-rg`
- Name: `commission-os`
- Plan type: **Free** (for testing)
- Region: (choose closest to you)

**GitHub Tab**:
- Source: **GitHub**
- Click **"Sign in with GitHub"**
- Organization: (your GitHub username)
- Repository: **commission-os**
- Branch: **main**

**Build Tab**:
- Build Presets: **React**
- App location: `/`
- Output location: `dist`

### Step 4: Deploy

1. Click **"Review + create"**
2. Click **"Create"**
3. Wait 2-3 minutes ⏱️

### Step 5: Get Your URL

1. Click **"Go to resource"**
2. Find your URL: `https://commission-os-XXX.azurestaticapps.net`
3. Click it!
4. **Your app is LIVE!** 🎉

---

## Part 3: Test It Works

### Test Demo Mode

1. Visit your Azure URL
2. Click **"Demo as Admin"**
3. Should see dashboard ✅

### Test Features

- ✅ Navigate all tabs
- ✅ View opportunities
- ✅ Import sales (use sample data)
- ✅ Check settings

---

## Common Issues & Fixes

### "Push rejected"
```bash
# Make sure you created the GitHub repo first!
# Then try again:
git push -u origin main
```

### "Build failed on Azure"
**Check**:
- Go to GitHub → Your repo → Actions tab
- Click the failed run
- Read error message

**Usually means**:
- Build preset should be "React"
- Output location should be "dist"
- App location should be "/"

### "App shows 404"
**Fix in Azure**:
1. Your Static Web App → Configuration
2. Update build settings
3. Save and redeploy

---

## Next Steps

### Connect Azure AD (Optional)
See: `AZURE-AUTH-SETUP.md`

### Add Custom Domain (Optional)
1. Azure → Your app → Custom domains
2. Add your domain
3. Configure DNS CNAME record

### Connect Real Integrations
1. QuickBooks Online
2. Gusto Payroll
3. GoHighLevel CRM

See: `API-INTEGRATION-GUIDE.md`

---

## Quick Commands

```bash
# View git status
git status

# View commit history
git log --oneline -5

# Make updates and push
git add .
git commit -m "Update: description"
git push

# View remote
git remote -v
```

---

## Help & Resources

**Deployment Guide**: `DEPLOYMENT.md`  
**Azure Auth Setup**: `AZURE-AUTH-SETUP.md`  
**API Integration**: `API-INTEGRATION-GUIDE.md`  
**Opportunities**: `OPPORTUNITIES-GUIDE.md`

**Stuck?** Check `DEPLOYMENT.md` for detailed troubleshooting!

---

## You're Done! 🎉

Your app is now live at:
`https://commission-os-XXX.azurestaticapps.net`

**Every time you push to GitHub, it auto-deploys to Azure!**

Enjoy your commission system! 🚀
