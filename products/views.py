from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Product,ElectronicProduct
from .serializers import ProductSerializer,ElectronicProductSerializer
from rest_framework.permissions import AllowAny
from rest_framework import viewsets

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] 



class ElectronicProductViewSet(generics.ListAPIView):
    queryset = ElectronicProduct.objects.all()
    serializer_class = ElectronicProductSerializer
    permission_classes = [AllowAny] 
