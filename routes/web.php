<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    $products = Product::getProducts();
    $user = Auth::user();
    
    return Inertia::render('Welcome', [
        'products'=> $products,
        'name'=> $user?->name,
        'user' => $user,
    ]);
})->name('home');

// Route::get('/add-product', function () {
//     return Inertia::render('AddProduct', [
//     ]);
// });


// Route::get('/dashboard', function () {
//     return Inertia::render(component: 'Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// products related routes ADMIN ROUTES
Route::resource('products', ProductController::class)->only(['create', 'edit', 'store', 'update', 'destroy'])->middleware(['auth']);

Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show')->middleware(['auth']);

// products related routes PUBILC  ROUTES


Route::get('/products', function(){
    $products = Product::where('is_deleted', false)->get();
    $user = Auth::user();
    return Inertia::render('Welcome', [
        'products' => $products,
        'user'=> $user
    ]);
})->name('products.index');

Route::get('/products/specific/khejur', function(){
    $khejurs = Product::where(['category' => 'date', 'is_deleted' => false])->get();

    return Inertia::render('Khejur', [
        'products' => $khejurs,
    ]);
})->name('products.khejur');

Route::get('/products/specific/badam', function(){
    $badams = Product::where(['category' => 'nut', 'is_deleted' => false])->get();

    return Inertia::render('Badam', [
        'products' => $badams,
    ]);
})->name('products.badam');

Route::get('/contact', function(){
    $user = Auth::user();
    return Inertia::render('Contact', [
        'user'=> $user,
        'title' => 'Contact Us'
    ]);
})->name('contact');



// Admin specific routes
Route::get('/admin/products', function(){
    $products = Product::getProducts();
    $user = Auth::user();
    if($user?->isAdmin){ // TODO: Have to invert the logic
        return Inertia::render("Unauthorized", [
            'user' => $user
        ]);
    }
    return Inertia::render('AdminProducts', [
        'products' => $products,
        'user'=> $user
    ]);
})->name('admin.products')->middleware(['auth' ]);





require __DIR__ . '/auth.php';
require __DIR__ . '/orders.php';
