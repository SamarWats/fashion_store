// product-details.js - Fetch product details dynamically
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    if (productId) {
        fetchProductDetails(productId);
    }
});

function fetchProductDetails(productId) {
    fetch(`/api/product/${productId}/`)  // Corrected API endpoint
        .then(response => response.json())
        .then(product => {
            document.getElementById("product-image").src = product.image;
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-price").textContent = `₹${product.price}`;
            document.getElementById("product-colors").textContent = product.colors.join(", ");
            document.getElementById("product-sizes").textContent = product.sizes.join(", ");

            // Fetch related products based on category
            fetchRelatedProducts(product.category, productId);
        })
        .catch(error => console.error("Error fetching product details:", error));
}

function fetchRelatedProducts(category, currentProductId) {
    fetch(`/api/products/${category}/`) // Fetch related products by category
        .then(response => response.json())
        .then(data => {
            const relatedContainer = document.getElementById("related-products");
            relatedContainer.innerHTML = "";

            data.products
                .filter(product => product.id !== currentProductId) // Exclude the current product
                .forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" />
                        <h3>${product.name}</h3>
                        <button onclick="viewProductDetails('${product.id}')">View Details</button>
                    `;
                    relatedContainer.appendChild(productCard);
                });
        })
        .catch(error => console.error("Error fetching related products:", error));
}

function viewProductDetails(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}
