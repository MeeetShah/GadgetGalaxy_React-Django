

# Register your models here.
from django.contrib import admin
from .models import Category, ElectronicProduct,Product,Wishlist,UserDetail

admin.site.register(Category)
admin.site.register(ElectronicProduct)
admin.site.register(Product)
admin.site.register(Wishlist)
admin.site.register(UserDetail)