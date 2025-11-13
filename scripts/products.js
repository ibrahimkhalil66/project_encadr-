import { products } from "../database/db.js";
import { cart, addToCart, calculateCartQuantity } from "../database/cart.js";
displayProducts();
displayCategory();
refreshCartQuantity();
function displayProducts(category = "All") {
  let productsHtml = "";
  products.forEach((product) => {
    if (category === "All" || category === product.category) {
      productsHtml += `
    <div class="product-card">
        <a href="product-page.html?id=${product.id}" class="btn" target="_blank">
         <img
          src="${product.image}"
          alt="${product.name}"
          class="product-image"
        />
        </a>
       
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>
            ${product.description}
          </p>
          <div class="quantity">
            <label for="Quantity">Quantity:</label>
            <select class="quantity-selector js-quantity-selector-${
              product.id
            }">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="product-price">${product.price.toLocaleString(
            "fr-DZ"
          )} DA</div>
           <div class="added-to-cart js-added-to-cart-${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-circle</title><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" /></svg>
            Added
          </div>
          <button class="add-to-cart js-add-to-cart" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
      </div>
  `;
    }
  });
  document.querySelector(".container").innerHTML = productsHtml;
  attachEventListeners();
}

function displayAdded(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("added-to-cart-visible");
  setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);
}
function attachEventListeners() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      calculateCartQuantity();
      displayAdded(productId);
    });
  });
}

function displayCategory() {
  const categories = document.querySelectorAll(".category");

  categories.forEach((btn) => {
    btn.addEventListener("click", () => {
      categories.forEach((b) => {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      const selectedCategory = btn.getAttribute("data-category");
      displayProducts(selectedCategory);
    });
  });
}

function refreshCartQuantity() {
  setInterval(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (JSON.stringify(savedCart) !== JSON.stringify(cart)) {
      cart.length = 0;
      savedCart.forEach((item) => cart.push(item));
      calculateCartQuantity();
    }
  }, 500);
}

