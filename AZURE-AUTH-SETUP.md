# 🔐 Azure AD Authentication Setup Guide

## Overview

CommissionOS now includes **enterprise-grade authentication** using **Microsoft Azure Active Directory (Azure AD)** with support for:

✅ **Internal Users** - Your organization's Azure AD tenant members  
✅ **Guest Users** - External users invited via Azure AD B2B collaboration  
✅ **Role-Based Access Control** - Admin, Manager, Sales Rep, Guest roles  
✅ **Single Sign-On (SSO)** - One Microsoft account for all apps  

---

## Quick Start (Demo Mode)

The app includes a **demo mode** for testing without Azure AD setup:

```bash
npm run dev
# Visit http://localhost:3000
# Click "Demo as Admin" or "Demo as Sales Rep"
```

---

## Azure AD Setup (Production)

### Step 1: Register Application in Azure Portal

1. **Go to Azure Portal**
   - Visit https://portal.azure.com
   - Sign in with your Azure AD admin account

2. **Navigate to Azure Active Directory**
   - Search for "Azure Active Directory" in top search bar
   - Or find it in left sidebar

3. **Register New Application**
   - Click "App registrations" (left menu)
   - Click "New registration"
   - Fill in details:
     - **Name**: `CommissionOS` (or your preferred name)
     - **Supported account types**: 
       - Select "Accounts in this organizational directory only" (Single tenant)
       - OR "Accounts in any organizational directory" (Multi-tenant for B2B)
     - **Redirect URI**: 
       - Platform: `Single-page application (SPA)`
       - URI: `http://localhost:3000` (for dev)
       - Add: `https://your-production-domain.com` (for prod)
   - Click "Register"

4. **Copy Application (client) ID**
   - On the Overview page, copy the **Application (client) ID**
   - Save this - you'll need it for `.env` file

5. **Copy Directory (tenant) ID**
   - Also on Overview page, copy the **Directory (tenant) ID**
   - Save this as well

### Step 2: Configure API Permissions

1. **Add Permissions**
   - Click "API permissions" (left menu)
   - Click "Add a permission"
   - Select "Microsoft Graph"
   - Select "Delegated permissions"
   - Add these permissions:
     - `User.Read` (read user profile)
     - `email` (read email address)
     - `profile` (read basic profile)
     - `openid` (OpenID Connect sign-in)
   - Click "Add permissions"

2. **Grant Admin Consent**
   - Click "Grant admin consent for [Your Organization]"
   - Click "Yes" to confirm
   - All permissions should now show green checkmarks

### Step 3: Configure Authentication

1. **Access Tokens**
   - Click "Authentication" (left menu)
   - Scroll to "Implicit grant and hybrid flows"
   - Check ✅ "Access tokens"
   - Check ✅ "ID tokens"
   - Click "Save"

2. **Advanced Settings** (Optional)
   - Allow public client flows: No (for SPAs)
   - Supported account types: As configured in Step 1

### Step 4: Configure App Roles (Optional but Recommended)

1. **Define Roles**
   - Click "App roles" (left menu)
   - Click "Create app role"
   - Create each role:

**Admin Role:**
```
Display name: Admin
Allowed member types: Users/Groups
Value: Admin
Description: Full administrative access
Enable this app role: ✅
```

**Manager Role:**
```
Display name: Manager
Allowed member types: Users/Groups
Value: Manager
Description: Manager access with team oversight
Enable this app role: ✅
```

**SalesRep Role:**
```
Display name: SalesRep
Allowed member types: Users/Groups
Value: SalesRep
Description: Sales representative access
Enable this app role: ✅
```

2. **Assign Users to Roles**
   - Go to "Enterprise applications" in Azure AD
   - Find your app (CommissionOS)
   - Click "Users and groups"
   - Click "Add user/group"
   - Select user → Select role → Assign

### Step 5: Configure Environment Variables

Create `.env` file in project root:

```env
# Azure AD Configuration
VITE_AZURE_CLIENT_ID=your-client-id-here
VITE_AZURE_TENANT_ID=your-tenant-id-here
VITE_AZURE_AUTHORITY=https://login.microsoftonline.com/your-tenant-id-here
VITE_REDIRECT_URI=http://localhost:3000
VITE_POST_LOGOUT_REDIRECT_URI=http://localhost:3000
```

**For Production:**
```env
VITE_REDIRECT_URI=https://your-domain.com
VITE_POST_LOGOUT_REDIRECT_URI=https://your-domain.com
```

### Step 6: Install MSAL Package

```bash
npm install @azure/msal-browser @azure/msal-react
```

### Step 7: Update authConfig.js

The file is already configured! Just update the environment variables and it will work.

---

## Guest User Setup (B2B Collaboration)

### Inviting External Users

1. **Go to Azure AD**
   - Portal → Azure Active Directory

2. **Invite Guest**
   - Click "Users" (left menu)
   - Click "New user" → "Invite external user"
   - Fill in:
     - **Name**: Guest's full name
     - **Email**: Their external email (Gmail, Outlook, etc.)
     - **Personal message**: Optional welcome message
   - Click "Invite"

3. **Guest Receives Email**
   - Guest gets invitation email
   - Clicks "Accept invitation"
   - Authenticates with their email provider
   - Gets access to your apps

