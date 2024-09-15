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
        fields = ['id', 'user', 'product','quantity', 'added_on']
        read_only_fields = ['added_on']




from .models import UserDetail

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = '__all__'
