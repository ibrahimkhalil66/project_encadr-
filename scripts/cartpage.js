import { cart } from "../database/cart.js";
import { products } from "../database/db.js";
renderCart();

function renderCart() {
  let cartSummaryHtml = "";

  cart.forEach((cartItem) => {
    const matchingProduct = products.find(
      (product) => product.id === cartItem.id
    );

    if (!matchingProduct) return;

    cartSummaryHtml += `
        <div class="cart-item">
        <img
          src="${matchingProduct.image}"
          alt="${matchingProduct.name}"
          class="item-image"
        />

        <div class="item-details">
          <h3 class="item-title">${matchingProduct.name}</h3>
          <p class="item-price">${matchingProduct.price.toLocaleString(
            "fr-DZ"
          )} DA</p>
        </div>

        <div class="item-actions">
          <button class="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>delete</title>
              <path
                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
              />
            </svg>
          </button>
          <div class="quantity-control">
            <button class="minus">−</button>
            <span class="quantity">${cartItem.quantity}</span>
            <button class="plus">+</button>
          </div>
        </div>
      </div>
    `;
  });
  console.log("Cart:", cart);
  console.log("Products:", products);
  document.querySelector(".items-container").innerHTML = cartSummaryHtml;
}
