// 1. Define Selectors based on the HTML you provided
const SELECTORS = {
  // The actual column div that wraps the card.
  item: ".list-product-items",

  // The name inside the card
  name: ".product_name",

  // The price container
  price: ".price",
};

// 2. UI Creation
function createSorterUI() {
  if (document.getElementById("alfa-sorter-ui")) return;

  const container = document.createElement("div");
  container.id = "alfa-sorter-ui";
  container.className = "alfa-sorter-box";

  container.innerHTML = `
        <div class="alfa-sorter-header">Sort Options</div>
        <div class="alfa-sorter-body">
            <button class="alfa-sort-btn" data-sort="price" data-order="asc">Price: Low to High</button>
            <button class="alfa-sort-btn" data-sort="price" data-order="desc">Price: High to Low</button>
            <button class="alfa-sort-btn" data-sort="name" data-order="asc">Name: A - Z</button>
            <button class="alfa-sort-btn" data-sort="name" data-order="desc">Name: Z - A</button>
        </div>
    `;

  document.body.appendChild(container);

  const buttons = container.querySelectorAll(".alfa-sort-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      buttons.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      runSort(
        e.target.getAttribute("data-sort"),
        e.target.getAttribute("data-order")
      );
    });
  });
}

// 3. Helper: Extract Number from Price (Returns null if invalid)
function getPriceValue(element) {
  const priceEl = element.querySelector(SELECTORS.price);

  // If element doesn't exist, return null
  if (!priceEl) return null;

  const text = priceEl.innerText;
  // Remove everything except numbers
  const cleanText = text.replace(/[^0-9]/g, "");

  const number = parseInt(cleanText, 10);

  // If parsing failed (NaN) or text was empty, return null
  if (isNaN(number)) return null;

  return number;
}

// 4. Helper: Extract Name
function getNameValue(element) {
  const nameEl = element.querySelector(SELECTORS.name);
  return nameEl ? nameEl.innerText.trim().toLowerCase() : "";
}

// 5. Sorting Logic
function runSort(type, order) {
  const items = Array.from(document.querySelectorAll(SELECTORS.item));
  if (items.length === 0) return;

  const parent = items[0].parentNode;

  items.sort((a, b) => {
    if (type === "price") {
      const valA = getPriceValue(a);
      const valB = getPriceValue(b);

      // CHECK VALIDITY:
      const isValidA = valA !== null;
      const isValidB = valB !== null;

      // Case 1: Both are valid numbers -> Sort normally
      if (isValidA && isValidB) {
        return order === "asc" ? valA - valB : valB - valA;
      }

      // Case 2: One is invalid -> Push invalid to the bottom
      if (isValidA && !isValidB) return -1; // A is valid, B is invalid -> A comes first
      if (!isValidA && isValidB) return 1; // A is invalid, B is valid -> B comes first

      // Case 3: Both are invalid -> Keep original order
      return 0;
    } else if (type === "name") {
      const valA = getNameValue(a);
      const valB = getNameValue(b);
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
  });

  // Re-inject into DOM
  items.forEach((item) => parent.appendChild(item));
}

// 6. Observer for dynamic content
const observer = new MutationObserver((mutations) => {
  if (
    window.location.href.includes("/find/") ||
    window.location.href.includes("/c/") ||
    window.location.href.includes("/brand/")
  ) {
    createSorterUI();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
setTimeout(createSorterUI, 1500);
