from rest_framework import serializers
from .models import Product,ElectronicProduct,Wishlist



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ElectronicProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectronicProduct
        fields = '__all__'


from rest_framework import serializers
from .models import Wishlist

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'product', 'added_on']
        read_only_fields = ['added_on']



