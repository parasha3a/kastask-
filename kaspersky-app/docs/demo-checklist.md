# Demo Checklist — 2-Minute Review

This checklist shows the reviewer exactly what to test and where to find evidence of each requirement.

## Prerequisites

```bash
# Start the app
npm run start:fresh

# The app will be available at http://localhost:5173
# json-server runs on http://localhost:3001
```

## Route Coverage (30 seconds)

### ✓ Route 1: Home Page (`/`)

- [ ] Visit http://localhost:5173/
- [ ] See "Welcome to Kaspersky Users Management"
- [ ] See two feature cards: "Users Management" and "Groups Overview"
- [ ] Click "Go to Users" → navigates to `/users`
- [ ] Browser back button returns to `/`

### ✓ Route 2: Users Page (`/users`)

- [ ] Click "Users" in navigation or "Go to Users" from home
- [ ] See table with users
- [ ] Table has columns: ☑ | Name | Account | Email | Group | Phone | Actions
- [ ] See "Users Management" title with "+ Add User" button
- [ ] Table shows 10+ users

### ✓ Route 3: Groups Page (`/groups`)

- [ ] Click "Groups" in navigation
- [ ] See card layout (NOT table)
- [ ] Each card shows: group name, description, color badge, member count
- [ ] See "Unmanaged Users" section below groups
- [ ] Click group card header → expands to show members
- [ ] Click again → collapses

### ✓ Route 4: 404 Page

- [ ] Navigate to http://localhost:5173/nonexistent
- [ ] See "404 Page Not Found" with link back to Home
- [ ] Click "Back to Home" → returns to `/`

---

## Users Page Features (1 minute)

### ✓ Table & Checkboxes

- [ ] All users display in semantic `<table>`
- [ ] First column has checkboxes for each row
- [ ] Header row has "Select All" checkbox (check/uncheck all)
- [ ] Clicking row checkbox highlights that row (light blue background)
- [ ] Select 3 users → shows "3 selected" badge with "Delete Selected" button

### ✓ Search

- [ ] Type "John" in search box
- [ ] Table filters immediately (by fullName, email, account)
- [ ] Type "example.com" → filters by email
- [ ] Type "companydomain/jane" → filters by account
- [ ] Empty search shows all users
- [ ] "Clear Search" button appears when results are empty (e.g., search for "zzz")

### ✓ Sorting

- [ ] Click "Name" header → sorts A-Z (arrow ▲ shows)
- [ ] Click "Name" again → sorts Z-A (arrow ▼ shows)
- [ ] Click "Name" again → removes sort (arrow gray, no sort)
- [ ] Sort arrows persist when searching
- [ ] Sort works on: Name, Account, Email, Group
- [ ] Phone column NOT sortable (no click handler)

### ✓ Add User

- [ ] Click "+ Add User" button
- [ ] Modal appears with form: Full Name, Account, Email, Phone, Group (optional)
- [ ] Fill in form:
  - Full Name: "Test User"
  - Account: "companydomain/testuser"
  - Email: "test@example.com"
  - Phone: "+1234567890"
  - Group: "CDN/CEO"
- [ ] Click "Add User" button
- [ ] Modal closes, toast shows "User added successfully"
- [ ] New user appears at end of table
- [ ] Try adding with empty fields → validation errors appear
- [ ] Modal closes on "Close" button click

### ✓ Delete User (with 5-second Undo)

- [ ] Find a user in the table
- [ ] Click trash icon (🗑) in Actions column
- [ ] Confirmation modal: "Are you sure? User will be deleted in 5 seconds unless you undo"
- [ ] Click "Delete" → modal closes
- [ ] Toast appears: "User will be deleted in 5 seconds" with "Undo" button
- [ ] **Test Undo**: Click "Undo" button within 5 seconds
- [ ] User reappears in table, toast dismisses
- [ ] Toast has 5-second countdown, then auto-dismisses
- [ ] **Test Auto-delete**: Delete a user, wait 5 seconds without clicking Undo
- [ ] Toast auto-closes, user is permanently gone from table
- [ ] Try to find deleted user in table → gone

