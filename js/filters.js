document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.products-grid')) return;
    const products = Array.from(document.querySelectorAll('.product-card'));
    const sortSelect = document.getElementById('sort');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const inStockCheckbox = document.getElementById('inStockOnly');
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const categoryParam = urlParams.get('cat');
    if (searchQuery) {
        const searchInput = document.getElementById('headerSearchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
        }
    }
    if (categoryParam) {
        const categoryCheckbox = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
    }
    const productCategories = {
        'kitchen': [0, 1, 4, 5, 8, 10, 12, 13, 16, 18, 20, 22, 23, 24, 25, 27, 28, 29, 36],
        'cleaning': [2, 6, 11, 15, 30, 40, 41],
        'climate': [3, 9, 14, 19, 31, 42, 47, 48],
        'smart-home': [17, 21, 43, 44, 45],
        'personal-care': [7, 32, 33, 34, 49],
        'laundry': []
    };
    if (sortSelect) {
        sortSelect.addEventListener('change', applyAllFilters);
    }
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyAllFilters);
    }
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    document.querySelectorAll('.price-preset').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.price-preset').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const min = this.dataset.min;
            const max = this.dataset.max;
            if (minPriceInput) minPriceInput.value = min || '';
            if (maxPriceInput) maxPriceInput.value = max || '';
            applyAllFilters();
        });
    });
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyAllFilters);
    });
    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.addEventListener('change', applyAllFilters);
    });
    if (inStockCheckbox) {
        inStockCheckbox.addEventListener('change', applyAllFilters);
    }
    function clearAllFilters() {
        document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[name="rating"]').forEach(radio => radio.checked = false);
        if (minPriceInput) minPriceInput.value = '';
        if (maxPriceInput) maxPriceInput.value = '';
        document.querySelectorAll('.price-preset').forEach(b => b.classList.remove('active'));
        if (inStockCheckbox) inStockCheckbox.checked = false;
        applyAllFilters();
    }
    function applyAllFilters() {
        let visibleProducts = [...products];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            visibleProducts = visibleProducts.filter(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                return productName.includes(query);
            });
        }
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
            .map(cb => cb.value);
        if (selectedCategories.length > 0) {
            visibleProducts = visibleProducts.filter(product => {
                const productIndex = products.indexOf(product);
                return selectedCategories.some(category =>
                    productCategories[category] && productCategories[category].includes(productIndex)
                );
            });
        }
        const minPrice = parseFloat(minPriceInput?.value) || 0;
        const maxPrice = parseFloat(maxPriceInput?.value) || Infinity;
        if (minPrice > 0 || maxPrice < Infinity) {
            visibleProducts = visibleProducts.filter(product => {
                const priceText = product.querySelector('.price').textContent;
                const price = parseFloat(priceText.replace('$', '').replace(',', ''));
                return price >= minPrice && price <= maxPrice;
            });
        }
        if (inStockCheckbox && inStockCheckbox.checked) {
            visibleProducts = visibleProducts.filter(product => {
                const stockBadge = product.querySelector('.stock-badge.out-of-stock');
                return !stockBadge;
            });
        }
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        if (selectedRating) {
            const minRating = parseInt(selectedRating.value);
            visibleProducts = visibleProducts.filter(product => {
                const stars = product.querySelectorAll('.product-rating .fas.fa-star').length;
                return stars >= minRating;
            });
        }
        products.forEach(product => product.style.display = 'none');
        if (sortSelect) {
            const sortValue = sortSelect.value;
            if (sortValue === 'price-low') {
                visibleProducts.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
                    return priceA - priceB;
                });
            } else if (sortValue === 'price-high') {
                visibleProducts.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
                    return priceB - priceA;
                });
            } else if (sortValue === 'rating') {
                visibleProducts.sort((a, b) => {
                    const ratingA = a.querySelectorAll('.product-rating .fas.fa-star').length;
                    const ratingB = b.querySelectorAll('.product-rating .fas.fa-star').length;
                    return ratingB - ratingA;
                });
            }
        }
        const productsGrid = document.querySelector('.products-grid');
        visibleProducts.forEach(product => {
            product.style.display = 'block';
            productsGrid.appendChild(product);
        });
        const resultsHeader = document.querySelector('.products-header h1');
        if (resultsHeader) {
            if (searchQuery) {
                resultsHeader.innerHTML = `<i class="fas fa-search"></i> Search: "${searchQuery}" (${visibleProducts.length} found)`;
            } else {
                const hasActiveFilters = selectedCategories.length > 0 ||
                    minPrice > 0 ||
                    maxPrice < Infinity ||
                    (inStockCheckbox && inStockCheckbox.checked) ||
                    selectedRating;
                if (hasActiveFilters) {
                    resultsHeader.innerHTML = `<i class="fas fa-filter"></i> Filtered Results (${visibleProducts.length} products)`;
                } else {
                    resultsHeader.innerHTML = `<i class="fas fa-box-open"></i> All Products`;
                }
            }
        }
        let noResultsMsg = document.querySelector('.no-results-message');
        if (visibleProducts.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search term</p>
                    <button class="btn btn-primary" onclick="document.getElementById('clearFilters').click()">Clear Filters</button>
                `;
                productsGrid.parentNode.insertBefore(noResultsMsg, productsGrid.nextSibling);
            }
            noResultsMsg.style.display = 'flex';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
    applyAllFilters();
});
