# Alfagift Sorter

A Chrome extension that adds sorting functionality to Alfagift product search results. Sort products by name or price in ascending or descending order.

## Features

- **Sort by Price**: Low to High or High to Low
- **Sort by Name**: A to Z or Z to A
- **Floating UI**: Easy-to-access sort controls in the top-right corner
- **Alfamart Branding**: Uses official Alfamart/Alfagift red color scheme

## Installation

### Manual Installation

1. **Download the extension files**:
   - Clone this repository or download all files:
     - `manifest.json`
     - `content.js`
     - `styles.css`

2. **Open Chrome** and navigate to `chrome://extensions/`

3. **Enable Developer mode**:
   - Toggle the switch in the top-right corner

4. **Load the extension**:
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - You should see "Alfagift Sorter" version 1.0 in your extensions list

5. **Verify installation**:
   - Navigate to any Alfagift search page (e.g., `https://alfagift.id/find/perfume`)
   - A floating "Sort Options" panel will appear in the top-right corner

### Usage

1. Visit any Alfagift search results page:
   - `https://alfagift.id/find/{keyword}`
   - `https://alfagift.id/c/{category}`
   - `https://alfagift.id/brand/{brand}`

2. A red floating panel titled "Sort Options" will appear in the top-right corner

3. Click any of the 4 sorting buttons:
   - **Price: Low to High** - Sorts from cheapest to most expensive
   - **Price: High to Low** - Sorts from most expensive to cheapest
   - **Name: A - Z** - Sorts alphabetically A to Z
   - **Name: Z - A** - Sorts alphabetically Z to A

4. The active sort button will be highlighted in red

5. The product list will be reorganized instantly

## How It Works

The extension uses a content script that:
1. Watches for page changes using a MutationObserver
2. Injects a floating UI element into the page
3. Extracts product names and prices from the DOM
4. Reorders product elements based on the selected criteria

## Architecture

- **`manifest.json`** - Chrome extension manifest (v3) defining permissions and content script injection
- **`content.js`** - Main logic for UI creation, DOM manipulation, and sorting algorithms
- **`styles.css`** - CSS for the floating UI panel with Alfamart brand colors

## Compatibility

- **Chrome/Chromium**: Tested on modern Chrome versions (v90+)
- **Alfagift**: Compatible with current Alfagift website structure
- **Permissions**: Only requires "activeTab" permission

## Troubleshooting

### Extension not appearing
- Ensure all three files are in the same folder when loading
- Check that Chrome Developer mode is enabled
- Look for any error messages in the extension card on `chrome://extensions/`

### Sort panel not showing on page
- Verify you're on a supported URL pattern: `find/`, `c/`, or `brand/` paths
- Try refreshing the page
- Check the browser console (F12) for any JavaScript errors

### Sort not working correctly
- Alfagift may have updated their HTML structure
- Open DevTools (F12) and inspect the product elements
- Check if the CSS selectors in `content.js` (`.list-product-items`, `.product_name`, `.price`) still match the page structure

## License

This is a personal project for educational purposes.

## Contributing

Feel free to submit issues or pull requests if you find bugs or want to add features.

## Support

If you encounter issues:
1. Check the browser console for errors (F12)
2. Verify the extension is enabled in `chrome://extensions/`
3. Ensure you're on a supported Alfagift URL

---

**Note**: This extension is not affiliated with Alfagift or Alfamart. It is a third-party tool created to enhance the user experience on the Alfagift website.
