# CommissionOS Demo Application

A fully interactive sales commission management system demo built with React and Vite.

## Features

- **Admin Dashboard**: Complete commission management with 6 tabs
  - Overview: Summary stats, rep earnings, payrolls, QBO log
  - Commissions: Per-rep commission lines with period filtering
  - Plans: Global defaults, per-rep rate customization, opportunity overrides
  - Payroll: Gusto integration, payroll history, payable breakdown
  - Users: User management with role-based access
  - Integrations: QBO and Gusto connection status

- **Rep Dashboard**: Personal commission view
  - Commission lines filtered by period
  - Account summary with earnings
  - Payment history
  - Monthly trend visualization

## Tech Stack

- React 18
- Vite 5
- No external dependencies (pure React/CSS)

## Local Development

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## Azure Deployment

### Option 1: Deploy via Azure Static Web Apps (Recommended)

#### Prerequisites
- Azure account with active subscription
- GitHub account
- Azure CLI installed (optional but helpful)

#### Steps

1. **Create GitHub Repository**
   ```bash
   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create repo on GitHub and push
   git remote add origin https://github.com/YOUR_USERNAME/commission-demo.git
   git branch -M main
   git push -u origin main
   ```

2. **Create Azure Static Web App**
   
   **Via Azure Portal:**
   - Go to [Azure Portal](https://portal.azure.com)
   - Click "Create a resource"
   - Search for "Static Web App"
   - Click "Create"
   - Fill in the form:
     - **Subscription**: Select your subscription
     - **Resource Group**: Create new or select existing
     - **Name**: `commission-demo-app` (or your preferred name)
     - **Plan type**: Free (for demo) or Standard
     - **Region**: Choose closest to your users
     - **Source**: GitHub
     - **GitHub Account**: Authenticate and authorize
     - **Organization**: Your GitHub username
     - **Repository**: commission-demo
     - **Branch**: main
     - **Build Presets**: React
     - **App location**: `/`
     - **Api location**: (leave empty)
     - **Output location**: `dist`
   - Click "Review + create"
   - Click "Create"

   **Via Azure CLI:**
   ```bash
   # Login to Azure
   az login
   
   # Create resource group
   az group create --name commission-demo-rg --location eastus
   
   # Create Static Web App
   az staticwebapp create \
     --name commission-demo-app \
     --resource-group commission-demo-rg \
     --source https://github.com/YOUR_USERNAME/commission-demo \
     --location eastus \
     --branch main \
     --app-location "/" \
     --output-location "dist" \
     --login-with-github
   ```

3. **Automatic Deployment**
   - Azure automatically adds a GitHub Actions workflow to your repo
   - Every push to `main` triggers a new deployment
   - The workflow file is at `.github/workflows/azure-static-web-apps-*.yml`

4. **Access Your App**
   - In Azure Portal, go to your Static Web App resource
   - Copy the URL (e.g., `https://commission-demo-app-*.azurestaticapps.net`)
   - Your app is now live!

### Option 2: Deploy via Azure App Service

#### Prerequisites
- Azure account
- Azure CLI installed

#### Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Create Azure App Service**
   ```bash
   # Login to Azure
   az login
   
   # Create resource group
   az group create --name commission-demo-rg --location eastus
   
   # Create App Service plan (Linux)
   az appservice plan create \
     --name commission-demo-plan \
     --resource-group commission-demo-rg \
     --sku B1 \
     --is-linux
   
   # Create Web App with Node.js runtime
   az webapp create \
     --resource-group commission-demo-rg \
     --plan commission-demo-plan \
     --name commission-demo-app-unique \
     --runtime "NODE|18-lts"
   ```

3. **Deploy the application**
   ```bash
   # Deploy from local dist folder
   cd dist
   zip -r ../dist.zip .
   cd ..
   
   az webapp deployment source config-zip \
     --resource-group commission-demo-rg \
     --name commission-demo-app-unique \
     --src dist.zip
   ```

4. **Access Your App**
   - URL: `https://commission-demo-app-unique.azurewebsites.net`

### Option 3: Deploy via Azure Storage (Static Website)

#### Prerequisites
- Azure account
- Azure CLI installed

#### Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Create Storage Account**
   ```bash
   # Login to Azure
   az login
   
   # Create resource group
   az group create --name commission-demo-rg --location eastus
   
   # Create storage account (name must be unique globally)
   az storage account create \
     --name commissiondemostorage \
     --resource-group commission-demo-rg \
     --location eastus \
     --sku Standard_LRS \
     --kind StorageV2
   
   # Enable static website hosting
   az storage blob service-properties update \
     --account-name commissiondemostorage \
     --static-website \
     --index-document index.html \
     --404-document index.html
   ```

3. **Upload files**
   ```bash
   # Upload dist folder to $web container
   az storage blob upload-batch \
     --account-name commissiondemostorage \
     --source ./dist \
     --destination '$web' \
     --overwrite
   ```

4. **Get the URL**
   ```bash
   # Get primary endpoint
   az storage account show \
     --name commissiondemostorage \
     --resource-group commission-demo-rg \
     --query "primaryEndpoints.web" \
     --output tsv
   ```

## Environment Variables

Currently, the app uses hardcoded demo data. For production:

1. Create `.env` file:
   ```env
   VITE_API_URL=https://your-api.azurewebsites.net
   VITE_API_KEY=your-api-key
   ```

2. Update Azure configuration to include environment variables

## CI/CD Pipeline

The included GitHub Actions workflow (`.github/workflows/azure-static-web-apps.yml`) automatically:
- Runs on every push to `main`
- Builds the application
- Deploys to Azure Static Web Apps
- Creates preview deployments for pull requests

## Custom Domain (Optional)

### For Azure Static Web Apps:
1. Go to Azure Portal → Your Static Web App
2. Click "Custom domains"
3. Click "Add"
4. Follow the wizard to add your domain
5. Add required DNS records to your domain provider

### For Azure App Service:
```bash
# Add custom domain
az webapp config hostname add \
  --webapp-name commission-demo-app-unique \
  --resource-group commission-demo-rg \
  --hostname www.yourdomain.com

# Enable HTTPS
az webapp update \
  --name commission-demo-app-unique \
  --resource-group commission-demo-rg \
  --https-only true
```

## Monitoring

### Enable Application Insights:
```bash
# Create Application Insights
az monitor app-insights component create \
  --app commission-demo-insights \
  --location eastus \
  --resource-group commission-demo-rg

# Link to Static Web App
az staticwebapp appsettings set \
  --name commission-demo-app \
  --resource-group commission-demo-rg \
  --setting-names APPINSIGHTS_INSTRUMENTATIONKEY=<your-key>
```

## Troubleshooting

### Build fails
- Ensure Node.js version is 18+
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check build logs in GitHub Actions

### Deployment succeeds but site doesn't load
- Check `staticwebapp.config.json` is in the root
- Verify `output_location` is set to `dist` in deployment config
- Check browser console for errors

### 404 on routes
- Ensure `staticwebapp.config.json` has proper route fallback configuration
- For App Service, add `web.config` for URL rewriting

## Cost Estimation

### Azure Static Web Apps
- **Free tier**: $0/month (100 GB bandwidth, custom domains, SSL)
- **Standard tier**: $9/month (unlimited bandwidth, SLA)

### Azure App Service
- **B1 Basic**: ~$13/month
- **S1 Standard**: ~$70/month (with auto-scaling)

### Azure Storage Static Website
- **Storage**: ~$0.02/GB/month
- **Bandwidth**: ~$0.08/GB

## Production Checklist

- [ ] Update with real API endpoints
- [ ] Add authentication (Azure AD B2C recommended)
- [ ] Enable Application Insights
- [ ] Set up custom domain with SSL
- [ ] Configure CDN for better performance
- [ ] Add monitoring alerts
- [ ] Set up backup strategy
- [ ] Review and set appropriate CORS policies

## Support

For issues or questions, create an issue in the GitHub repository.
