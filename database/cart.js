export let cart =  JSON.parse(localStorage.getItem("cart")) || [];
export function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);

    if(matchingItem ) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity
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
    const newCart = [];
    const id = String(productId);
    
    cart.forEach(cartItem => {
        if(cartItem.productId !== id) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}