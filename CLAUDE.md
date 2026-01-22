# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Chrome extension for the Alfagift e-commerce website (alfagift.id) that adds sorting functionality to product search results. Users can sort products by name or price in ascending or descending order.

## Architecture

### Core Components

**content.js** - Main content script that runs on Alfagift product listing pages:
- `SELECTORS` - CSS selectors for targeting product items (`.list-product-items`), product names (`.product_name`), and prices (`.price`)
- `createSorterUI()` - Creates and injects the floating sort UI into the DOM (id: `alfa-sorter-ui`)
- `getPriceValue()` - Extracts numeric price values from product elements, returning `null` for invalid prices
- `getNameValue()` - Extracts and normalizes product names for sorting
- `runSort(type, order)` - Core sorting logic that reorders DOM elements based on price/name and asc/desc
- MutationObserver - Watches for dynamic content changes on the page to re-inject the UI when needed

**styles.css** - Styling for the floating sort panel with Alfamart brand colors (red: `#d7111b`)

**manifest.json** - Chrome extension v3 manifest:
- Content scripts injected on `https://alfagift.id/find/*` and `https://alfagift.id/c/*` URLs
- Uses `activeTab` permission

### Key Data Flow

1. Page loads → MutationObserver detects content → `createSorterUI()` injects UI
2. User clicks sort button → Event handler triggers `runSort()`
3. `runSort()` queries all `.list-product-items`, extracts values using helper functions
4. Array is sorted in-place based on criteria, then re-appended to parent container

## Installation (for End Users)

### Manual Installation

1. **Download the extension files** (all files in this repository):
   - `manifest.json`
   - `content.js`
   - `styles.css`

2. **Open Chrome** and navigate to `chrome://extensions/`

3. **Enable Developer mode**:
   - Toggle the switch in the top-right corner

4. **Load the extension**:
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - The extension "Alfagift Sorter" should appear in the list

5. **Verify installation**:
   - The extension should show "Alfagift Sorter" with version 1.0
   - No errors should be displayed

6. **Use the extension**:
   - Navigate to any Alfagift search page (e.g., `https://alfagift.id/find/perfume`)
   - A floating "Sort Options" panel will appear in the top-right corner
   - Click any button to sort products by Price or Name, Ascending or Descending

### Troubleshooting Installation

**Extension not loading**: Ensure all three files are in the same folder and you're selecting the folder (not individual files).

**UI not appearing on page**: The extension only activates on Alfagift search URLs that match:
   - `https://alfagift.id/find/*`
   - `https://alfagift.id/c/*`

**Permissions**: The extension only requests "activeTab" permission, which is granted automatically when you visit the target website.

## Development

### Loading for Development

1. Open Chrome/Chromium and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select this directory
4. Navigate to an Alfagift search URL (e.g., `https://alfagift.id/find/perfume`) to test
5. After making changes, click the refresh icon on the extension card in `chrome://extensions/`

### Testing

The extension has no automated tests. Manual testing requires:
- Loading in Chrome
- Navigating to Alfagift search results pages
- Verifying the sort UI appears (top-right corner)
- Testing each sort button and verifying correct ordering

### Common Issues

**UI not appearing**: Check that the page URL matches the `matches` patterns in manifest.json. The MutationObserver also falls back to a 1500ms timeout to create the UI.

**Sort not working**: The selectors in `SELECTORS` object may need updating if Alfagift changes their HTML structure. Check browser DevTools for current class names.

**Price parsing issues**: `getPriceValue()` handles invalid prices by returning `null` and pushing them to the bottom of the sorted list. If prices use different formats (e.g., with decimals), the regex may need adjustment.

### Building/Package

This is a simple extension with no build process. All files are directly loaded by Chrome.

To create a distributable ZIP:
```bash
zip -r alfagift-sorter.zip content.js styles.css manifest.json
```

## Notes

- The extension uses Manifest V3 (current Chrome standard)
- Only `activeTab` permission is used (no broad host permissions)
- Sort state is not persisted - refresh resets to default order
- The UI is injected as a fixed-position element on top-right of viewport
