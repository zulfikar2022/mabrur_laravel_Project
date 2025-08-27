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

function getOrderDetails($orders){
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


    // array_push($orderDetails, $product_with_quantity);
    $orderDetails[] = [
        'order_info' => $order,
        'products' => $product_with_quantity,
        'shipping_charge' => $order->delivery_charge,
        'total_amount' => $order->total_price,
        'total_payable_amount' => $order->delivery_charge + $order->total_price,
    ];
   }
   return $orderDetails;
}

Route::get("/admin/new-orders", function(){
    if(isAdmin()){ // TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }

    $orders = Order::where('is_confirmed', false)
    ->where('is_deleted', false)
    ->where('is_shipped', false)
    ->where('is_returned_back', false)
    ->where('is_paid', false)
    ->orderBy('id', 'desc')
    ->get();

    
   
    $orderDetails = getOrderDetails($orders);
    return Inertia::render("order_managements/NewOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
        
    ]);
    
})->name('new-order')->middleware(['auth' ]);

Route::get('/admin/confirmed-orders', function(){
    if(isAdmin()){ // TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }

    $orders = Order::where('is_confirmed', true)
    ->where('is_deleted', false)
    ->where('is_shipped', false)
    ->where('is_returned_back', false)
    ->where('is_paid', false)
    ->orderBy('id', 'desc')
    ->get();

    
   
    $orderDetails = getOrderDetails($orders);
    return Inertia::render("order_managements/ConfirmedOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
    ]); 
})->name('confirmed-order')->middleware(['auth']);


Route::get('/admin/shipped-orders', function(){
    if(isAdmin()){ // TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }

    $orders = Order::where('is_deleted', false)
    ->where('is_shipped', true)
    ->where('is_returned_back', false)
    ->where('is_paid', false)
    ->orderBy('id', 'desc')
    ->get();

    
   
    $orderDetails = getOrderDetails($orders);
    return Inertia::render("order_managements/ShippedOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
    ]); 
})->name('shipped-order')->middleware(['auth']);

Route::get('/admin/deleted-orders', function(){
    if(isAdmin()){ // TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }

    $orders = Order::where('is_deleted', true)
    ->orderBy('id', 'desc')
    ->get();

    
   
    $orderDetails = getOrderDetails($orders);
    return Inertia::render("order_managements/DeletedOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
    ]); 
})->name('deleted-order')->middleware(['auth']);

Route::get('/admin/paid-orders', function(){
    if(isAdmin()){ // TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }

    $orders = Order::where('is_paid', true)
    ->where('is_deleted', false)
    ->orderBy('id', 'desc')
    ->get();

    
   
    $orderDetails = getOrderDetails($orders);
    return Inertia::render("order_managements/PaidOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
    ]); 
})->name('paid-order')->middleware(['auth']);

Route::get('/admin/all-orders', function(){
    if(isAdmin()){ //TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }
    $orders = Order::orderBy('id', 'desc')->get();
    $orderDetails = getOrderDetails($orders);
    return Inertia::render("order_managements/AllOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
    ]); 
})->name('all-order')->middleware(['auth']);

Route::get('/my-order', function(){
    return Inertia::render("MyOrder", [
        'user' => Auth::user()
    ]); 
})->name('my-order');
