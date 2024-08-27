

# Register your models here.
from django.contrib import admin
from .models import Category, ElectronicProduct,Product,Wishlist

admin.site.register(Category)
admin.site.register(ElectronicProduct)
admin.site.register(Product)
admin.site.register(Wishlist)