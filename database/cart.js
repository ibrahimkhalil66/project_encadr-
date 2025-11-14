export let cart = JSON.parse(localStorage.getItem("cart")) || [];
export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity = 1) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity ,
    });
  }
  saveToStorage();
}

export function calculateCartQuantity() {
  const cartQuantityElement = document.querySelector(".js-cart-quantity");
  if (!cartQuantityElement) return;

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  cartQuantityElement.innerHTML = cartQuantity || `0`;
}

export function removeFromCart(productId) {
  const id = String(productId);

  const indexToRemove = cart.findIndex((cartItem) => String(cartItem.productId) === id);
  if (indexToRemove !== -1) {
    cart.splice(indexToRemove, 1);
  }
  saveToStorage();
}



console.log(cart)