# 🆕 Version 2.0 - New Features

## What's New

### ✨ 1. Editable Global Commission Plans

**Location**: Plans Tab → Global Default Rates card

**What it does**:
- Click **"Edit Global →"** button to open the Global Plan editor
- Edit default commission rates for all 6 plan types:
  - Entry Product
  - Premium Product
  - Project
  - Evergreen MRR
  - One-Time MRR
  - Expansion
- Change both **rate (%)** and **basis** (e.g., Gross Margin, Gross Profit)
- Changes apply to all new commission calculations
- Existing custom rep rates remain unaffected

**How to test**:
```
1. Go to Admin view (🛡 button at top)
2. Click "Plans" tab
3. Click "Edit Global →" on Global Default Rates card
4. Drawer opens on right side
5. Change Entry Product rate from 8% to 10%
6. Click "Apply"
7. See toast notification
8. Close drawer - rate is updated on the card
```

---

### ✨ 2. Integration Configuration Settings

**Location**: New "Settings" Tab (7th tab in admin)

**What it does**:
- Dedicated settings page for system configuration
- Configure QuickBooks Online integration:
  - Company name
  - Realm ID
  - Webhook URL
  - Sync frequency (Hourly/Daily/Manual)
  - Auto-sync toggle
  - Disconnect button
- Configure Gusto integration:
  - Company name
  - Company ID
  - Payroll day of month
  - Auto payroll toggle
  - Disconnect button
- View system information (version, environment, database status)

**How to test**:
```
1. Go to Admin view
2. Click "Settings" tab (7th tab)
3. Click "Configure QBO" button
4. Drawer opens with QBO settings
5. Change Company Name
6. Toggle Auto Sync on/off
7. Click "Save Settings"
8. Close and click "Configure Gusto"
9. Change Payroll Day from 5 to 15
10. Toggle Auto Payroll
11. Click "Save Settings"
```

---

### ✨ 3. Integration Quick Settings

**Location**: Integrations Tab (updated)

**What it does**:
- Each integration card now has a **⚙️ Settings** button
- Quick access to configuration without going to Settings tab
- Shows real-time connection status (Connected/Disconnected)
- Status dot changes color based on connection state

**How to test**:
```
1. Go to Admin view
2. Click "Integrations" tab
3. See QuickBooks and Gusto cards
4. Click "⚙️ Settings" on either card
5. Configuration drawer opens
6. Make changes and save
```

---

## New UI Elements

### Drawers (Slide-out Panels)
- **Global Plan Editor** - Edit all default commission rates
- **QBO Configuration** - Configure QuickBooks settings
- **Gusto Configuration** - Configure Gusto payroll settings

### New Buttons
- **"Edit Global →"** - Opens global plan editor
- **"⚙️ Settings"** - Opens integration config (on integration cards)
- **"Configure QBO"** - Opens QBO settings (Settings tab)
- **"Configure Gusto"** - Opens Gusto settings (Settings tab)
- **"Disconnect"** - Disconnects integration (with confirmation)

### New Tab
- **"Settings"** - 7th admin tab for system configuration

---

## Technical Changes

### State Management
- Added `globalPlan` state - tracks global default rates (editable)
- Added `integrations` state - tracks QBO and Gusto configuration
- Added `globalDrawer` state - controls global plan editor
- Added `configOpen` state - controls which integration config is open

### Data Structure
```javascript
// New integration configuration
integrations: {
  qbo: {
    enabled: true/false,
    realmId: "realm-xxx",
    companyName: "Company Inc",
    lastSync: "timestamp",
    webhookUrl: "https://...",
    autoSync: true/false,
    syncFrequency: "hourly"|"daily"|"manual"
  },
  gusto: {
    enabled: true/false,
    companyId: "gst-xxx",
    companyName: "Company Inc",
    lastSync: "timestamp",
    autoPayroll: true/false,
    payrollDay: 1-31
  }
}
```

---

## Testing Checklist

### Global Plan Editing
- [ ] Open global plan editor
- [ ] Change rate for Entry Product
- [ ] Change basis for Premium Product
- [ ] See toast notifications
- [ ] Close drawer and verify changes persist
- [ ] Open rep-specific plan editor
- [ ] Verify it shows new global defaults
- [ ] Verify custom rep rates still show as overrides

### QBO Integration Config
- [ ] Open QBO settings from Settings tab
- [ ] Change company name
- [ ] Change sync frequency
- [ ] Toggle auto-sync on/off
- [ ] Save settings - see toast
- [ ] Reopen - verify changes saved
- [ ] Click Disconnect - see confirmation
- [ ] Cancel confirmation
- [ ] Check Integrations tab - status still "Connected"

### Gusto Integration Config
- [ ] Open Gusto settings from Settings tab
- [ ] Change payroll day
- [ ] Toggle auto payroll
- [ ] Save settings
- [ ] Reopen from Integrations tab ⚙️ button
- [ ] Verify same settings appear
- [ ] Click Disconnect - confirm
- [ ] Check Integrations tab - status shows "Disconnected"

### Settings Tab
- [ ] Navigate to Settings tab
- [ ] See "Global Defaults" section
- [ ] See QBO and Gusto cards
- [ ] See System Information card
- [ ] Click "Edit Global Plan" - drawer opens
- [ ] Click integration config buttons - drawers open

---

## What Stays the Same

- All existing functionality preserved
- Demo switcher still works (Admin/Marisol/Derek/Priya)
- All 6 original admin tabs work as before
- Per-rep plan customization unchanged
- Opportunity overrides unchanged
- Rep dashboard unchanged
- All data and interactions preserved

---

## File Changes

**Modified**: `src/App.jsx`
- Added ~100 lines of code
- 3 new drawer components
- 1 new tab section
- Updated integration cards
- Updated global plan display

**No other files changed** - this is a pure frontend update!

---

## Demo Flow

**Quick demo script**:
```
1. Start at Admin Overview
2. "Let me show you the new Settings tab..."
3. Click Settings tab
4. "Here's where you configure your integrations"
5. Click "Configure QBO"
6. Show settings drawer
7. "You can toggle auto-sync, change frequency..."
8. Close drawer
9. "Now let's edit the global commission plan"
10. Click Plans tab
11. Click "Edit Global →"
12. Change Entry Product to 10%
13. "This becomes the new default for all reps"
14. Show how it updates on the card
15. Open a rep's plan
16. "See how it shows the new 10% as global default"
```

---

## Next Steps

After testing locally:
1. Everything working? Deploy to Azure
2. Need changes? Let me know what to adjust
3. Want more features? We can add them!

Ready to test! 🚀
