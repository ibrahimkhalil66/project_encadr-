import { orders, saveOrderToStorage } from "../database/orders.js";
function adminLogin() {
  const loginPage = document.querySelector(".login-page");
  const dashboard = document.querySelector(".dashboard");
  const usernameInput = document.getElementById("username");
  const passInput = document.getElementById("pass");
  const loginBtn = document.querySelector(".login-btn");

  let isAdminLogged = JSON.parse(localStorage.getItem("isAdminLogged")) || false; 

  
  if(isAdminLogged) {
    dashboard.style.display = "flexbox";
    loginPage.style.display = "none";
    return;
  }
  const username = "ibrahim";
  const password = "ibrahim123";

  dashboard.style.display = "none";

  loginBtn.addEventListener("click", () => {
    if (
      usernameInput.value === username &&
      passInput.value === password
    ) {
      dashboard.style.display = "block";
      loginPage.style.display = "none";
      isAdminLogged = true;
      localStorage.setItem("isAdminLogged", JSON.stringify(isAdminLogged));
      location.reload();
    } else {
      alert("Incorrect inputs");
      usernameInput.value = "";
      passInput.value = "";
    }
  });
}

adminLogin();

function logout() {
  const logouBtn = document.querySelector(".logout");

  logouBtn.addEventListener("click" , () => {
    localStorage.removeItem("isAdminLogged");
    location.reload();
  });
}

logout();


const ordersContainer = document.getElementById("ordersContainer");
const titelEl = document.querySelector(".title");
const stored = JSON.parse(localStorage.getItem("savedComment")) || [];

titelEl.innerHTML = `Orders  (${orders.length})`;
function renderOrders() {
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
      <button class="download-btn">
        Download PDF
      </button>
      <button class="delete-order" data-order-id="${order.id}">
        Delete
      </button>
      </div>
    `;
    ordersContainer.appendChild(card);
  });
  attachDeleteListeners();
}

renderOrders();
displayMessages();
function sectionsSeletcor() {
  const homeBtn = document.querySelector(".home-btn");
  const ordersBtn = document.querySelector(".orders-btn");
  const messagesBtn = document.querySelector(".messages-btn");
  const homeSec = document.querySelector(".home");
  const ordersSec = document.querySelector(".orders");
  const messagesSec = document.querySelector(".messages");

  homeBtn.addEventListener("click", () => {
    homeSec.style.display = "flex";
    ordersSec.style.display = "none";
    messagesSec.style.display = "none";
    homeBtn.classList.add("selected-section");
    ordersBtn.classList.remove("selected-section");
    messagesBtn.classList.remove("selected-section");
  });
  ordersBtn.addEventListener("click", () => {
    ordersSec.style.display = "block";
    homeSec.style.display = "none";
    messagesSec.style.display = "none";
    ordersBtn.classList.add("selected-section");
    homeBtn.classList.remove("selected-section");
    messagesBtn.classList.remove("selected-section");
  });
  messagesBtn.addEventListener("click", () => {
    messagesSec.style.display = "block";
    ordersSec.style.display = "none";
    homeSec.style.display = "none";
    messagesBtn.classList.add("selected-section");
    homeBtn.classList.remove("selected-section");
    ordersBtn.classList.remove("selected-section");
  });
}

sectionsSeletcor();

function attachDeleteListeners() {
  const delBtns = document.querySelectorAll(".delete-order");

  delBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if(confirm("Are you sure ?")){
        const id = btn.dataset.orderId;
        const index = orders.findIndex((o) => o.id == id);
        if (index !== -1) {
          orders.splice(index, 1);
        }
        saveOrderToStorage();
        renderOrders(); // re-renders and will re-attach listeners
        titelEl.innerHTML = `Orders (${orders.length})`;
        attachDeleteListeners();
      }
    });
  });
}

function displayMessages() {
  const CommentsDiv = document.querySelector(".messages-container");
  const deleteBtn = document.querySelector(".remove-btn");
  if (stored.length === 0) {
    CommentsDiv.innerHTML = "<p>No Messages</p>";
    deleteBtn.style.display = "none";
    return;
  }

  const html = stored
    .map(
      (comment) => `
    <div class="comment-item">
      <h3 class="name">${comment.name} [<span> ${comment.email} </span>]</h3>
      
      <p class="text">${comment.comment}</p>
      <h6 class="date">${comment.date}</h6>
    </div>
  `
    )
    .join("");

  CommentsDiv.innerHTML = html;
  deleteBtn.style.display = "block";
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure to remove All messages ?")) {
      localStorage.removeItem("savedComment");
      location.reload();
    }
  });
}



