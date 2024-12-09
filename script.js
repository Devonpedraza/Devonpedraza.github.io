// ADD TO CART FUNCTION
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// UPDATE CART DISPLAY FUNCTION
function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    let totalItems = document.getElementById('total-items');
    let cartTotal = document.getElementById('cart-total');

    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        cart.forEach(item => {
            let row = `
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 50px; height: 50px; object-fit: cover;">
                        ${item.name}
                    </td>
                    <td>$${item.price}</td>
                    <td>
                        <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" style="width: 60px;" data-id="${item.id}">
                    </td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">Remove</button>
                    </td>
                </tr>
            `;
            cartItems.innerHTML += row;
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });

        if (totalItems) totalItems.textContent = itemCount;
        if (cartTotal) cartTotal.textContent = '$' + total.toFixed(2);
    }
}
// EVENT LISTENERS FOR ADDING TO CART (for index.html)
document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event from bubbling up
            let button = e.target.closest('.add-to-cart');
            let id = button.dataset.id;
            let name = button.dataset.name;
            let price = parseFloat(button.dataset.price);
            let image = button.dataset.image;
            addToCart(id, name, price, image);
        }
    });

    updateCartDisplay();
});

// Event listener for quantity changes and item removal (for cart.html)
if (document.getElementById('cart-items')) {
    document.getElementById('cart-items').addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            updateCartQuantity(e.target.dataset.id, parseInt(e.target.value));
        }
    });

    document.getElementById('cart-items').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            removeFromCart(e.target.dataset.id);
        }
    });
}

// Function to update cart quantity
function updateCartQuantity(id, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Function to remove item from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);


// Product page button event listener
document.addEventListener('click', function(e) {
    if (e.target.closest('.add-to-cart')) {
        e.preventDefault();
        let button = e.target.closest('.add-to-cart');
        let id = button.dataset.id;
        let name = button.dataset.name;
        let price = parseFloat(button.dataset.price);
        let image = button.dataset.image;
        addToCart(id, name, price, image);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.prod') && !e.target.closest('.add-to-cart')) {
            window.location.href = "product.html";
        }
    });
});


// Product Page Component
var mainImg = document.getElementById('main-img');
var smallImgs = document.getElementsByClassName('small-img');

// Add event listeners to the small images
smallImgs[0].onclick = function (){
    mainImg.src = smallImgs[0].src;
}
smallImgs[1].onclick = function (){
    mainImg.src = smallImgs[1].src;
}
smallImgs[2].onclick = function (){
    mainImg.src = smallImgs[2].src;
}
smallImgs[3].onclick = function (){
    mainImg.src = smallImgs[3].src;
}
