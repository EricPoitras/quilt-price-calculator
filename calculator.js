document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("/new-page")) {
    console.log("Calculator script is running");

    const container = document.createElement("div");
    container.className = "calculator";
    container.innerHTML = `
      <div class="label">Quilt Price Calculator</div>
      <div class="row">
        <div class="input-group">
          <label for="height">Height (in):</label>
          <input type="number" id="height" value="0" min="0" />
        </div>
        <div class="input-group">
          <label for="width">Width (in):</label>
          <input type="number" id="width" value="0" min="0" />
        </div>
        <div class="price-display" id="priceDisplay">$0.00 CAD</div>
      </div>
      <div class="row">
        <label><input type="checkbox" id="batting" /> Batting required</label>
      </div>
      <div class="note" id="note" style="display: none;">
        * A base rate of $50 minimum applies before batting charges.
      </div>
    `;

    // Inject the container into the page
    const target = document.getElementById("ecwid_body") || document.body;
    target.appendChild(container);

    // Pricing logic
    const CONSTANT = 0.02;
    const MINIMUM_PRICE = 50;

    function calculatePrice() {
      const height = parseFloat(document.getElementById("height").value) || 0;
      const width = parseFloat(document.getElementById("width").value) || 0;
      const battingChecked = document.getElementById("batting").checked;

      let basePrice = CONSTANT * height * width;
      basePrice = Math.ceil(basePrice);

      const battingCharge = battingChecked ? (width <= 80 ? 30 : 40) : 0;

      let totalPrice;
      let useBaseRate = false;

      if (basePrice < MINIMUM_PRICE) {
        totalPrice = MINIMUM_PRICE + battingCharge;
        useBaseRate = true;
      } else {
        totalPrice = basePrice + battingCharge;
      }

      const note = document.getElementById("note");
      const priceDisplay = document.getElementById("priceDisplay");

      if (useBaseRate) {
        note.style.display = "block";
        priceDisplay.textContent = formatCurrency(totalPrice) + "*";
      } else {
        note.style.display = "none";
        priceDisplay.textContent = formatCurrency(totalPrice);
      }
    }

    function formatCurrency(amount) {
      return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD"
      }).format(amount);
    }

    document.getElementById("height").addEventListener("input", calculatePrice);
    document.getElementById("width").addEventListener("input", calculatePrice);
    document.getElementById("batting").addEventListener("change", calculatePrice);
  }
});

