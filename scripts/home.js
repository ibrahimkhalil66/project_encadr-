import { products } from "../database/db.js";

let currentIndex = 0;
let autoSlide;

const heroName = document.getElementById("hero-name");
const heroDesc = document.getElementById("hero-desc");
const heroImg = document.getElementById("product-img");

function updateHero() {
  heroName.textContent = products[currentIndex].name;
  heroDesc.textContent = products[currentIndex].description;

  heroImg.style.opacity = "0";

  setTimeout(() => {
    heroImg.src = products[currentIndex].image;
    heroImg.style.opacity = "1";
  }, 200);
}

function nextProduct() {
  currentIndex = (currentIndex + 1) % products.length;
  updateHero();
  resetAutoSlide();
}

function prevProduct() {
  currentIndex = (currentIndex - 1 + products.length) % products.length;
  updateHero();
  resetAutoSlide();
}

window.nextProduct = nextProduct;
window.prevProduct = prevProduct;

function startAutoSlide() {
  autoSlide = setInterval(nextProduct, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}


updateHero();
startAutoSlide();
categoryLink();