4. **Assign Role to Guest**
   - Go to Enterprise applications → CommissionOS
   - Users and groups → Add user/group
   - Select the guest user
   - Assign appropriate role (usually "Guest" or "SalesRep")

### Guest User Experience

- Guest signs in with their own email (Gmail, Outlook, etc.)
- Azure AD handles authentication via their provider
- Guest sees "Guest" badge in app UI
- Access is controlled by role assignment
- You can revoke access anytime from Azure Portal

---

## Testing Authentication

### Test with Demo Mode

1. Start app: `npm run dev`
2. Click "Demo as Admin" or "Demo as Sales Rep"
3. You'll see the dashboard without Azure AD

### Test with Azure AD (Dev)

1. Ensure `.env` is configured
2. Start app: `npm run dev`
3. Click "Sign in with Microsoft"
4. Redirected to Microsoft login
5. Sign in with your Azure AD account
6. Consent to permissions (first time only)
7. Redirected back to app
8. You're logged in!

### Test Role-Based Access

1. Log in as Admin → See all tabs
2. Log in as Sales Rep → See limited tabs
3. Log in as Guest → See restricted access

---

## User Role Mapping

The app automatically determines roles from Azure AD:

```javascript
// Role determination priority:
1. Custom app roles (configured in Azure AD)
   → If user has "Admin" role → Admin access
   → If user has "Manager" role → Manager access
   → If user has "SalesRep" role → Rep access

2. User type (internal vs guest)
   → If userType === "Guest" → Guest access
   → If email contains "#EXT#" → Guest access

3. Default
   → Internal users without role → Rep access
   → Guest users → Guest access
```

### Role Capabilities

| Role | Access Level |
|------|--------------|
| **Admin** | Full access - all tabs, all data, all settings |
| **Manager** | Team oversight - view all reps, cannot modify settings |
| **SalesRep** | Own data only - view own commissions, cannot see others |
| **Guest** | Limited - view only, no modifications |

---

## Security Features

✅ **OAuth 2.0 / OpenID Connect** - Industry standard authentication  
✅ **Token Auto-Refresh** - Seamless session management  
✅ **Role-Based Access Control** - Granular permissions  
✅ **Guest User Isolation** - External users can't see internal data  
✅ **Secure Token Storage** - sessionStorage (not localStorage)  
✅ **HTTPS Required** - Production deployments must use SSL  
✅ **Logout Confirmation** - Clear session and tokens  

---

## Production Deployment

### Azure Static Web Apps

1. **Configure Redirect URIs**
   - Azure Portal → App registrations → Your app
   - Authentication → Add platform → Single-page application
   - Add: `https://your-static-web-app.azurestaticapps.net`

2. **Update Environment Variables**
   - In GitHub repository secrets or Azure configuration
   - Set production URLs

3. **Deploy**
   ```bash
   git push origin main
   # GitHub Actions will deploy automatically
   ```

### Custom Domain

1. **Add Custom Domain in Azure Portal**
   - Your Static Web App → Custom domains
   - Add your domain

2. **Update Redirect URI**
   - Azure AD app registration
   - Add: `https://commissionos.yourcompany.com`

3. **Update .env**
   ```env
   VITE_REDIRECT_URI=https://commissionos.yourcompany.com
   ```

---

## Troubleshooting

### "AADSTS50011: Reply URL mismatch"
- **Fix**: Add exact redirect URI in Azure Portal
- Check for http vs https
- Check for trailing slashes

### "AADSTS65001: User or administrator has not consented"
- **Fix**: Grant admin consent in Azure Portal
- Or have each user consent on first login

### "User has no roles assigned"
- **Fix**: Assign user to app role in Enterprise applications
- Or configure default role in code

### "Guest user cannot access"
- **Fix**: Ensure guest has been invited via Azure AD
- Assign appropriate role to guest user
- Check that multi-tenant is enabled if needed

### Tokens not refreshing
- **Fix**: Check that refresh tokens are enabled
- Verify token expiry settings in Azure AD
- Ensure MSAL is configured correctly

---

## Advanced Configuration

### Custom Claims

Add custom claims to tokens (e.g., rep ID):

1. **Azure AD → App registrations → Token configuration**
2. Click "Add optional claim"
3. Select ID token
4. Add claims: email, name, groups
5. These appear in `account.idTokenClaims`

### Conditional Access

Require MFA for admin users:

1. **Azure AD → Security → Conditional Access**
2. Create new policy
3. Assign to users with Admin role
4. Require MFA

### Audit Logs

Track who logs in:

1. **Azure AD → Monitoring → Sign-in logs**
2. Filter by application (CommissionOS)
3. Export logs for compliance

---

## Cost

Azure AD authentication is **FREE** for:
- Up to 50,000 monthly active users
- B2B guest users (first 50,000 free)
- Basic SSO and user management

Premium features (P1/P2) add:
- Advanced security
- Conditional access
- Identity protection
- Group-based licensing

For most SMBs: **$0/month** 🎉

---

## Next Steps

1. ✅ Register app in Azure Portal
2. ✅ Configure redirect URIs
3. ✅ Set up environment variables
4. ✅ Install MSAL package
5. ✅ Test with demo mode first
6. ✅ Test with Azure AD
7. ✅ Invite guest users
8. ✅ Deploy to production
9. ✅ Monitor sign-in logs

**You're ready for enterprise-grade authentication!** 🚀
