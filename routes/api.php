<?php

// routes/api.php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from API!'
    ]);
});




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

// ids of products are passed in the request body as an associative array. Where the id will be the key and the quantity will be the value.The quantity will be in kg.something format. 
// Next the address. The address will contain users name, mobile number, district, upazila, and a detailed address.
//
//

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

    // Process the order here (e.g., save to database, send confirmation, etc.)

    return response()->json([
        'message' => 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!',
        'orderDetails' => $validatedData,
    ]);
});
