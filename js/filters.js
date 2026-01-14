// Product Filters and Sorting for Tech House

document.addEventListener('DOMContentLoaded', function() {
    // Only run on products page
    if (!document.querySelector('.products-grid')) return;

    const products = Array.from(document.querySelectorAll('.product-card'));
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const sortSelect = document.getElementById('sort');
    const resetButton = document.querySelector('.btn-secondary');

    // Reset filters
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            filterCheckboxes.forEach(checkbox => checkbox.checked = false);
            if (sortSelect) sortSelect.value = 'featured';
            applyFiltersAndSort();
        });
    }

    // Apply filters when checkboxes change
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFiltersAndSort);
    });

    // Apply sorting when select changes
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFiltersAndSort);
    }

    function applyFiltersAndSort() {
        let visibleProducts = [...products];

        // Get selected filters
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
        const selectedPriceRanges = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);
        const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
        const selectedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(cb => cb.value);

        // Apply category filter (basic keyword matching)
        if (selectedCategories.length > 0) {
            visibleProducts = visibleProducts.filter(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                return selectedCategories.some(category => {
                    if (category === 'kitchen') return productName.includes('coffee') || productName.includes('blender') || productName.includes('kettle') || productName.includes('mixer') || productName.includes('toaster') || productName.includes('rice') || productName.includes('microwave') || productName.includes('fryer');
                    if (category === 'cleaning') return productName.includes('vacuum') || productName.includes('cleaner');
                    if (category === 'heating') return productName.includes('thermostat') || productName.includes('ac') || productName.includes('conditioner');
                    if (category === 'personal') return productName.includes('dryer') || productName.includes('hair');
                    if (category === 'smart') return productName.includes('smart') || productName.includes('robot') || productName.includes('wifi');
                    return false;
                });
            });
        }

        // Apply price filter
        if (selectedPriceRanges.length > 0) {
            visibleProducts = visibleProducts.filter(product => {
                const priceText = product.querySelector('.price').textContent;
                const price = parseFloat(priceText.replace('$', ''));

                return selectedPriceRanges.some(range => {
                    if (range === '0-100') return price < 100;
                    if (range === '100-200') return price >= 100 && price < 200;
                    if (range === '200-300') return price >= 200 && price < 300;
                    if (range === '300-500') return price >= 300 && price < 500;
                    if (range === '500+') return price >= 500;
                    return false;
                });
            });
        }

        // Apply rating filter
        if (selectedRatings.length > 0) {
            visibleProducts = visibleProducts.filter(product => {
                const stars = product.querySelectorAll('.product-rating .fas.fa-star').length;
                const minRating = Math.min(...selectedRatings.map(r => parseInt(r)));
                return stars >= minRating;
            });
        }

        // Hide all products first
        products.forEach(product => product.style.display = 'none');

        // Apply sorting
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

        // Show filtered and sorted products
        const productsGrid = document.querySelector('.products-grid');
        visibleProducts.forEach(product => {
            product.style.display = 'block';
            productsGrid.appendChild(product);
        });
    }
});
