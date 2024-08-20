let cart = [];

function addToCart(productName, productLink, productPrice) {
    cart.push({ name: productName, link: productLink, price: productPrice });
    updateCart();
}

function removeFromCart(productName) {
    cart = cart.filter(product => product.name !== productName);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(product => {
        total += product.price;
        const listItem = document.createElement('li');
        listItem.innerHTML = `${product.name} - $${product.price.toFixed(2)} - <a href="${product.link}" target="_blank">Ver en Amazon</a> <button onclick="removeFromCart('${product.name}')">Quitar</button>`;
        cartList.appendChild(listItem);
    });
    totalElement.textContent = total.toFixed(2);
}