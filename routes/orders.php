<?php
// routes for new orders

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

function isAdmin(){
    $user = Auth::user();
    return $user?->isAdmin;
}

Route::get("/admin/new-orders", function(){
    if(isAdmin()){ // TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }

    $orders = Order::where('is_confirmed', false)->where('is_deleted', false)->where('is_shipped', false)->where('is_returned_back', false)->where('is_paid', false)->get();
    
    $orderDetails = [];
   for($i = 0; $i < count($orders); $i++){
    $order = $orders[$i];
    $mediator = OrderProduct::where('order_id', $order->id)->get()->toArray();

    $product_ids = [];
    for($j = 0; $j < count(value: $mediator); $j++){
        array_push($product_ids, $mediator[$j]['product_id']);
    }

    $products = Product::whereIn('id', $product_ids)->get();
    $product_with_quantity = [];
    for($j = 0; $j < count($products);$j++){
        $pr = $products[$j];
        for($k = 0; $k<count($mediator); $k++){
            if($pr->id == $mediator[$k]['product_id']){
                $pr['quantity'] = $mediator[$k]['quantity'];
                array_push($product_with_quantity, $pr);
            }
        }
    }


    array_push($orderDetails, $product_with_quantity);
   }

//    dd($orderDetails);

    return Inertia::render("NewOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
        
    ]);
    //  return Inertia::render('AddProduct', [
    // ]);
})->name('new-order');



?>