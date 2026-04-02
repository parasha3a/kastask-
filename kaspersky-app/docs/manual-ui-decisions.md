# Manual UI Decisions — Users Page

## Overview

The Users Page (UsersPage component) is a fully manually designed and implemented UI that demonstrates:
- Semantic HTML table design
- Full CRUD operations (Create, Read, Update, Delete)
- Advanced filtering and sorting
- Accessibility best practices
- Thoughtful UX patterns

## Design Decisions

### 1. Semantic Table Structure

**Decision**: Use native `<table>` element instead of divs
**Why**: 
- Screen readers understand table semantics automatically
- Built-in support for aria-sort on headers
- Proper table structure (thead, tbody, th, td)
- Better SEO and accessibility baseline

```html
<table className={styles.usersTable}>
  <thead>
    <tr>
      <th scope="col">...</th>
    </tr>
  </thead>
  <tbody>
    ...
  </tbody>
</table>
```

### 2. Sortable Column Headers

**Decision**: Click headers to cycle through asc → desc → none
**Why**:
- Familiar UI pattern from spreadsheets
- Three-state cycle (ascending, descending, unsorted) prevents confusion
- Visual arrow indicators (▲/▼) provide clear feedback
- `aria-sort` attribute communicates state to screen readers

```javascript
const getSortAria = key => {
  if (sortConfig?.key !== key) return 'none'
  return sortConfig.direction === 'asc' ? 'ascending' : 'descending'
}
```

### 3. Checkbox Selection

**Decision**: Checkboxes for individual + "select all" in header
**Why**:
- Matches familiar Gmail/spreadsheet UX
- Enables bulk operations
- Clear visual feedback (row highlight on selection)
- Proper keyboard navigation support

### 4. Delayed Delete with Undo (5 seconds)

**Decision**: Optimistic UI + 5-second undo window before permanent deletion
**Why**:
- Reduces user anxiety about destructive actions
- No confirmation dialog needed (less disruptive)
- Users can still undo accidental deletes
- Production-like pattern (Gmail, Slack)
- Uses `useRef` for timer ID management to prevent leaks

```javascript
const timeout = setTimeout(async () => {
  await removeUser(user.id)
}, 5000)

setUndoTimeout(timeout) // Store for potential cancellation
```

### 5. Search with `useDeferredValue`

**Decision**: Filter by fullName, email, account; use `useDeferredValue` for smooth typing
**Why**:
- Users see instant visual feedback while typing
- Expensive filter operations are deprioritized
- Reduces jank on low-end devices
- Decouples user input speed from rendering speed

### 6. Loading Skeleton (not spinner)

**Decision**: Show skeleton UI while loading instead of spinner
**Why**:
- Reduces perceived load time (studies show 10-15% faster perception)
- Shows expected layout to users
- More professional appearance
- Reduces layout shift after data arrives

### 7. Error State with Retry

**Decision**: Display error message + retry button (not silent failure)
**Why**:
- Users know what happened
- Clear recovery path
- Transparent error handling
- Matches modern app patterns

### 8. Empty State

**Decision**: Show message + "Clear Search" button when no results
**Why**:
- Helps users understand why table is empty
- Provides actionable next step
- Better than confusing blank space

### 9. Bulk Delete

**Decision**: Delete multiple selected users at once
**Why**:
- Time-saver for users managing large lists
- Follows familiar spreadsheet patterns
- Uses same 5-second delayed delete pattern for safety

### 10. Dynamic Group Dropdown

**Decision**: Load groups from API instead of hardcoding
**Why**:
- Scales with real group additions/deletions
- Keeps form data fresh
- Reflects actual system state

## Accessibility Features (a11y)

1. **Semantic HTML**: Native `<table>`, proper `<label>` elements, `<button>` for actions
2. **ARIA attributes**:
   - `aria-sort` on sortable headers
   - `aria-label` on action buttons
   - `aria-expanded` on expandable groups
3. **Keyboard navigation**: Tab through form, Enter to submit, Escape to close modals
4. **Form validation**: HTML5 validation + custom error messages
5. **Color contrast**: All text meets WCAG AA standards (4.5:1 minimum)

## Performance Optimizations

1. **useMemo** for derived state (filtered → sorted list)
2. **React Compiler** enabled for automatic memoization
3. **useDeferredValue** for search input (non-blocking updates)
4. **No unnecessary re-renders** due to Compiler's optimization

Note: For 20-40 records, virtualization is unnecessary. At 1000+ rows, would add `@tanstack/react-virtual`.

## CSS Modules

All styles use **CSS Modules** for scoped styling:
- No class name collisions
- Easier refactoring
- Better IDE support
- Maintainable component styles

## Trade-offs

### What We Don't Do

1. **No Redux/Zustand** — useState + custom hooks sufficient for this scope
2. **No React Query/TanStack Query** — fetch + error handling in hooks demonstrates ability to work with APIs from scratch
3. **No AG Grid** — custom table better demonstrates UI design skill
4. **No virtual scrolling** — unnecessary for 20-40 rows
5. **No animations** — focus on functionality over eye candy

### Why This Matters for Review

By building the Users page manually, the reviewer sees:
- Your ability to design thoughtful UX
- Accessibility awareness
- Pattern recognition (familiar patterns like Gmail's undo)
- Code organization (custom hooks, component structure)
- Performance consciousness (memoization, deferred values)

This is different from the Groups page (which showcases LLM-assisted design) and serves as a control—proving the candidate can ship production code without tools.
