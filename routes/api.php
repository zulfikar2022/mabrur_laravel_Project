<?php

// routes/api.php

use App\Models\DeliveryCharge;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

function shippingChargeCalculator($products, $district){
    $totalWeight = 0;
    foreach($products as $product) {
        $totalWeight += $product['quantity'];
    }

    $deliveryCharge = DeliveryCharge::getLatestDeliveryCharge();
    $dhaka_first_kg = $deliveryCharge->dhaka_first_kg;
    $dhaka_additional_kgs = $deliveryCharge->dhaka_additional_kgs;
    $outside_dhaka_first_kg = $deliveryCharge->outside_dhaka_first_kg;
    $outside_dhaka_additional_kgs = $deliveryCharge->outside_dhaka_additional_kgs;
    $dhaka_one_gram_to_150_gram = $deliveryCharge->dhaka_one_gram_to_150_gram;
    $dhaka_151_gram_to_500_gram = $deliveryCharge->dhaka_151_gram_to_500_gram;

    switch ($district) {
        case 'Dhaka':
            $totalWeightInGram = $totalWeight * 1000;
            if ($totalWeightInGram <= 150) {
                return $dhaka_one_gram_to_150_gram;
            } elseif ($totalWeightInGram <= 500) {
                return $dhaka_151_gram_to_500_gram;
            }
            $ceiledWeight = ceil($totalWeight);
            if ($ceiledWeight > 1) {
                return $dhaka_first_kg + ($ceiledWeight - 1) * $dhaka_additional_kgs;
            } else {
                return $dhaka_first_kg;
            }
        default:
            if ($totalWeight > 1) {
                return $outside_dhaka_first_kg + (ceil($totalWeight) - 1) * $outside_dhaka_additional_kgs;
            } else {
                return $outside_dhaka_first_kg;
            }
    }
}

function totalPriceCalculator($products){
    $totalPrice = 0;
    foreach($products as $product) {
        $productData = Product::find($product['id']);
        if($productData) {
            $totalPrice += $productData->price_per_kg * $product['quantity'];
        }
    }
    return $totalPrice;
}




Route::get('/products', function (Request $request) {
    $ids = $request->query('ids', '');
    // take out comma separated ids in an array
    $idsArray = explode(',', $ids);

    // fetch data from the products table for all the ids in the array
    $products = Product::whereIn('id', $idsArray)->where('is_deleted', false)->get()->makeHidden(['created_at', 'updated_at', 'total_available_in_kg', 'is_deleted']);

    return response()->json([
        'ids' => $idsArray,
        'products' => $products
    ]);
});

Route::post('/place-order', function (Request $request) {
    // validate the request
    $validatedData = $request->validate([
        'products' => 'required|array',
        'products.*.id' => 'required|integer|exists:products,id',
        'products.*.quantity' => 'required|numeric|min:0',
        'name' => 'required|string|max:255',
        'mobile' => 'required|string|size:11|regex:/^01\d{9}$/',
        'district' => 'required|string|max:255',
        'upazila' => 'required|string|max:255',
        'address' => 'required|string|max:500',
    ]);
 
   

    $order = new Order();
    $order->name = $validatedData['name'];
    $order->mobile = $validatedData['mobile'];
    $order->district = $validatedData['district'];
    $order->upazila = $validatedData['upazila'];
    $order->address = $validatedData['address'];
    $order->delivery_charge = shippingChargeCalculator($validatedData['products'], $validatedData['district']);
    $order->total_price = totalPriceCalculator($validatedData['products']);
    $order->save();

    // make the entry for order_products table
    $length = count($validatedData['products']);

    for($i = 0; $i< $length; $i++) {
        $orderProduct = new OrderProduct();
        $orderProduct->order_id = $order->id;
        $orderProduct->product_id = $validatedData['products'][$i]['id'];
        $orderProduct->quantity = $validatedData['products'][$i]['quantity'];
        $orderProduct->save();
    }

    // dd($order);
    return response()->json([
        'message' => 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!',
        'success' => true,
        'order' => [
            'id' => $order->id,
            'name' => $order->name,
            'district' => $order->district,
            'upazila' => $order->upazila,
            'address' => $order->address,
        ],
    ]);
})->middleware('throttle:three-per-day');



Route::get('/admin/change-status', function (Request $request) {
    // dd("request is received");
    // $user = $request->user();
    $routeName = request()->route()->getName();
    // dd($routeName);

    $user = Auth::user();

    if ($user && $user?->is_admin) { //TODO: Have to invert the logic
        return response()->json(['error' => 'Unauthorized', 'success' => false], 401);
    }

    $status = $request->query('status');
    $order_id = $request->query('order_id');

    $validStatuses = ['is_confirmed', 'is_shipped', 'is_paid', 'is_deleted'];
    if (!in_array($status, $validStatuses)) {
        return response()->json(['error' => 'Invalid status', 'success' => false], 400);
    }
    // user will not be able to change is_deleted status to false if it is true
    $order = Order::find($order_id);
    if ($status === 'is_deleted') {
        // $order = Order::find($order_id);
        if ($order && $order?->is_deleted) {
            return response()->json(['message' => 'Cannot change is_deleted status back to false', 'success' => false], 400);
        }
    }

    if($order && $order?->$status === true) {
        return response()->json(['message' => 'Order not found or status is already changed', 'success' => false], 404);
    }

    $order->$status = true;
    $order->save();

    return response()->json(['message' => 'Order status updated successfully', 'order' => $order, 'success' => true], 200);
});

Route::get('/delivery-charge', function (Request $request) {
    $deliveryCharge = DeliveryCharge::getLatestDeliveryCharge();
    // dd($deliveryCharge);
    return response()->json($deliveryCharge);
})->name('delivery-charge');