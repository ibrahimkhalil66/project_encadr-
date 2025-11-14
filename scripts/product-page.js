import { products } from "../database/db.js";
import {
  cart,
  addToCart,
  calculateCartQuantity,
  saveToStorage,
} from "../database/cart.js";

renderProduct();
refreshCartQuantity();

function renderProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"), 10);
  const product = products.find((p) => p.id === productId);
  const container = document.getElementById("product-details");

  if (!product) {
    document.title = `Error Product`;
    container.innerHTML = "<h2>المنتج غير موجود!</h2>";
    return;
  }
  document.title = `${product.name}`;

  container.innerHTML = `
        <div class="product-page">
          <img src="${product.image}" alt="${product.name}" class="big-img" />
          <div class="info">
            <h1>${product.name}</h1>
            <p class="price">Price : ${product.price.toLocaleString(
              "fr-DZ"
            )} DA <br><small><del>${(product.price + 3000).toLocaleString(
    "fr-DZ"
  )} DA</small></del></p>
            <p class="desc">${product.description}</p>
            <div class="quantity-control">
            <button class="minus">-</button>
            <span class="js-quantity-selector-${product.id}">1</span>
            <button class="plus">+</button>
            </div>
            <button class="add-btn">Add to cart</button>
          </div>
        </div>
      `;

  const quantityEl = container.querySelector(
    `.js-quantity-selector-${productId}`
  );
  renderReviews(product);
  const minusBtn = container.querySelector(".minus");
  const plusBtn = container.querySelector(".plus");
  const addBtn = container.querySelector(".add-btn");
  const addedMessage = document.querySelector(".Product-added");

  let quantity = 1;
  function updateQuantity() {
    quantityEl.textContent = String(quantity);
  }

  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  plusBtn.addEventListener("click", () => {
    if (quantity < 10) {
      quantity++;
      updateQuantity();
    } else {
      alert("This is the max of qunatity");
    }
  });

  addBtn.addEventListener("click", () => {
    addToCart(productId, quantity);
    calculateCartQuantity();
    saveToStorage();
    console.log(cart);
    if (addedMessage) {
      addedMessage.style.display = "flex";
      addedMessage.innerHTML = `${product.name}  is added to your cart`;
      setTimeout(() => {
        addedMessage.style.display = "none";
      }, 2000);
    }
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

function renderReviews(product) {
  if (!product.reviews) product.reviews = [];
  reviewsList.innerHTML = "";

  product.reviews.forEach((review) => {
    reviewsList.innerHTML += `
      <div class="review-item">
        <div class="name">${review.name}</div>
        <div class="date">${review.date}</div>
        <div class="text">${review.text}</div>
      </div>
    `;
  });
}
