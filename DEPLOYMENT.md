# 🚀 Complete Deployment Guide - GitHub → Azure Static Web Apps

This guide walks you through deploying CommissionOS to production in ~10 minutes.

---

## 📋 Prerequisites

- ✅ GitHub account (free)
- ✅ Azure account (free tier available)
- ✅ Git installed on your Mac
- ✅ This code on your computer

---

## Step 1: Push to GitHub (5 minutes)

### Initialize Git Repository

```bash
cd ~/Downloads/commission-demo-app

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - CommissionOS v4.0.1"
```

### Create GitHub Repository

**Option A: Using GitHub Website** (Easiest)

1. Go to https://github.com/new
2. Repository name: `commission-os`
3. Description: `Sales Commission Management System`
4. Choose Public or Private
5. **DO NOT** check "Add README" (we already have files)
6. Click **"Create repository"**

### Push Code to GitHub

After creating the repo, GitHub shows you commands. Use these:

```bash
# Add GitHub as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/commission-os.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

**Enter your GitHub credentials when prompted**

### Verify Upload

Go to `https://github.com/YOUR-USERNAME/commission-os` - you should see all your files! ✅

---

## Step 2: Deploy to Azure Static Web Apps (5 minutes)

### Create Azure Static Web App

1. **Go to Azure Portal**: https://portal.azure.com

2. **Click "Create a resource"** (big + button, top left)

3. **Search for**: `Static Web App`

4. **Click "Create"**

### Configure Your App

**Basics Tab:**
- **Subscription**: Choose your subscription
- **Resource Group**: 
  - Click "Create new"
  - Name: `commission-os-rg`
  - Click OK
- **Name**: `commission-os` (or any unique name)
- **Plan type**: 
  - Choose **"Free"** for testing
  - Choose **"Standard"** for production ($9/month)
- **Region**: Choose closest to you
  - East US 2
  - West US 2  
  - West Europe
  - etc.

**GitHub Deployment:**
- **Source**: GitHub
- Click **"Sign in with GitHub"**
- Authorize Azure to access GitHub

**Repository Details:**
- **Organization**: Your GitHub username
- **Repository**: `commission-os`
- **Branch**: `main`

**Build Details:**
- **Build Presets**: Select **"React"**
- **App location**: `/` (just a forward slash)
- **Api location**: (leave empty)
- **Output location**: `dist`

### Deploy

- Click **"Review + create"**
- Review settings
- Click **"Create"**
- Wait 2-3 minutes ⏱️

### Get Your URL

After deployment completes:
- Click **"Go to resource"**
- Look for **URL** near top: `https://commission-os-XXXX.azurestaticapps.net`
- Click the URL to view your live app! 🎉

---

## Step 3: Configure Production Settings

### Set Environment Variables

1. **In Azure Portal** → Your Static Web App
2. **Settings** → **Configuration** (left menu)
3. **Click "+ Add"** for each variable:

```
Name: VITE_AZURE_CLIENT_ID
Value: (leave empty for now, or add your Azure AD Client ID)

Name: VITE_AZURE_TENANT_ID  
Value: (leave empty for now, or add your Tenant ID)

Name: VITE_AZURE_AUTHORITY
Value: https://login.microsoftonline.com/YOUR-TENANT-ID

Name: VITE_REDIRECT_URI
Value: https://your-static-web-app-url.azurestaticapps.net

Name: VITE_POST_LOGOUT_REDIRECT_URI
Value: https://your-static-web-app-url.azurestaticapps.net
```

4. **Click "Save"** at top
5. App will automatically redeploy with new variables

### For Demo Mode (No Azure AD)

You can skip environment variables! The app works in demo mode by default.

---

## Step 4: Set Up Azure AD (Optional - For Real Authentication)

See **AZURE-AUTH-SETUP.md** for complete Azure AD configuration.

Quick steps:
1. Azure AD → App registrations → New
2. Name: `CommissionOS Production`
3. Redirect URI: Your Static Web App URL
4. Copy Client ID and Tenant ID
5. Add to Configuration (Step 3 above)
6. Test authentication

---

## Step 5: Custom Domain (Optional)

### Add Custom Domain

1. **Azure Portal** → Your Static Web App
2. **Settings** → **Custom domains**
3. **Click "Add"**
4. Enter: `commissionos.yourcompany.com`

### Configure DNS

At your domain registrar (GoDaddy, Namecheap, etc.):

```
Type: CNAME
Name: commissionos (or your subdomain)
Value: your-static-web-app.azurestaticapps.net
TTL: 3600
```

### Wait & Verify

- DNS propagation: 5-60 minutes
- Azure validates automatically
- SSL certificate auto-generated (FREE!)
- Domain ready to use! ✅

---

## 🔄 Continuous Deployment (Auto-Setup!)

Azure automatically created a GitHub Actions workflow!

### How It Works

Every time you push code to GitHub:
1. GitHub Action triggers automatically
2. Builds your React app
3. Deploys to Azure
4. Usually completes in 2-3 minutes

### View Deployment Status

**GitHub**:
- Your repo → **Actions** tab
- See build progress, logs, errors

**Azure**:
- Your Static Web App → **Deployments**
- See deployment history

### Trigger Deployment

```bash
# Make any change
echo "Update" >> README.md

# Commit and push
git add .
git commit -m "Trigger deployment"
git push

# Watch in GitHub Actions tab!
```

