import { orders, saveOrderToStorage } from "../database/orders.js";


const ordersContainer = document.getElementById("ordersContainer");
const titelEl = document.querySelector(".title");

titelEl.innerHTML = `Orders  (${orders.length})`;
function renderOrders() {
  if (orders.length === 0) {
    ordersContainer.innerHTML = "<p>No orders available.</p>";
    return;
  }

  ordersContainer.innerHTML = "";

  orders.forEach((order) => {
    const card = document.createElement("div");
    card.classList.add("order-card");

    const productsHTML = order.products
      .map(
        (p) =>
          `<li>${p.name} — ${p.quantity} × ${p.price.toLocaleString(
            "fr-DZ"
          )} DA = <strong>${p.total.toLocaleString("fr-DZ")} DA</strong></li>`
      )
      .join("");

    card.innerHTML = `
      <h3>Order ID: ${order.id}</h3>
      <div class="information">
      <p class="order-info"><strong>Name:</strong> ${order.name}</p>
      <p class="order-info"><strong>Phone:</strong> ${order.phone}</p>
      <p class="order-info"><strong>Address:</strong> ${order.address}</p>
      <p class="order-info"><strong>Date:</strong> ${order.date}</p>
      </div>
      <h4>Products:</h4>
      <ul class="products-list">${productsHTML}</ul>

      <h3>Total: ${order.total.toLocaleString("fr-DZ")} DA</h3>
      <div class="btns">
      <button class="download-btn"">
        Download PDF
      </button>
      <button class="delete-order" data-order-id="${order.id}">
        Delete
      </button>
      </div>
    `;

    ordersContainer.appendChild(card);
  });
}

renderOrders();
deleteOrder();
function sectionsSeletcor() {
  const homeBtn = document.querySelector(".home-btn");
  const ordersBtn = document.querySelector(".orders-btn");
  const homeSec = document.querySelector(".home");
  const ordersSec = document.querySelector(".orders");

  homeBtn.addEventListener("click", () => {
    homeSec.style.display = "flex";
    ordersSec.style.display = "none";
  });
  ordersBtn.addEventListener("click", () => {
    homeSec.style.display = "none";
    ordersSec.style.display = "flex";
  });
}

sectionsSeletcor();

function deleteOrder() {
  const delBtn = document.querySelectorAll(".delete-order");

  delBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.orderId;

      const index = orders.findIndex((o) => o.id == id);
      if (index !== -1) {
        orders.splice(index, 1);
      }
      saveOrderToStorage();
      renderOrders();
      titelEl.innerHTML = `Orders (${orders.length})`;
      deleteOrder();
    });
  });
}
