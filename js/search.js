// Search Functionality
const products = [
    { id: 1, name: 'Smart Coffee Maker Pro', price: 299.99, category: 'kitchen', url: 'product.html' },
    { id: 2, name: 'Professional Blender 2000W', price: 149.99, category: 'kitchen', url: 'product.html' },
    { id: 3, name: 'Robot Vacuum Cleaner X9', price: 399.99, category: 'cleaning', url: 'product.html' },
    { id: 4, name: 'Smart Thermostat WiFi', price: 249.99, category: 'smart', url: 'product.html' },
    { id: 5, name: 'Digital Air Fryer 5.8QT', price: 179.99, category: 'kitchen', url: 'product.html' },
    { id: 6, name: 'Ionic Hair Dryer Pro', price: 89.99, category: 'personal', url: 'product.html' },
    { id: 7, name: 'Smart Microwave 1200W', price: 199.99, category: 'kitchen', url: 'product.html' },
    { id: 8, name: 'Portable AC 10,000 BTU', price: 349.99, category: 'heating', url: 'product.html' },
    { id: 9, name: 'Electric Kettle Stainless', price: 59.99, category: 'kitchen', url: 'product.html' },
    { id: 10, name: 'Stand Mixer 660W', price: 279.99, category: 'kitchen', url: 'product.html' },
    { id: 11, name: '4-Slice Toaster Digital', price: 79.99, category: 'kitchen', url: 'product.html' },
    { id: 12, name: 'Multi-Function Rice Cooker', price: 129.99, category: 'kitchen', url: 'product.html' },
    { id: 13, name: 'Smart Convection Oven', price: 599.99, category: 'kitchen', url: 'product.html' },
    { id: 14, name: 'Built-in Dishwasher', price: 789.99, category: 'kitchen', url: 'product.html' },
    { id: 15, name: 'French Door Refrigerator', price: 1299.99, category: 'kitchen', url: 'product.html' },
    { id: 16, name: 'Front Load Washing Machine', price: 899.99, category: 'cleaning', url: 'product.html' },
    { id: 17, name: 'Electric Dryer 7.4 Cu Ft', price: 699.99, category: 'cleaning', url: 'product.html' },
    { id: 18, name: 'Smart Speaker with Alexa', price: 99.99, category: 'smart', url: 'product.html' },
    { id: 19, name: 'Programmable Slow Cooker', price: 79.99, category: 'kitchen', url: 'product.html' },
    { id: 20, name: '14-Cup Food Processor', price: 199.99, category: 'kitchen', url: 'product.html' },
    { id: 21, name: 'Espresso Machine Pro', price: 449.99, category: 'kitchen', url: 'product.html' },
    { id: 22, name: 'Cordless Vacuum V12', price: 329.99, category: 'cleaning', url: 'product.html' },
    { id: 23, name: 'Steam Iron 2400W', price: 69.99, category: 'cleaning', url: 'product.html' },
    { id: 24, name: 'Electric Pressure Cooker', price: 119.99, category: 'kitchen', url: 'product.html' },
    { id: 25, name: 'Hand Mixer 300W', price: 49.99, category: 'kitchen', url: 'product.html' },
    { id: 26, name: 'Induction Cooktop', price: 189.99, category: 'kitchen', url: 'product.html' },
    { id: 27, name: 'Wine Cooler 18 Bottle', price: 299.99, category: 'kitchen', url: 'product.html' },
    { id: 28, name: 'Electric Grill Indoor', price: 129.99, category: 'kitchen', url: 'product.html' },
    { id: 29, name: 'Bread Maker Machine', price: 159.99, category: 'kitchen', url: 'product.html' },
    { id: 30, name: 'Juicer Extractor 800W', price: 99.99, category: 'kitchen', url: 'product.html' },
    { id: 31, name: 'Dehumidifier 50 Pint', price: 249.99, category: 'heating', url: 'product.html' },
    { id: 32, name: 'Tower Fan Oscillating', price: 89.99, category: 'heating', url: 'product.html' },
    { id: 33, name: 'Electric Shaver Pro', price: 149.99, category: 'personal', url: 'product.html' },
    { id: 34, name: 'Hair Straightener Ceramic', price: 79.99, category: 'personal', url: 'product.html' },
    { id: 35, name: 'Electric Toothbrush', price: 129.99, category: 'personal', url: 'product.html' },
    { id: 36, name: 'Water Purifier System', price: 199.99, category: 'kitchen', url: 'product.html' },
    { id: 37, name: 'Ice Maker Portable', price: 169.99, category: 'kitchen', url: 'product.html' },
    { id: 38, name: 'Garbage Disposal 1HP', price: 189.99, category: 'kitchen', url: 'product.html' },
    { id: 39, name: 'Range Hood 30 inch', price: 349.99, category: 'kitchen', url: 'product.html' },
    { id: 40, name: 'Chest Freezer 7 Cu Ft', price: 299.99, category: 'kitchen', url: 'product.html' },
    { id: 41, name: 'Steam Mop Floor Cleaner', price: 119.99, category: 'cleaning', url: 'product.html' },
    { id: 42, name: 'Carpet Cleaner Pro', price: 249.99, category: 'cleaning', url: 'product.html' },
    { id: 43, name: 'Air Purifier HEPA', price: 179.99, category: 'heating', url: 'product.html' },
    { id: 44, name: 'Smart Door Lock WiFi', price: 229.99, category: 'smart', url: 'product.html' },
    { id: 45, name: 'Video Doorbell HD', price: 149.99, category: 'smart', url: 'product.html' },
    { id: 46, name: 'Smart Light Bulb 4Pack', price: 49.99, category: 'smart', url: 'product.html' },
    { id: 47, name: 'Electric Fireplace', price: 399.99, category: 'heating', url: 'product.html' },
    { id: 48, name: 'Portable Heater 1500W', price: 79.99, category: 'heating', url: 'product.html' },
    { id: 49, name: 'Ceiling Fan with Light', price: 189.99, category: 'heating', url: 'product.html' },
    { id: 50, name: 'Bathroom Scale Digital', price: 39.99, category: 'personal', url: 'product.html' }
];

