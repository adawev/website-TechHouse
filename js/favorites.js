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

// Products data for search
const allProducts = [
    { id: 'prod1', name: 'Smart Coffee Maker Pro', price: 239.99, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop' },
    { id: 'prod2', name: 'Professional Blender 1200W', price: 149.99, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop' },
    { id: 'prod3', name: 'Robot Vacuum Cleaner X9', price: 399.99, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=300&fit=crop' },
    { id: 'prod4', name: 'Smart Thermostat WiFi', price: 199.99, image: 'https://images.unsplash.com/photo-1567925086983-a3a9f4ff6f9f?w=400&h=300&fit=crop' },
    { id: 'prod5', name: 'Digital Air Fryer 5.8QT', price: 179.99, image: 'https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=400&h=300&fit=crop' },
    { id: 'prod6', name: 'Electric Kettle 1.7L', price: 49.99, image: 'https://images.unsplash.com/photo-1594213114663-d94db9b17440?w=400&h=300&fit=crop' },
    { id: 'prod7', name: 'Cordless Stick Vacuum', price: 299.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: 'prod8', name: 'Hair Dryer Professional', price: 89.99, image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=300&fit=crop' },
    { id: 'prod9', name: 'Stand Mixer 5.5QT', price: 349.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
    { id: 'prod10', name: 'Smart WiFi Air Conditioner', price: 599.99, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop' },
    { id: 'prod11', name: 'Microwave Oven 1100W', price: 129.99, image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=300&fit=crop' },
    { id: 'prod12', name: 'Handheld Steam Cleaner', price: 79.99, image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop' },
    { id: 'prod13', name: 'Electric Toaster 4-Slice', price: 69.99, image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=300&fit=crop' },
    { id: 'prod14', name: 'Rice Cooker 10-Cup', price: 89.99, image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop' },
    { id: 'prod15', name: 'Portable Space Heater', price: 59.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop' },
    { id: 'prod16', name: 'Smart Robot Mop', price: 449.99, image: 'https://images.unsplash.com/photo-1589894404892-7310b92ea7a2?w=400&h=300&fit=crop' },
    { id: 'prod17', name: 'Food Processor 12-Cup', price: 179.99, image: 'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=400&h=300&fit=crop' },
    { id: 'prod18', name: 'Smart Speaker with Alexa', price: 99.99, image: 'https://images.unsplash.com/photo-1585515320310-2dcf6d098c8c?w=400&h=300&fit=crop' },
    { id: 'prod19', name: 'Espresso Machine Pro', price: 499.99, image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=300&fit=crop' },
    { id: 'prod20', name: 'Humidifier Ultrasonic', price: 69.99, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop' },
    { id: 'prod21', name: 'Immersion Blender Set', price: 59.99, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop' },
    { id: 'prod22', name: 'Smart Doorbell Camera', price: 179.99, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop' },
    { id: 'prod23', name: 'Electric Griddle XL', price: 89.99, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop' },
    { id: 'prod24', name: 'Electric Pressure Cooker', price: 119.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
    { id: 'prod25', name: 'Hand Mixer 300W', price: 49.99, image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&h=300&fit=crop' },
    { id: 'prod26', name: 'Induction Cooktop', price: 189.99, image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop' },
    { id: 'prod27', name: 'Wine Cooler 18 Bottle', price: 299.99, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop' },
    { id: 'prod28', name: 'Electric Grill Indoor', price: 129.99, image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop' },
    { id: 'prod29', name: 'Bread Maker Machine', price: 159.99, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop' },
    { id: 'prod30', name: 'Juicer Extractor 800W', price: 99.99, image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&h=300&fit=crop' },
    { id: 'prod31', name: 'Dehumidifier 50 Pint', price: 249.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: 'prod32', name: 'Tower Fan Oscillating', price: 89.99, image: 'https://images.unsplash.com/photo-1613152443581-a3f4b7c2c5f5?w=400&h=300&fit=crop' },
    { id: 'prod33', name: 'Electric Shaver Pro', price: 149.99, image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=300&fit=crop' },
    { id: 'prod34', name: 'Hair Straightener Ceramic', price: 79.99, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop' },
    { id: 'prod35', name: 'Electric Toothbrush', price: 129.99, image: 'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=400&h=300&fit=crop' },
    { id: 'prod36', name: 'Water Purifier System', price: 199.99, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop' },
    { id: 'prod37', name: 'Ice Maker Portable', price: 169.99, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop' },
    { id: 'prod38', name: 'Garbage Disposal 1HP', price: 189.99, image: 'https://images.unsplash.com/photo-1617850687395-620757feb1f3?w=400&h=300&fit=crop' },
    { id: 'prod39', name: 'Range Hood 30 inch', price: 349.99, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop' },
    { id: 'prod40', name: 'Chest Freezer 7 Cu Ft', price: 299.99, image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop' },
    { id: 'prod41', name: 'Steam Mop Floor Cleaner', price: 119.99, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop' },
    { id: 'prod42', name: 'Carpet Cleaner Pro', price: 249.99, image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop' },
    { id: 'prod43', name: 'Air Purifier HEPA', price: 179.99, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop' },
    { id: 'prod44', name: 'Smart Door Lock WiFi', price: 229.99, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop' },
    { id: 'prod45', name: 'Video Doorbell HD', price: 149.99, image: 'https://images.unsplash.com/photo-1558403194-611308249627?w=400&h=300&fit=crop' },
    { id: 'prod46', name: 'Smart Light Bulb 4Pack', price: 49.99, image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop' },
    { id: 'prod47', name: 'Electric Fireplace', price: 399.99, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
    { id: 'prod48', name: 'Portable Heater 1500W', price: 79.99, image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=400&h=300&fit=crop' },
    { id: 'prod49', name: 'Ceiling Fan with Light', price: 189.99, image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=300&fit=crop' },
    { id: 'prod50', name: 'Bathroom Scale Digital', price: 39.99, image: 'https://images.unsplash.com/photo-1611084063568-aec5f1e5e8ba?w=400&h=300&fit=crop' }
];

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('headerSearchInput');
    const searchBtn = document.getElementById('searchBtn');
    const headerSearch = document.querySelector('.header-search');

    if (!searchInput || !headerSearch) return;

    // Create dropdown element
    let dropdown = document.querySelector('.search-dropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-dropdown';
        headerSearch.appendChild(dropdown);
    }

    // Search on input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        if (query.length < 2) {
            dropdown.classList.remove('active');
            return;
        }

        const results = allProducts.filter(product =>
            product.name.toLowerCase().includes(query)
        ).slice(0, 8); // Limit to 8 results

        if (results.length > 0) {
            dropdown.innerHTML = results.map(product => `
                <div class="search-dropdown-item" onclick="goToProduct('${product.id}')">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="search-dropdown-item-info">
                        <h4>${product.name}</h4>
                        <span>$${product.price.toFixed(2)}</span>
                    </div>
                </div>
            `).join('');
            dropdown.classList.add('active');
        } else {
            dropdown.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>No products found for "${query}"</p>
                </div>
            `;
            dropdown.classList.add('active');
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!headerSearch.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Navigate on Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = 'products.html?search=' + encodeURIComponent(query);
            }
        }
    });

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = 'products.html?search=' + encodeURIComponent(query);
            }
        });
    }
}

function goToProduct(productId) {
    window.location.href = 'product.html?id=' + productId;
}

// Update cart badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('techHouseCart')) || [];
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
