import logging
from django.shortcuts import render

# Create your views here.

from .models import Product,ElectronicProduct,Wishlist,UserDetail
from .serializers import ProductSerializer,ElectronicProductSerializer
from rest_framework.permissions import AllowAny
from rest_framework import viewsets,status,generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import WishlistSerializer,UserDetailSerializer
from django.contrib.auth.models import User
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json




logger = logging.getLogger('simple_example')
logger.setLevel(logging.DEBUG)
console = logging.StreamHandler()
console.setLevel(level=logging.DEBUG)
formatter =  logging.Formatter('%(levelname)s : %(message)s')
console.setFormatter(formatter)
logger.addHandler(console)



class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] 



class ElectronicProductViewSet(generics.ListAPIView):
    queryset = ElectronicProduct.objects.all()
    serializer_class = ElectronicProductSerializer
    permission_classes = [AllowAny] 

class customerdetailsviewset(generics.ListAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [AllowAny] 




@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_wishlist(request):
    email = request.data.get('email')
    product_id = request.data.get('product')

    # Validate the email and product ID
    try:
        logger.debug('simple message' + email)
        user = User.objects.get(email=email)  # Use related name from UserProfile
        product = ElectronicProduct.objects.get(id=product_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except ElectronicProduct.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    # Check if the wishlist entry already exists
    if Wishlist.objects.filter(user=user, product=product).exists():
        return Response({"error": "This product is already in your wishlist"}, status=status.HTTP_400_BAD_REQUEST)

    # Create the wishlist entry
    wishlist = Wishlist(user=user, product=product)
    wishlist.save()

    # Serialize and return the new wishlist entry
    serializer = WishlistSerializer(wishlist)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_wishlist_by_email(request):
    email = request.query_params.get('email')

    # Validate the email parameter
    if not email:
        return Response({"error": "Email parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # Get all wishlist items for the user
    wishlist = Wishlist.objects.filter(user=user)
    serializer = WishlistSerializer(wishlist, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def remove_from_wishlist(request):
    email = request.data.get('email')
    product_id = request.data.get('product')

    # Validate the email and product ID
    if not email or not product_id:
        return Response({"error": "Email and product_id are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        product = ElectronicProduct.objects.get(id=product_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except ElectronicProduct.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    # Find the wishlist entry
    try:
        wishlist_item = Wishlist.objects.get(user=user, product=product)
        wishlist_item.delete()  # Remove the item from the wishlist
        return Response({"message": "Item removed from wishlist"}, status=status.HTTP_200_OK)
    except Wishlist.DoesNotExist:
        return Response({"error": "Item not found in wishlist"}, status=status.HTTP_404_NOT_FOUND)
    


@api_view(['POST'])
@permission_classes([AllowAny])
def update_cart_quantity(request):
    try:
        # Fetch item by ID
        email = request.data.get('email')
        product_id = request.data.get('product')
        new_quantity = request.data.get('quantity')

        try:
            user = User.objects.get(email=email)
            product = ElectronicProduct.objects.get(id=product_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except ElectronicProduct.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if item exists
        cart_item = Wishlist.objects.get(user=user, product=product)
        cart_item.quantity = new_quantity
        cart_item.save()

        # Serialize updated cart item
        serializer = WishlistSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Wishlist.DoesNotExist:
        return Response({'error': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def create_user_detail(request):
    if request.method == 'POST':
        serializer = UserDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def update_user_details(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        user = get_object_or_404(UserDetail, email=email)

        # Update the user details
        user.name = data.get('name', user.name)
        user.pincode = data.get('pincode', user.pincode)
        user.mobile = data.get('mobile', user.mobile)
        user.address = data.get('address', user.address)
        user.city = data.get('city', user.city)
        user.state = data.get('state', user.state)
        
        user.save()
        return JsonResponse({'message': 'User details updated successfully.'})
    return JsonResponse({'error': 'Invalid request method.'}, status=400)
    