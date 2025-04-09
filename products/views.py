from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Product
from django.shortcuts import render
import requests

@csrf_exempt  # Disable CSRF for API requests
def add_product(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            
            # Create and save the new product
            product = Product(
                name=data["name"],
                category=data["category"],
                price=data["price"],
                description=data.get("description", ""),
                image_url=data.get("image_url", ""),
                available_sizes=data.get("available_sizes", []),
                colors=data.get("colors", [])
            )
            product.save()

            return JsonResponse({"message": "Product added successfully", "product": product.to_json()}, status=201)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

# API to get all products
def get_products(request):
    products = Product.objects()
    return JsonResponse({"products": [p.to_json() for p in products]}, safe=False)

# API to get products by category
def get_products_by_category(request, category_name):
    products = Product.objects.filter(category=category_name)  # Adjust as per your field name
    product_list = [
        {
            "id": product.id,
            "name": product.name,
            "image_url": product.image_url,  # Adjust field names based on your model
            "price": product.price,
            "sizes": product.sizes,
            "colors": product.colors,
            "discount": product.discount,
        }
        for product in products
    ]
    return JsonResponse({"products": product_list})

# API to get a single product by ID
def get_product_details(request, product_id):
    product = Product.objects.get(id=product_id)
    product_data = {
        "id": product.id,
        "name": product.name,
        "image": product.image_url,
        "category": product.category.name,  # Adjust based on your model
        "fabric": product.fabric,
        "sizes": product.sizes,  # Assuming sizes are stored as a list
        "colors": product.colors,  # Assuming colors are stored as a list
        "color_images": product.color_images,  # Store images for different colors
        "price": product.price,
        "mrp": product.mrp,  # Original price
        "discount": product.discount,
        "stock_status": "Available" if product.stock > 0 else "Out of Stock",
    }
    return JsonResponse(product_data)

def product_list(request):
    response = requests.get("http://127.0.0.1:8000/products/all/")
    products = response.json().get("products", [])
    return render(request, "index.html", {"products": products})
