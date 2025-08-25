<?php

// routes/api.php

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

function shippingChargeCalculator($products, $district){
    $totalWeight = 0;
    foreach($products as $product) {
        $totalWeight += $product['quantity'];
    }

    switch ($district) {
        case 'Dhaka':
            $totalWeightInGram = $totalWeight * 1000;
            if ($totalWeightInGram <= 150) {
                return 50;
            } elseif ($totalWeightInGram <= 500) {
                return 60;
            }
            $ceiledWeight = ceil($totalWeight);
            if ($ceiledWeight > 1) {
                return 70 + ($ceiledWeight - 1) * 20;
            } else {
                return 70;
            }
        default:
            if ($totalWeight > 1) {
                return 130 + (ceil($totalWeight) - 1) * 20;
            } else {
                return 130;
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

    return response()->json([
        'message' => 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!',
        'order' => [
            'id' => $order->id,
            'name' => $order->name,
            'district' => $order->district,
            'upazila' => $order->upazila,
            'address' => $order->address,
        ],
    ]);
});
