function updateQuantityInCart(productId, change) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === Number(productId));
    // console.log(product);
    if (product) {
        const newQuantity = product.quantity + change;
        console.log(newQuantity);
        if (newQuantity > 0) {
            product.quantity = newQuantity; 
            console.log(newQuantity);
            sessionStorage.setItem("cart", JSON.stringify(cart)); 
        }
    }

    renderCart(); 
}

function renderCart() {
    const cartContainer = document.getElementById("cartContainer");
    const totalAmount = document.getElementById("totalAmount");
    cartContainer.innerHTML = "";

    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; font-weight: bold; color: red;">Cart Empty</p>';
        totalAmount.innerHTML = "";
        return;
    }

    let total = 0;
    cart.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product-item";
        productDiv.style.display = "flex";
        productDiv.style.alignItems = "center";
        productDiv.style.marginBottom = "15px";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width: 80px; height: 80px; border-radius: 5px;">
            <div style="margin-left: 10px;">
                <p style="font-weight: bold;">${product.title}</p>
                <p>${product.price}$</p>
            </div>
            <div style="display: flex; align-items: center;">
                <button onclick="updateQuantityInCart('${product.id}', -1)" style="margin: 0 10px;">-</button>
                <span>${product.quantity}</span>
                <button onclick="updateQuantityInCart('${product.id}', 1)" style="margin: 0 10px;">+</button>
            </div>
        `;

        total += product.price * product.quantity;
        cartContainer.appendChild(productDiv);
    });

    totalAmount.innerHTML = `<div style="text-align: center; font-size: x-large; font-style: italic; border-style: double; border-radius: 20px; margin: 20px; text-decoration-line: underline;">
        <p>Total Amount: <span id="total">${total.toFixed(2)}</span>$</p>
    </div>`;
}

window.onload = function () {
    renderCart();
};
