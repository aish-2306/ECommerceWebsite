

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCart();
    setupColorChange();
});

function setupTaglineGlitchEffect() {
    const tagline = document.querySelector(".banner h1");
    if (!tagline) return;
    
    setInterval(() => {
        tagline.style.textShadow = `
            ${Math.random() * 4}px ${Math.random() * 4}px 0 rgba(255,0,0,0.7),
            ${-Math.random() * 4}px ${-Math.random() * 4}px 0 rgba(0,255,0,0.7),
            ${Math.random() * 4}px ${-Math.random() * 4}px 0 rgba(0,0,255,0.7)`;
        tagline.style.transform = `skew(${Math.random() * 2 - 1}deg, ${Math.random() * 2 - 1}deg)`;
    }, 500);
}


window.onload = setupTaglineGlitchEffect;    


function displayProducts() {
    const products = [
        { id: 1, name: "Samsung S23 Ultra", price: 500, image: "./Coffee_Shop/Samsung-Galaxy-S23-Ultra.jpg" },
        { id: 2, name: "iPhone 15 Pro", price: 200, image: "./Coffee_Shop/IPHONE15PRO.jpg" },
        { id: 3, name: "Google Pixel 8", price: 250, image: "./Coffee_Shop/google_pixel_8.jpg" },
        { id: 4, name: "Mac Pro 16", price: 800, image: "./Coffee_Shop/mac_pro_16.jpg" },
        { id: 5, name: "Dell G15", price: 700, image: "./Coffee_Shop/Dell_G15.webp" },
        { id: 6, name: "HP Spectra x360", price: 500, image: "./Coffee_Shop/HP_SPECTRA_X360.avif" },
        { id: 7, name: "Samsung OLED 55''", price: 500, image: "./Coffee_Shop/SAMUNG_OLED_55.jpg" },
        { id: 8, name: "Apple TV 4K", price: 500, image: "./Coffee_Shop/APPLE_TV_4K.jpg" },
        { id: 9, name: "LG 4K Smart TV", price: 500, image: "./Coffee_Shop/LG_4K.avif" },
        { id: 10, name: "Apple Watch 9 series", price: 50, image: "./Coffee_Shop/APPLE_WATCH_9.jpg" },
        { id: 11, name: "Sony WH-1000XM5", price: 100, image: "./Coffee_Shop/Sony-WH-1000XM5-9.jpg" },
        { id: 12, name: "Bose Noise-Canceling Headphones", price: 50, image: "./Coffee_Shop/bose-quietcomfort-bluetooth-headphones.webp" },
    ];

    const productContainer = document.getElementById("products");
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `<img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>`;
        productContainer.appendChild(div);
    });
}



function addToCart(id) {
    const products = [
        { id: 1, name: "Samsung S23 Ultra", price: 500, image: "./Coffee_Shop/Samsung-Galaxy-S23-Ultra.jpg" },
        { id: 2, name: "iPhone 15 Pro", price: 1000, image: "./Coffee_Shop/IPHONE15PRO.jpg" },
        { id: 3, name: "Google Pixel 8", price: 50, image: "./Coffee_Shop/google_pixel_8.jpg" },
        { id: 4, name: "Mac Pro 16", price: 50, image: "./Coffee_Shop/mac_pro_16.jpg" },
        { id: 5, name: "Dell G15", price: 50, image: "./Coffee_Shop/Dell_G15.webp" },
        { id: 6, name: "HP Spectra x360", price: 50, image: "./Coffee_Shop/HP_SPECTRA_X360.avif" },
        { id: 7, name: "Samsung OLED 55''", price: 50, image: "./Coffee_Shop/SAMUNG_OLED_55.jpg" },
        { id: 8, name: "Apple TV 4K", price: 50, image: "./Coffee_Shop/APPLE_TV_4K.jpg" },
        { id: 9, name: "LG 4K Smart TV", price: 50, image: "./Coffee_Shop/LG_4K.avif" },
        { id: 10, name: "Apple Watch 9 series", price: 50, image: "./Coffee_Shop/APPLE_WATCH_9.jpg" },
        { id: 11, name: "Sony WH-1000XM5", price: 50, image: "./Coffee_Shop/Sony-WH-1000XM5-9.jpg" },
        { id: 12, name: "Bose Noise-Canceling Headphones", price: 50, image: "./Coffee_Shop/bose-quietcomfort-bluetooth-headphones.webp" },
    ];
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `<li> <img src="${item.image}" width="50" height="50"> ${item.name} - $${item.price} x ${item.quantity} 
                                    <button onclick="decreaseQuantity(${item.id})">-</button>
                                    <button onclick="increaseQuantity(${item.id})">+</button>
                                    <button onclick="removeFromCart(${item.id})">Remove</button>
                                    <button onclick="confirmOrder(${item.id})">Buy Now</button></li>`;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function confirmOrder() {
    let existingPopup = document.querySelector(".order-popup");
    if (existingPopup) existingPopup.remove(); // Remove any existing popups

    const orderPopup = document.createElement("div");
    orderPopup.classList.add("order-popup");
    orderPopup.innerHTML = `
        <div class="order-content">
            <h2>Order Confirmed!</h2>
            <p>Thank you for your purchase.</p>
            <button onclick="closeOrderPopup()">Start New Order</button>
        </div>
    `;
    orderPopup.style.position = "fixed";
    orderPopup.style.top = "50%";
    orderPopup.style.left = "50%";
    orderPopup.style.transform = "translate(-50%, -50%)";
    orderPopup.style.background = "white";
    orderPopup.style.padding = "20px";
    orderPopup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    orderPopup.style.borderRadius = "8px";
    orderPopup.style.zIndex = "1000";

    document.body.appendChild(orderPopup);
}

function closeOrderPopup(id) {
    const popup = document.querySelector(".order-popup");
    if (popup) popup.remove(id);
    window.location.href = "index.html"; 
}

function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(); 
}


function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(id);
    }
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
}

function saveChanges() {
    localStorage.setItem("cart", JSON.stringify(cart));
    toggleCart();
}
