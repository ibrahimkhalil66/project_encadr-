// قراءة الطلبات من localStorage
const orders = JSON.parse(localStorage.getItem("orders")) || [];

const ordersContainer = document.getElementById("ordersContainer");
const titelEl = document.querySelector(".title");

titelEl.innerHTML = `Admin Dashboard - Orders  (${orders.length})`;
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
          `<li>${p.name} — ${p.quantity} × ${p.price.toLocaleString("fr-DZ")} DA = <strong>${p.total.toLocaleString(
            "fr-DZ"
          )} DA</strong></li>`
      )
      .join("");

    card.innerHTML = `
      <h3>Order ID: ${order.id}</h3>
      <div class="order-info"><strong>Name:</strong> ${order.name}</div>
      <div class="order-info"><strong>Phone:</strong> ${order.phone}</div>
      <div class="order-info"><strong>Address:</strong> ${order.address}</div>
      <div class="order-info"><strong>Date:</strong> ${order.date}</div>

      <h4>Products:</h4>
      <ul class="products-list">${productsHTML}</ul>

      <h3>Total: ${order.total.toLocaleString("fr-DZ")} DA</h3>

      <button class="download-btn"">
        Download PDF
      </button>
    `;

    ordersContainer.appendChild(card);


  });
}

renderOrders();


