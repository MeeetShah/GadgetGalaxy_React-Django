"""
URL configuration for GadgetGalaxy project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from products.views import ProductListView 
from products.views import ElectronicProductViewSet
from products.views import add_to_wishlist
from products.views import get_wishlist_by_email, remove_from_wishlist,update_cart_quantity


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/products/', ProductListView.as_view(), name='product-list'),
    path('api/electronics/', ElectronicProductViewSet.as_view(), name='electronics-list'),
    path('wishlist/add/', add_to_wishlist, name='add-to-wishlist'),
    path('wishlist/', get_wishlist_by_email, name='get-wishlist-by-email'),
    path('wishlist/remove/', remove_from_wishlist, name='remove-from-wishlist'),
    path('update-cart-quantity/', update_cart_quantity, name='update_cart_quantity'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


