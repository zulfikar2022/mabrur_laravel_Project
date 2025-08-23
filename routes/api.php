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