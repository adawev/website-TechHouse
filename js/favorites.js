// Favorites functionality
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesBadge();
}

function addToFavorites(product) {
    const favorites = getFavorites();
    const exists = favorites.find(item => item.id === product.id);

    if (!exists) {
        favorites.push(product);
        saveFavorites(favorites);
        showNotification('Added to favorites!');
    } else {
        showNotification('Already in favorites!');
    }
}

function removeFromFavorites(productId) {
    let favorites = getFavorites();
    favorites = favorites.filter(item => item.id !== productId);
    saveFavorites(favorites);
    showNotification('Removed from favorites');
}

function isInFavorites(productId) {
    const favorites = getFavorites();
    return favorites.some(item => item.id === productId);
}

function toggleFavorite(product, button) {
    const favorites = getFavorites();
    const exists = favorites.find(item => item.id === product.id);

    if (exists) {
        removeFromFavorites(product.id);
        if (button) {
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-heart"></i>';
        }
    } else {
        addToFavorites(product);
        if (button) {
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-heart"></i>';
        }
    }
}

function updateFavoritesBadge() {
    const favorites = getFavorites();
    const badges = document.querySelectorAll('.favorites-badge');
    badges.forEach(badge => {
        badge.textContent = favorites.length;
    });
}

function showNotification(message) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('headerSearchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

function performSearch() {
    const searchInput = document.getElementById('headerSearchInput');
    if (searchInput) {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = 'products.html?search=' + encodeURIComponent(query);
        }
    }
}

// Update cart badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge-header');
    badges.forEach(badge => {
        badge.textContent = totalItems;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesBadge();
    updateCartBadge();
    initSearch();

    // Mark favorite buttons as active if product is in favorites
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const productId = btn.dataset.productId;
        if (productId && isInFavorites(productId)) {
            btn.classList.add('active');
        }
    });
});
