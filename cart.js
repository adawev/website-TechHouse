// Cart Management System for Tech House

// Initialize cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem('techHouseCart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('techHouseCart', JSON.stringify(cart));
    updateCartBadge();
}

// Update cart badge count
function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

// Add item to cart
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart();
    showNotification(`${product.name} savatchaga qo'shildi!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

// Update item quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            if (typeof renderCart === 'function') {
                renderCart();
            }
        }
    }
}

// Calculate cart total
function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Show notification
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Render cart items on cart page
function renderCart() {
    const cartTableBody = document.querySelector('.cart-table tbody');
    const cartSummary = document.querySelector('.cart-summary');

    if (!cartTableBody) return;

    if (cart.length === 0) {
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px;">
                    <i class="fas fa-shopping-cart" style="font-size: 48px; color: #CBD5E1; margin-bottom: 20px;"></i>
                    <p style="color: #64748B; font-size: 18px;">Savatchada hech narsa yo'q</p>
                    <a href="products.html" class="btn" style="margin-top: 20px; display: inline-block;">Xarid qilish</a>
                </td>
            </tr>
        `;
        if (cartSummary) {
            cartSummary.innerHTML = '<p class="subtotal">Jami: $0.00</p>';
        }
        return;
    }

    cartTableBody.innerHTML = cart.map(item => `
        <tr>
            <td data-label="Product">
                <div class="cart-item-image">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<i class="fas fa-box" style="font-size: 32px;"></i>'}
                </div>
            </td>
            <td data-label="Name">${item.name}</td>
            <td data-label="Quantity">
                <input type="number" class="qty-input" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)">
            </td>
            <td data-label="Price">$${(item.price * item.quantity).toFixed(2)}</td>
            <td data-label="Remove">
                <button class="remove-btn" onclick="removeFromCart('${item.id}')"><i class="fas fa-times"></i></button>
            </td>
        </tr>
    `).join('');

    if (cartSummary) {
        cartSummary.innerHTML = `<p class="subtotal">Jami: $${getCartTotal().toFixed(2)}</p>`;
    }
}

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();

    // If on cart page, render cart items
    if (document.querySelector('.cart-table')) {
        renderCart();
    }
});
