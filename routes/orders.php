<?php
// routes for new orders

use App\Http\Controllers\DeliveryChargeController;
use App\Http\Controllers\OrderController;
use App\Models\DeliveryCharge;
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

function getPaginatedData($orders){
    return [
        'total' => $orders->total(),
        'per_page' => $orders->perPage(),
        'current_page' => $orders->currentPage(),
        'last_page' => $orders->lastPage(),
        'from' => $orders->firstItem(),
        'to' => $orders->lastItem(),
    ];
}

Route::get("/admin/new-orders", [OrderController::class, 'getNewOrders'])->name('new-order')->middleware(['auth']);

Route::get('/admin/confirmed-orders', [OrderController::class, 'getConfirmedOrders'])->name('confirmed-order')->middleware(['auth']);


Route::get('/admin/shipped-orders', [OrderController::class, 'getShippedOrders'])->name('shipped-order')->middleware(['auth']);

Route::get('/admin/deleted-orders', [OrderController::class, 'getDeleteOrders'])->name('deleted-order')->middleware(['auth']);

Route::get('/admin/paid-orders', [OrderController::class, 'getPaidOrders'])->name('paid-order')->middleware(['auth']);

Route::get('/admin/all-orders', [OrderController::class, 'getAllOrders'])->name('all-order')->middleware(['auth']);



Route::get('/my-order', function(){
    return Inertia::render("MyOrder", [
        'user' => Auth::user()
    ]); 
})->name('my-order');



// Delivery charge related routes will be here
Route::get('/admin/show-delivery-charge', [DeliveryChargeController::class, 'showDeliveryCharge'])->middleware(['auth'])->name('show-delivery-charge');



Route::get('/admin/add-new-delivery-charge', [DeliveryChargeController::class, 'addNewDeliveryChargeForm'])->middleware(['auth'])->name('add-new-delivery-charge');

Route::post('/admin/save-delivery-charges', [DeliveryChargeController::class, 'saveDeliveryCharges'])->middleware(['auth'])->name('save-delivery-charge');


// test route
Route::get('/test', function(){
    $data = DeliveryCharge::getLatestDeliveryCharge();
    dd($data);
    return $data;
});