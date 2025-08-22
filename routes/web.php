<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    $products = Product::all();
    $user = Auth::user();
    
    return Inertia::render('Welcome', [
        'products'=> $products,
        'name'=> $user?->name,
        'user' => $user,
    ]);
})->name('home');

Route::get('/add-product', function () {
    return Inertia::render('AddProduct', [
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render(component: 'Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// products related routes ADMIN ROUTES
Route::resource('products', ProductController::class)->only(['create', 'edit', 'store', 'update', 'destroy'])->middleware(['auth', 'verified', ]);

// products related routes PUBLIC ROUTES
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::get("/products", [ProductController::class, 'index'])->name('products.index');

Route::get('/product/specific/khejur', function(){
    $khejurs = Product::where('category', 'date')->get();
    
    return Inertia::render('Khejur', [
        'products' => $khejurs,
    ]);
})->name('products.khejur');

Route::get('/product/specific/badam', function(){
    $badams = Product::where('category', 'nut')->get();
    
    return Inertia::render('Badam', [
        'products' => $badams,
    ]);
})->name('products.badam');



// Admin specific routes
Route::get('/admin/products', function(){
    $products = Product::all();
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
})->name('admin.products');

// testing route
Route::get('/phpinfo', function () {
    phpinfo();
});



require __DIR__ . '/auth.php';
