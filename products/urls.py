from django.urls import path
from .views import add_product, get_products, get_products_by_category, get_product_details, product_list

urlpatterns = [
    path('add/', add_product, name='add_product'),
    path('all/', get_products, name='get_products'),
    path("", product_list, name="home"),
    path('api/product/<str:product_id>/', get_product_details, name='get_product_details'),
    path('api/products/<str:category_name>/', get_products_by_category, name='get_products_by_category'),
]
