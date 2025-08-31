<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{

    public static function getNewOrders(Request $request){
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
    ->paginate(10);

    $orderDetails = getOrderDetails($orders->items());
    $paginationData = getPaginatedData($orders);

    return Inertia::render("order_managements/NewOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
        'paginationData'=> $paginationData
    ]);
   }

   public static function getConfirmedOrders(Request $request){
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
    ->paginate(10);

    $orderDetails = getOrderDetails($orders->items());
    $paginationData = getPaginatedData($orders);

    return Inertia::render("order_managements/ConfirmedOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
        'paginationData'=> $paginationData
    ]);
   }

   public static function getShippedOrders(Request $request){
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
    ->paginate(10);

    $orderDetails = getOrderDetails($orders->items());
    $paginationData = getPaginatedData($orders);

    return Inertia::render("order_managements/ShippedOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
        'paginationData'=> $paginationData
    ]); 
   }


   public static function getDeleteOrders(Request $request){
    if(isAdmin()){ // TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }

    $orders = Order::where('is_deleted', true)
    ->orderBy('id', 'desc')
    ->paginate(10);

    $orderDetails = getOrderDetails($orders->items());
    $paginationData = getPaginatedData($orders);

    return Inertia::render("order_managements/DeletedOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
        'paginationData'=> $paginationData
    ]); 
   }

   public static function getPaidOrders(Request $request){
    if(isAdmin()){ // TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }

    $orders = Order::where('is_paid', true)
    ->where('is_deleted', false)
    ->orderBy('id', 'desc')
    ->paginate(10);

    $orderDetails = getOrderDetails($orders->items());
    $paginationData = getPaginatedData($orders);

    return Inertia::render("order_managements/PaidOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
        'paginationData'=> $paginationData
    ]); 
   }

   public static function getAllOrders(Request $request){       
    if(isAdmin()){ //TODO: Have to invet the logic
        return Inertia::render("Unauthorized", [
            'user' => Auth::user()
        ]);
    }
    $id = $request->query('id');
    $customer = $request->query('customer_details');
    
    if($id){
        $orders = Order::where('id', $id)->orderBy('id', 'desc')->paginate(10);
        if($orders->isEmpty()){
            return Inertia::render("order_managements/AllOrders", [
                'user' => Auth::user(),
                'orderDetails'=> [],
                'paginationData' => [],
            ]); 
        }
        $orderDetails = getOrderDetails($orders->items());
        $paginationData = getPaginatedData($orders);
        return Inertia::render("order_managements/AllOrders", [
            'user' => Auth::user(),
            'orderDetails'=> $orderDetails,
            'paginationData' => $paginationData,
        ]); 
    }

    if($customer){
        $orders = Order::where(function($query) use ($customer){
            $query->where('name', 'like', '%'.$customer.'%')
            ->orWhere('mobile', 'like', '%'.$customer.'%')
            ->orWhere('district', 'like', '%'.$customer.'%')
            ->orWhere('upazila', 'like', '%'.$customer.'%')
            ->orWhere('address', 'like', '%'.$customer.'%');
        })->orderBy('id', 'desc')->paginate(10);
        if($orders->isEmpty()){
            return Inertia::render("order_managements/AllOrders", [
                'user' => Auth::user(),
                'orderDetails'=> [],
                'paginationData' => [],
            ]); 
        }
        $orderDetails = getOrderDetails($orders->items());
        $paginationData = getPaginatedData($orders);
        return Inertia::render("order_managements/AllOrders", [
            'user' => Auth::user(),
            'orderDetails'=> $orderDetails,
            'paginationData' => $paginationData,
        ]); 
    }

    $orders = Order::orderBy('id', 'desc')->paginate(10);
    
    $orderDetails = getOrderDetails($orders->items());
    $paginationData = getPaginatedData($orders);
    return Inertia::render("order_managements/AllOrders", [
        'user' => Auth::user(),
        'orderDetails'=> $orderDetails,
        'paginationData' => $paginationData,
    ]); 
    
   }
}