// Create search modal
function createSearchModal() {
    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-header">
                <div class="search-input-wrapper">
                    <i class="fas fa-search"></i>
                    <input type="text" id="search-input" placeholder="Search products..." autocomplete="off">
                    <button id="clear-search" class="clear-search" style="display: none;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <button id="close-search" class="close-search">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-results" id="search-results">
                <div class="search-placeholder">
                    <i class="fas fa-search"></i>
                    <p>Start typing to search products...</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add event listeners
    const searchInput = document.getElementById('search-input');
    const closeBtn = document.getElementById('close-search');
    const clearBtn = document.getElementById('clear-search');
    const resultsContainer = document.getElementById('search-results');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearBtn.style.display = query ? 'flex' : 'none';

        if (query.length >= 2) {
            const results = searchProducts(query);
            displayResults(results, query);
        } else if (query.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-placeholder">
                    <i class="fas fa-search"></i>
                    <p>Start typing to search products...</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = `
                <div class="search-placeholder">
                    <i class="fas fa-keyboard"></i>
                    <p>Type at least 2 characters...</p>
                </div>
            `;
        }
    });

    closeBtn.addEventListener('click', closeSearchModal);
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        resultsContainer.innerHTML = `
            <div class="search-placeholder">
                <i class="fas fa-search"></i>
                <p>Start typing to search products...</p>
            </div>
        `;
        searchInput.focus();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeSearchModal();
        }
    });

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchModal();
        }
    });
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

function displayResults(results, query) {
    const container = document.getElementById('search-results');

    if (results.length === 0) {
        container.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>No products found for "<strong>${query}</strong>"</p>
                <span>Try different keywords or browse our categories</span>
            </div>
        `;
        return;
    }

    const html = results.map(product => `
        <a href="${product.url}" class="search-result-item">
            <div class="result-icon">
                <i class="fas fa-box"></i>
            </div>
            <div class="result-info">
                <h4>${highlightMatch(product.name, query)}</h4>
                <span class="result-category">${product.category}</span>
            </div>
            <div class="result-price">$${product.price.toFixed(2)}</div>
        </a>
    `).join('');

    container.innerHTML = `
        <div class="search-results-count">${results.length} product${results.length !== 1 ? 's' : ''} found</div>
        <div class="search-results-list">${html}</div>
    `;
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function openSearchModal() {
    const modal = document.getElementById('search-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.getElementById('search-input').focus();
    }, 100);
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = `
        <div class="search-placeholder">
            <i class="fas fa-search"></i>
            <p>Start typing to search products...</p>
        </div>
    `;
}

// Initialize search
document.addEventListener('DOMContentLoaded', () => {
    createSearchModal();

    // Attach click event to search icon
    const searchIcon = document.querySelector('.nav-icon .fa-search');
    if (searchIcon) {
        searchIcon.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            openSearchModal();
        });
    }
});
