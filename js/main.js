document.addEventListener('DOMContentLoaded', () => {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('productos', JSON.stringify(data));
            mostrarProductos(data);
        });

    function mostrarProductos(productos) {
        const productsSection = document.querySelector('.products');
        productsSection.innerHTML = '';
        productos.forEach(producto => {
            const productHTML = `
                <img src="../galeria/one.jpg" class="img-fluid" alt="" srcset="">
                <section class="texto">
                    <h2>${producto.name}</h2>
                </section>
                <button onclick="addToCart('${producto.name}', '${producto.link}', ${producto.price})">Agregar al carrito</button>
                <section class="">
                    <li><a href="${producto.link}">link</a></li>
                </section>
            `;
            productsSection.innerHTML += productHTML;
        });
    }

    updateCart();
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productLink, productPrice) {
    cart.push({ name: productName, link: productLink, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(productName) {
    cart = cart.filter(product => product.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
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
let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    const offset = -currentSlide * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