### ✓ Bulk Delete

- [ ] Select 3 users with checkboxes
- [ ] Click "Delete Selected" button
- [ ] Confirmation modal: "Are you sure? Users will be deleted in 5 seconds"
- [ ] Click "Delete" → all 3 users disappear from table
- [ ] Toast: "3 users deleted" with "Undo" button
- [ ] If you click "Undo" → all 3 users reappear

### ✓ Loading & Error States

- [ ] Hard refresh the page → table skeleton loads (animated gray placeholders)
- [ ] After ~500ms, skeleton disappears, table shows data
- [ ] Try fetching from wrong port (in dev tools, simulate network error)
- [ ] Error message appears: "Error loading users"
- [ ] "Retry" button is present and clickable

---

## Groups Page Features (30 seconds)

### ✓ Card Layout

- [ ] Groups display as cards (not table), 2-3 per row on desktop
- [ ] Each card shows:
  - Color square badge (colored circle)
  - Group name (e.g., "CDN/CEO")
  - Group description
  - Member count (e.g., "5 members")

### ✓ Expandable Cards

- [ ] Click group card header
- [ ] Card expands, shows list of members (names + emails)
- [ ] Expand button rotates (▼ → ▲)
- [ ] aria-expanded="true" attribute (check DevTools)
- [ ] Click again → collapses

### ✓ Unmanaged Users

- [ ] Scroll to bottom of page
- [ ] See "Unmanaged Users" section
- [ ] List shows users with no group (groupId === null)
- [ ] Each shows name and email

### ✓ Responsive

- [ ] Resize window to mobile (375px wide)
- [ ] Grid becomes 1 column
- [ ] Cards still functional (tap to expand)
- [ ] Text remains readable

---

## Cross-Cutting Features (30 seconds)

### ✓ Document Titles

- [ ] Open DevTools console
- [ ] Navigate to `/` → document.title = "Kaspersky Users App — Home"
- [ ] Navigate to `/users` → document.title = "Kaspersky Users App — Users"
- [ ] Navigate to `/groups` → document.title = "Kaspersky Users App — Groups"

### ✓ Accessibility (a11y)

- [ ] Open page in accessibility tree (DevTools > Elements > Accessibility)
- [ ] Table headers have `scope="col"`
- [ ] Sortable headers have `aria-sort="none|ascending|descending"`
- [ ] Buttons have descriptive `aria-label`
- [ ] No "contrast" warnings in DevTools accessibility panel

### ✓ Code Quality

- [ ] Run `npm run lint` → no errors
- [ ] All React Hooks rules followed (no missing dependencies)
- [ ] All components are proper React components (PascalCase)
- [ ] CSS is scoped (CSS Modules, no leakage)

### ✓ API Integration

- [ ] Stop json-server (Ctrl+C on port 3001)
- [ ] Reload page → error message appears, users can't load
- [ ] Restart json-server → users reload successfully
- [ ] Data persists across page refreshes (in json-server)
- [ ] Add/delete operations call `/users`, `/groups` endpoints

---

## Performance (Optional, but impressive)

- [ ] Open Chrome DevTools > Performance tab
- [ ] Record interaction: add a user
- [ ] Flame chart shows no long tasks
- [ ] FCP (First Contentful Paint) < 1s
- [ ] No layout shifts when data loads (skeleton prevents jank)

---

## Summary Checklist

- [ ] 4 routes work (/, /users, /groups, 404)
- [ ] Users page: search, sort, add, delete (with undo), select all
- [ ] Groups page: card layout, expand/collapse, unmanaged section
- [ ] Accessibility: ARIA attributes, semantic HTML, contrast
- [ ] Code quality: lint passes, CSS Modules, clean hooks
- [ ] API: real fetch calls, error handling, retry

**Total demo time: ~2 minutes**
**Evidence of completeness: All boxes checked = Assignment done**
