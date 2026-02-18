# 🎯 GoHighLevel Opportunities Tracking

## Overview

The **Opportunities tab** provides a complete view of all opportunities synced from GoHighLevel CRM, allowing you to:

✅ Track open opportunities across all sales reps  
✅ Monitor opportunity stages and values  
✅ Import won opportunities as commission lines  
✅ See sync status and last update time  
✅ Filter by sales rep  
✅ Batch import or individual import  

---

## Accessing Opportunities

### Navigation

**Admin Dashboard** → **Opportunities Tab** (4th tab)

---

## Features

### 1. Summary Cards

Three key metrics at the top:

**Total Open**
- Count of opportunities not yet won
- Shows how many are in "Won" status

**Total Value**
- Sum of all opportunity values
- Includes both open and won opportunities

**Won (Pending Import)**
- Count of won opportunities not yet imported as commission lines
- These are ready to be imported

### 2. Rep Filter

Filter opportunities by sales rep:

- **All Reps** - See everything (default)
- **Marisol Vega** - See only Marisol's opportunities
- **Derek Chu** - See only Derek's opportunities
- **Priya Nair** - See only Priya's opportunities

### 3. Sync Button

**🔄 Sync from GHL** button:
- Manually sync opportunities from GoHighLevel
- Shows loading spinner during sync
- Updates "Last sync" timestamp
- Fetches new/updated opportunities

### 4. Opportunities Table

Columns:
- **Contact** - Customer/company name (from GHL contact)
- **Rep** - Assigned sales rep with avatar
- **Stage** - Current pipeline stage
- **Value** - Opportunity dollar amount
- **Commission Type** - Type for commission calculation
- **Closed Date** - When opportunity was won (if applicable)
- **Status** - Synced, Pending, or Imported
- **Action** - Import button (for won opportunities)

### 5. Import Actions

Two ways to import:

**Individual Import:**
- Click "Import" button on any won opportunity
- Instantly creates commission line
- Status changes to "Imported" (shows green ✓ Done)

**Batch Import:**
- Click "Import Won Opps" button (top right)
- Imports ALL won opportunities for selected rep filter
- Creates multiple commission lines at once
- Shows success toast with count

---

## Opportunity Statuses

| Status | Meaning | Visual |
|--------|---------|--------|
| **Pending** | Open opportunity, not won yet | Gray "Pending" pill |
| **Synced** | Won but not imported to commissions | Orange "Synced" pill |
| **Imported** | Already imported as commission line | Green "✓ Done" |

---

## How It Works

### Sync Process

1. **Trigger Sync**
   - Click "🔄 Sync from GHL" button
   - Or automatic sync (if configured in Settings → GHL)

2. **Fetch from GoHighLevel**
   - API call to GHL opportunities endpoint
   - Filters by pipeline and date range
   - Retrieves opportunity details

3. **Data Mapping**
   ```javascript
   GHL Opportunity → CommissionOS Opportunity
   
   contact.name → contact
   assigned_user → repName (matched to system user)
   monetary_value → value
   stage → stage
   custom_field_commission_type → commissionType
   closed_date → closedDate
   opportunity_id → ghlId
   ```

4. **Display in Table**
   - Opportunities appear in table
   - Sorted by date (newest first)
   - Filtered by selected rep

### Import Process

1. **User Clicks Import**
   - Individual: Click "Import" on specific opp
   - Batch: Click "Import Won Opps" at top

2. **Create Sales Record**
   ```javascript
   {
     repName: "Marisol Vega",
     account: "Acme Corporation",
     saleDate: "2025-03-15",
     invoiceId: "ghl_abc123",
     commissionType: "BASE_PREMIUM",
     commissionableAmount: 25000,
     period: "2025-03"
   }
   ```

3. **Calculate Commission**
   - Check for override (account + rep + type)
   - Check for custom rep rate
   - Fall back to global default
   - Calculate: Amount × Rate = Commission

4. **Create Commission Line**
   - Appears in Commissions tab
   - Status: "pending"
   - Ready for payroll processing

5. **Mark as Imported**
   - Opportunity status → "Imported"
   - Action button → "✓ Done"
   - Prevents duplicate imports

---

## Example Workflow

### Scenario: New Won Deal

1. **Sales Rep closes deal in GoHighLevel**
   - Contact: "TechStart Inc"
   - Assigned to: Derek Chu
   - Value: $18,000
   - Custom field "Commission Type": PROJECT
   - Stage moved to: "Won"

2. **Automatic sync** (if enabled)
   - Or admin clicks "🔄 Sync from GHL"
   - Opportunity appears in table

3. **Admin reviews opportunity**
   - Sees Derek's won deal
   - Value: $18,000
   - Commission Type: PROJECT
   - Status: "Synced" (ready to import)

4. **Admin imports**
   - Clicks "Import" button
   - System calculates:
     - Derek's PROJECT rate: 10% (global default)
     - Commission: $18,000 × 10% = $1,800
   - Creates commission line

