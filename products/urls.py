from django.urls import path
from .views import add_to_wishlist, get_wishlist_by_email, remove_from_wishlist,update_cart_quantity

urlpatterns = [
    path('wishlist/add/', add_to_wishlist, name='add-to-wishlist'),
    path('wishlist/', get_wishlist_by_email, name='get-wishlist-by-email'),
    path('wishlist/remove/', remove_from_wishlist, name='remove-from-wishlist'), 
    path('update-cart-quantity/', update_cart_quantity, name='update_cart_quantity'),
]
