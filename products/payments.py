import json
import razorpay
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from .models import Payment
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import pkg_resources

@csrf_exempt
# @api_view(['POST'])
@permission_classes([AllowAny])
def create_order(request):
    if request.method == 'POST':
        # Get the amount from the request body
        data = json.loads(request.body)
        amount = data.get('amount')  # Amount in INR (multiply by 100 to convert to paise)
        
        client = razorpay.Client(auth=("rzp_test_nMswt4KC07UKyG", "TPk1Lu2sicHC8wTjMoWywNRx"))
        
        # Create order with Razorpay
        order = client.order.create({
            "amount": int(amount) * 100,  # Amount in paise
            "currency": "INR",
            "payment_capture": "1"
        })

        # Save the order details in your database (optional)
        # payment = Payment.objects.create(order_id=order['id'], amount=amount, status="created")

        return JsonResponse(order)
    
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def payment_callback(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        razorpay_order_id = data.get('razorpay_order_id')
        razorpay_payment_id = data.get('razorpay_payment_id')
        razorpay_signature = data.get('razorpay_signature')

        client = razorpay.Client(auth=("rzp_test_nMswt4KC07UKyG", "TPk1Lu2sicHC8wTjMoWywNRx"))

        try:
            # Verify the Razorpay signature
            client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            })

            # Update payment status in database
            # payment = Payment.objects.get(order_id=razorpay_order_id)
            # payment.status = "paid"
            # payment.razorpay_payment_id = razorpay_payment_id
            # payment.save()

            return JsonResponse({'status': 'success'})

        except razorpay.errors.SignatureVerificationError:
            return JsonResponse({'status': 'failure'}, status=400)