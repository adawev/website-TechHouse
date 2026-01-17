// Product Search and Sorting for Tech House

document.addEventListener('DOMContentLoaded', function() {
    // Only run on products page
    if (!document.querySelector('.products-grid')) return;

    const products = Array.from(document.querySelectorAll('.product-card'));
    const sortSelect = document.getElementById('sort');

    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    // Populate search input with query
    if (searchQuery) {
        const searchInput = document.getElementById('headerSearchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
        }
    }

    // Apply sorting when select changes
    if (sortSelect) {
        sortSelect.addEventListener('change', applySearchAndSort);
    }

    function applySearchAndSort() {
        let visibleProducts = [...products];

        // Apply search query filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            visibleProducts = visibleProducts.filter(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                return productName.includes(query);
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

        // Update results count if there's a search
        if (searchQuery) {
            const resultsHeader = document.querySelector('.products-header h1');
            if (resultsHeader) {
                resultsHeader.innerHTML = `<i class="fas fa-search"></i> Search: "${searchQuery}" (${visibleProducts.length} found)`;
            }
        }
    }

    // Apply on page load if there's a search query
    if (searchQuery) {
        applySearchAndSort();
    }
});
