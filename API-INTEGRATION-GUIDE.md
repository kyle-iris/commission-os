# 🔌 API Integration Guide - Version 3.0

## Overview

Production-ready API configurations for:
1. ✅ **QuickBooks Online** (OAuth 2.0)
2. ✅ **Gusto Payroll** (OAuth 2.0)
3. ✅ **GoHighLevel CRM** (API Key) - **NEW!**

---

## 1. QuickBooks Online Integration

### Setup Steps
1. Go to https://developer.intuit.com
2. Create app → QuickBooks Online
3. Get Client ID & Secret
4. Add redirect URI: `https://your-domain.com/auth/qbo/callback`

### Configuration
```javascript
clientId: "ABxxxxxxxxxx..."
clientSecret: "xxxxx..."
realmId: "123456789012345"
environment: "sandbox" or "production"
webhookUrl: "https://your-domain.com/webhooks/qbo"
```

### What Syncs
- Invoices → Commission-able sales
- Payments → Payment receipts
- Customers → Account names

---

## 2. Gusto Payroll Integration

### Setup Steps
1. Go to https://dev.gusto.com
2. Create application
3. Get Client ID & Secret
4. Add redirect URI: `https://your-domain.com/auth/gusto/callback`

### Configuration
```javascript
clientId: "xxxxxxxx..."
clientSecret: "xxxxx..."
companyUuid: "xxxxxxxx-xxxx..."
payrollSchedule: "monthly"
payrollDay: 5
```

### What Syncs
- Employees → Matched to reps
- Payroll Runs → Commission payments
- Pay Stubs → Confirmations

---

## 3. GoHighLevel CRM Integration ⭐ NEW

### Setup Steps
1. GHL → Settings → Integrations → API Key
2. Copy API Key
3. Copy Location ID
4. Note Pipeline ID & Win Stage ID
5. Create custom fields for commission data

### Configuration
```javascript
apiKey: "xxxxxxxxxxxxxxxxxxxxxxxx"
locationId: "xxxxxxxxxxxxxxxx"
pipelineId: "xxxxxxxxxxxxxxxx"
winStageId: "xxxxxxxxxxxxxxxx"
repFieldId: "contact.assigned_user"
commissionTypeFieldId: "opportunity.custom_xxxxx"
commissionAmountFieldId: "opportunity.monetary_value"
```

### How It Works
1. Opportunity reaches "Won" stage
2. Webhook fires (real-time) OR sync runs
3. System extracts: rep, account, amount, type
4. Calculates commission using hierarchy
5. Creates commission line

### Custom Fields in GHL
**Sales Rep**: Dropdown matching your rep names
**Commission Type**: Dropdown with values:
- BASE_ENTRY
- BASE_PREMIUM  
- PROJECT
- MRR_EVERGREEN
- MRR_ONE_TIME
- EXPANSION

### Webhook Setup (Real-time)
1. GHL → Webhooks → Create
2. Event: "Opportunity Status Changed"
3. URL: Your endpoint
4. Include secret

---

## Testing

### QuickBooks
1. Click "Connect to QuickBooks"
2. Authorize
3. Click "Poll payments"
4. Verify data in QBO Log

### Gusto
1. Click "Connect to Gusto"
2. Authorize
3. Click "Sync employees"
4. Verify employees match

### GoHighLevel
1. Enter API Key & Location ID
2. Click "Connect"
3. Click "Test Sync"
4. Should see "Synced X opportunities"

---

## API Documentation

**QuickBooks**: https://developer.intuit.com  
**Gusto**: https://dev.gusto.com  
**GoHighLevel**: https://highlevel.stoplight.io

All integrations are production-ready! 🚀
