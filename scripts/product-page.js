import { products } from "/database/db.js";



// قراءة الـ id من رابط الصفحة
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

// البحث عن المنتج المناسب
const product = products.find((p) => p.id === productId);
const container = document.getElementById("product-details");
document.title = `${product.name}`;
if (product) {
  container.innerHTML = `
        <div class="product-page">
          <img src="${product.image}" alt="${product.name}" class="big-img" />
          <div class="info">
            <h1>${product.name}</h1>
            <p class="price">السعر: $${product.price}</p>
            <p class="desc">${product.description}</p>
            
            <button class="add-btn">أضف إلى السلة</button>
          </div>
        </div>
      `;
} else {
  container.innerHTML = "<h2>المنتج غير موجود!</h2>";
}
