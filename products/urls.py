from django.urls import path
from .views import add_to_wishlist, get_wishlist_by_email, remove_from_wishlist,update_cart_quantity,create_user_detail
from .payments import create_order, payment_callback

urlpatterns = [
    path('wishlist/add/', add_to_wishlist, name='add-to-wishlist'),
    path('wishlist/', get_wishlist_by_email, name='get-wishlist-by-email'),
    path('wishlist/remove/', remove_from_wishlist, name='remove-from-wishlist'), 
    path('update-cart-quantity/', update_cart_quantity, name='update_cart_quantity'),
    path('create-user/', create_user_detail, name='create_user_detail'),
    path('api/create-order/', create_order, name='create-order'),
    path('api/payment-callback/', payment_callback, name='payment-callback')
]

