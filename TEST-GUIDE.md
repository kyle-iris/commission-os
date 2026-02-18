# 🧪 Quick Test Guide - Version 2.0

## Test in 3 Minutes

### Setup
```bash
cd ~/Downloads/commission-demo-app
npm install  # (if not already done)
npm run dev
```

Visit: http://localhost:3000

---

## Test 1: Edit Global Commission Plans (30 seconds)

1. **Click** 🛡 Admin (demo switcher at top)
2. **Click** "Plans" tab
3. **See** "Global Default Rates" card at top
4. **Click** "Edit Global →" button (top right of card)
5. **Drawer opens** on right side
6. **Change** Entry Product rate from 8.0% to 10.0%
7. **Click** "Apply" button
8. **See** green toast: "Entry Product global rate updated"
9. **Close** drawer (X button)
10. **Verify** card now shows 10.0% for Entry Product

✅ **Expected**: Rate changes, toast shows, card updates

---

## Test 2: Configure QBO Integration (30 seconds)

1. **Stay in** Admin view
2. **Click** "Settings" tab (7th tab)
3. **See** "QuickBooks Online" card
4. **Click** "Configure QBO" button
5. **Drawer opens** with QBO settings
6. **Change** Company Name to "My Test Company"
7. **Toggle** "Auto Sync" off
8. **Change** Sync Frequency to "Daily"
9. **Click** "Save Settings" button
10. **See** green toast: "QBO settings saved"

✅ **Expected**: Drawer opens, fields editable, saves successfully

---

## Test 3: Configure Gusto Integration (30 seconds)

1. **Still in** Settings tab
2. **See** "Gusto Payroll" card
3. **Click** "Configure Gusto" button
4. **Drawer opens** with Gusto settings
5. **Change** Payroll Day from 5 to 15
6. **Toggle** "Auto Payroll" on
7. **Click** "Save Settings"
8. **See** toast: "Gusto settings saved"

✅ **Expected**: Settings save, drawer closes

---

## Test 4: Integration Quick Settings (20 seconds)

1. **Click** "Integrations" tab
2. **See** QuickBooks and Gusto cards
3. **See** "⚙️ Settings" button on each card
4. **Click** "⚙️ Settings" on QBO card
5. **Drawer opens** (same as Settings tab config)
6. **Close** drawer
7. **Click** "⚙️ Settings" on Gusto card
8. **Drawer opens** for Gusto

✅ **Expected**: Quick access to config from Integrations tab

---

## Test 5: Disconnect Integration (30 seconds)

1. **Open** QBO settings (any method)
2. **Scroll down**
3. **Click** "Disconnect" button (red)
4. **See** confirmation popup: "Disconnect QBO integration?"
5. **Click** Cancel
6. **Nothing happens** (stayed connected)
7. **Click** Disconnect again
8. **Click** OK
9. **See** red toast: "QBO disconnected"
10. **Go to** Integrations tab
11. **See** QBO status: "Disconnected" (red dot)

✅ **Expected**: Confirmation works, status updates

---

## Test 6: Global Plan Affects Rep Plans (45 seconds)

1. **Go to** Plans tab
2. **Click** "Edit Global →"
3. **Change** Premium Product to 12.0%
4. **Click** Apply
5. **Close** drawer
6. **Scroll down** to Marisol's plan card
7. **See** Premium shows 12.0% (was customized to 12% before, matches global now)
8. **See** Entry shows 10.0% with orange highlight (custom, different from global)
9. **Click** "Edit plan →" for Marisol
10. **See** drawer shows global defaults
11. **Premium**: 12.0% - labeled "Global default"
12. **Entry**: 10.0% - labeled "Custom · global: 10.0%"

✅ **Expected**: Rep plans update to reflect new global defaults

---

## All Tests Pass? ✅

**You're ready to deploy!**

See `DEPLOYMENT.md` for Azure deployment steps.

---

## Found Issues? 🐛

Note them and let me know:
- Which test failed?
- What happened vs. what you expected?
- Any errors in browser console? (F12)

---

## Advanced Testing

### Check State Persistence
1. Change global plan
2. Switch to Rep view (Marisol)
3. Switch back to Admin
4. Go to Plans tab
5. ✅ Changes should still be there

### Check All Drawers
- [ ] Global Plan Editor opens/closes
- [ ] QBO Config opens/closes
- [ ] Gusto Config opens/closes
- [ ] Rep Plan Editor still works
- [ ] Override Editor still works

### Check All Buttons
- [ ] "Edit Global →" works
- [ ] "⚙️ Settings" (x2) work
- [ ] "Configure QBO" works
- [ ] "Configure Gusto" works
- [ ] "Save Settings" (x2) work
- [ ] "Disconnect" (x2) work with confirmation

---

## Performance Check

All operations should be:
- ⚡ **Instant** - No loading delays
- 🎯 **Smooth** - Drawer animations work
- 💚 **Toast** - Success messages appear
- 🔄 **Reactive** - UI updates immediately

---

## Browser Console

**Should see NO errors!**

Open DevTools (F12) → Console tab → Should be clean

If you see errors, note them for debugging.

---

## Total Test Time: ~3 minutes

All 6 tests should complete in under 3 minutes. If something's broken, it'll be obvious immediately.

Happy testing! 🚀
