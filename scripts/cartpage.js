import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  saveToStorage,
} from "../database/cart.js";
import { products } from "../database/db.js";

renderCart();
calculateCartQuantity();

function renderCart() {
  let cartSummaryHtml = "";

  cart.forEach((cartItem) => {
    const matchingProduct = products.find(
      (product) => String(product.id) === String(cartItem.productId)
    );

    if (!matchingProduct) return;

    cartSummaryHtml += `
      
      <div class="cart-item js-cart-item-container-${matchingProduct.id}">
        <img src="${matchingProduct.image}" alt="${matchingProduct.name}" class="item-image" />
        <div class="item-details">
          <h3 class="item-title">${matchingProduct.name}</h3>
          <p class="item-price">${matchingProduct.price.toLocaleString("fr-DZ")} DA</p>
        </div>
        <div class="item-actions">
          <button class="delete-btn js-delete-btn" data-product-id="${matchingProduct.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>delete</title>
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 
              0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
            </svg>
          </button>
          <div class="quantity-control">
            <button class="minus" data-product-id="${matchingProduct.id}">-</button>
            <span class="quantity">${cartItem.quantity}</span>
            <button class="plus" data-product-id="${matchingProduct.id}">+</button>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".items-container").innerHTML = cartSummaryHtml;
  plusMinusButtons();
  deleteButton();
}

function deleteButton() {
  document.querySelectorAll(".js-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = String(btn.dataset.productId);
      removeFromCart(id);
      calculateCartQuantity();
      renderCart();
    });
  });
}

function plusMinusButtons() {
  const minusBtn = document.querySelectorAll(".minus");
  const plusBtn = document.querySelectorAll(".plus");

  minusBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = String(btn.dataset.productId);
      const cartItem = cart.find((item) => String(item.productId) === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        saveToStorage();
        renderCart();
        calculateCartQuantity();
      }
    });
  });

  plusBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = String(btn.dataset.productId);
      const cartItem = cart.find((item) => String(item.productId) === productId);
      if (cartItem) {
        cartItem.quantity++;
        saveToStorage();
        renderCart();
        calculateCartQuantity();
      }
    });
  });
}