5. **Line appears in Commissions**
   - Admin → Commissions tab → Derek Chu
   - Shows new $1,800 commission
   - Status: "pending"
   - Ready for payroll

6. **Opportunity status updates**
   - Imported: ✅ 
   - Action: "✓ Done"
   - Can't be imported again

---

## Integration with Commission System

### Commission Calculation

When you import an opportunity, the system:

1. **Finds the rep**
   - Matches opportunity `repName` to system user
   - If no match, shows error

2. **Determines rate** (3-tier hierarchy)
   - **Override**: Check for account-specific override
   - **Custom**: Check rep's custom plan for that type
   - **Global**: Use global default rate

3. **Calculates commission**
   - `commission = opportunityValue × rate`

4. **Creates line**
   - Rep, Account, Amount, Rate, Commission
   - Period (from closed date)
   - Status: "pending"

### Example Calculation

**Opportunity:**
- Contact: Acme Corp
- Rep: Marisol Vega
- Value: $25,000
- Type: BASE_PREMIUM
- Closed: 2025-03-15

**Rate Determination:**
1. Override? Check for Marisol + Acme + BASE_PREMIUM → None
2. Custom? Check Marisol's plan for BASE_PREMIUM → 12%
3. Global? Would be 10%

**Result:** Use 12% (Marisol's custom rate)

**Commission:** $25,000 × 12% = **$3,000**

---

## Configuration

### GoHighLevel Settings

Required fields in GHL:
- Pipeline ID
- Win Stage ID
- Custom field: Commission Type
- Custom field: Sales Rep (or use assigned user)

See **Settings → GoHighLevel CRM** for configuration.

### Sync Frequency Options

- **Real-time** - Webhook fires when stage changes
- **Hourly** - Automatic sync every hour
- **Daily** - Automatic sync once per day
- **Manual** - Only sync when button clicked

---

## Best Practices

### 1. Regular Syncing
- Sync daily or after each big deal
- Don't wait until end of month
- Catch any issues early

### 2. Review Before Import
- Check opportunity values are correct
- Verify rep assignment
- Ensure commission type is set

### 3. Batch Import Monthly
- Filter by rep at month-end
- Click "Import Won Opps"
- Imports all won deals at once
- Faster than individual imports

### 4. Verify Commission Lines
- After import, go to Commissions tab
- Spot-check calculations
- Ensure rates are correct

### 5. Handle Duplicates
- System prevents re-importing
- If you see "✓ Done", it's already imported
- Check Commissions tab for existing line

---

## Troubleshooting

### "No opportunities appearing"
- Check GHL is connected (Settings → GHL)
- Verify pipeline/stage configuration
- Click "🔄 Sync from GHL"
- Check browser console for errors

### "Import button disabled"
- Opportunity is not "Won" yet
- Already imported (shows "✓ Done")
- Rep not matched to system user

### "Wrong commission calculated"
- Check commission type on opportunity
- Verify rep's custom plan (Plans tab)
- Check for overrides (Plans → Overrides)
- Review global defaults (Settings)

### "Opportunity imported twice"
- Shouldn't happen - system prevents duplicates
- If it does, check commission lines
- Delete duplicate from Commissions tab
- Report as bug

---

## Data Fields

### Opportunity Object

```javascript
{
  id: "OPP-001",                    // Internal ID
  ghlId: "ghl_abc123",              // GoHighLevel ID
  contact: "Acme Corporation",      // Customer name
  repName: "Marisol Vega",          // Rep name (from GHL)
  rep: "rep-1",                     // Internal rep ID
  value: 25000,                     // Dollar amount
  stage: "Won",                     // Pipeline stage
  pipelineId: "pipe_1",             // Pipeline ID
  stageId: "stage_won",             // Stage ID
  closedDate: "2025-03-15",         // When won
  commissionType: "BASE_PREMIUM",   // Type for calc
  status: "synced",                 // synced|pending|imported
  imported: false                   // Import flag
}
```

---

## API Integration

### Sync Endpoint (Example)

```javascript
// GET opportunities from GoHighLevel
const response = await fetch(
  'https://services.leadconnectorhq.com/opportunities/search',
  {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Version': '2021-07-28'
    },
    params: {
      location_id: locationId,
      pipelineId: pipelineId,
      status: 'won'
    }
  }
);

// Map to CommissionOS format
const opportunities = response.data.opportunities.map(opp => ({
  ghlId: opp.id,
  contact: opp.contact.name,
  value: opp.monetary_value,
  stage: opp.stage.name,
  closedDate: opp.lastStatusChange,
  // ... etc
}));
```

---

## Keyboard Shortcuts

- **R** - Filter by current rep
- **A** - Show all reps
- **S** - Trigger sync
- **I** - Import first won opportunity

(Note: Not implemented yet, but could be added)

---

## Summary

The Opportunities tab gives you:

✅ Complete visibility into pipeline  
✅ Easy import to commissions  
✅ Rep-level filtering  
✅ Batch or individual import  
✅ Duplicate prevention  
✅ Real-time sync capability  

**Makes commission calculation seamless from GHL!** 🎯