---

## 🧪 Testing Your Production App

1. **Visit your URL**: `https://your-app.azurestaticapps.net`

2. **Test Demo Mode**:
   - Click "Demo as Admin"
   - Click "Demo as Sales Rep"
   - Should work instantly!

3. **Test Features**:
   - Navigate all tabs
   - Import sales CSV
   - View opportunities
   - Check integrations

4. **Test Azure AD** (if configured):
   - Click "Sign in with Microsoft"
   - Should redirect to Microsoft login
   - Sign in with your work account
   - Should redirect back to app

---

## 📊 Monitoring & Logs

### GitHub Actions Logs

- GitHub → Your repo → **Actions**
- Click any workflow run
- See detailed build logs
- Check for errors

### Azure Application Insights (Optional)

Enable monitoring:
1. Azure Portal → Your Static Web App
2. **Monitoring** → **Application Insights**
3. Click **"Enable"**
4. View:
   - Page views
   - Performance
   - Errors
   - User behavior

---

## 🔒 Security Checklist

Before going live:

- [ ] Azure AD configured (or demo mode only for testing)
- [ ] Environment variables set in Azure (not in code)
- [ ] SSL enabled (automatic with Azure)
- [ ] No API keys in GitHub
- [ ] `.gitignore` includes `.env` files
- [ ] Test all authentication flows
- [ ] Test with real user accounts
- [ ] Set up user roles in Azure AD
- [ ] Review guest user access

---

## 💰 Cost Breakdown

### Free Tier (Sufficient for Testing)
- ✅ 100 GB bandwidth/month
- ✅ 2 custom domains
- ✅ SSL certificates
- ✅ GitHub Actions CI/CD
- ✅ Staging environments
- **Cost**: **$0/month**

### Standard Tier (Production)
- All free tier features plus:
- 💰 Unlimited bandwidth
- 💰 More custom domains
- 💰 SLA guarantee
- 💰 Advanced features
- **Cost**: **$9/month**

**Recommendation**: Start with Free tier!

---

## 🐛 Troubleshooting

### Build Fails

**Symptom**: GitHub Action shows red X

**Check**:
1. GitHub Actions → Click failed run → View logs
2. Look for error message
3. Common issues:
   - Missing dependency in package.json
   - Wrong build command
   - Incorrect output location

**Fix**:
- Update configuration in Azure Portal
- Or edit `.github/workflows/azure-static-web-apps-*.yml`
- Push changes

### App Shows 404

**Check**:
- Output location is `dist` (not `build`)
- Build preset is "React"
- App location is `/`

**Fix**:
- Azure Portal → Your app → Configuration
- Update build settings
- Trigger new deployment

### Login Not Working

**Check**:
- Environment variables set?
- Redirect URI matches exactly?
- Client ID correct?

**Fix**:
- Verify environment variables in Azure
- Check Azure AD app registration
- Test in incognito mode (clear cache)

### Custom Domain Not Working

**Wait**: DNS propagation takes 5-60 minutes

**Check**:
- CNAME record correct?
- Points to .azurestaticapps.net URL?

**Test**:
```bash
# Check DNS
nslookup commissionos.yourcompany.com

# Should show:
# CNAME → your-app.azurestaticapps.net
```

---

## 🔄 Making Updates

### Update Code

```bash
cd ~/Downloads/commission-demo-app

# Make changes to code...

# Commit
git add .
git commit -m "Feature: Add new commission type"

# Push (auto-deploys!)
git push
```

### Watch Deployment

- GitHub → Actions tab
- See build progress
- Usually 2-3 minutes
- Green checkmark = Success! ✅

### Verify Changes

- Visit your Azure URL
- May need to refresh (Cmd+Shift+R)
- Changes should be live!

---

## 📚 Additional Resources

**Azure Static Web Apps**:
https://docs.microsoft.com/azure/static-web-apps/

**GitHub Actions**:
https://docs.github.com/actions

**Azure AD Setup**:
See `AZURE-AUTH-SETUP.md` in this repo

**Cost Calculator**:
https://azure.microsoft.com/pricing/calculator/

---

## 🎯 Quick Command Reference

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/commission-os.git
git branch -M main
git push -u origin main

# Make updates
git add .
git commit -m "Update: description"
git push

# Check status
git status
git log --oneline -5
```

---

## ✅ Deployment Checklist

### Initial Deployment
- [ ] Code pushed to GitHub
- [ ] Azure Static Web App created
- [ ] Build configuration correct (React, /, dist)
- [ ] App accessible at Azure URL
- [ ] Demo mode works

### Production Ready
- [ ] Azure AD configured
- [ ] Environment variables set
- [ ] Custom domain added (optional)
- [ ] SSL working (automatic)
- [ ] All features tested
- [ ] Team members invited

### Go Live!
- [ ] Real QuickBooks connected
- [ ] Real Gusto connected  
- [ ] Real GoHighLevel connected
- [ ] Test with actual data
- [ ] Monitor for errors
- [ ] Ready for users! 🚀

---

## 🎉 You're Live!

Congratulations! Your commission system is now running in production on Azure! 

**Next steps**:
1. Share URL with your team
2. Set up user accounts in Azure AD
3. Connect to real integrations
4. Start processing commissions!

**Need help?** Check the troubleshooting section or Azure docs.

**Everything working?** Time to celebrate! 🎊
