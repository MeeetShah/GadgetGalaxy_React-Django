from rest_framework import serializers
from .models import Product,ElectronicProduct

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ElectronicProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectronicProduct
        fields = '__all__'
