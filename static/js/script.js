document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id"); // Get product ID from URL

    if (productId) {
        fetchProductDetails(productId);
    }
});

function fetchCategories() {
    fetch("/api/categories")
        .then(response => response.json())
        .then(categories => {
            const categoryContainer = document.getElementById("categories");
            categoryContainer.innerHTML = "";
            categories.forEach(category => {
                const categoryItem = document.createElement("div");
                categoryItem.classList.add("category-item");
                categoryItem.textContent = category.name;
                categoryItem.onclick = () => fetchTrendyDesigns(category.id); // Fetch by category
                categoryContainer.appendChild(categoryItem);
            });
        })
        .catch(error => console.error("Error fetching categories:", error));
}


function fetchProductDetails(productId) {
    fetch(`/api/product/${productId}/`) // API to get product details
        .then(response => response.json())
        .then(product => {
            document.querySelector(".image-container img").src = product.image;
            document.querySelector(".image-container img").alt = product.name;
            document.querySelector(".tags .tag").textContent = product.category;
            document.querySelector(".tags .yellow").textContent = product.stock_status;
            document.querySelector(".value:nth-child(2)").textContent = product.fabric;
            document.querySelector(".value:nth-child(4)").textContent = product.sizes.join(", ");
            document.querySelector(".value:nth-child(6)").textContent = product.colors.join(", ");
            document.querySelector(".value:nth-child(8)").textContent = `₹${product.price}`;
            document.querySelector(".discount").textContent = `-${product.discount}% M.R.P.: ₹${product.mrp}`;

            // Populate color options dynamically
            const colorContainer = document.querySelector(".colors");
            colorContainer.innerHTML = "";
            product.color_images.forEach(colorImg => {
                const imgElement = document.createElement("img");
                imgElement.src = colorImg;
                imgElement.alt = "Color option";
                colorContainer.appendChild(imgElement);
            });

            // Fetch related products
            fetchRelatedProducts(product.category, productId);
        })
        .catch(error => console.error("Error fetching product details:", error));
}

function fetchRelatedProducts(category, currentProductId) {
    fetch(`/api/products/${category}/`) // API to get related products
        .then(response => response.json())
        .then(data => {
            const productContainer = document.querySelector(".related-products .products");
            productContainer.innerHTML = "";

            data.products
                .filter(product => product.id !== currentProductId) // Exclude current product
                .forEach(product => {
                    const productHTML = `
                        <div class="product" onclick="navigateToProduct('${product.id}')">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="product-name">${product.name}</div>
                            <div class="product-desc">Explore Now!</div>
                        </div>
                    `;
                    productContainer.innerHTML += productHTML;
                });
        })
        .catch(error => console.error("Error fetching related products:", error));
}

function fetchTrendyDesigns(categoryId = null) {
    let url = "/api/trendy-designs";
    if (categoryId) url += `?category=${categoryId}`; // Fetch products for a specific category

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById("products");
            productContainer.innerHTML = "";
            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" />
                    <h3>${product.name}</h3>
                    <button onclick="viewProductDetails('${product.id}')">View Details</button>
                `;
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
}


function navigateToProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}
