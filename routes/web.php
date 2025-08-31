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
    $products = Product::where('is_deleted', false)->where('is_available', true)->orderBy('id','desc')->get();
    $user = Auth::user();
    return Inertia::render('Welcome', [
        'products' => $products,
        'user'=> $user
    ]);
})->name('products.index');

Route::get('/products/specific/khejur', [ProductController::class, 'showKhejurPage'])->name('products.khejur');

Route::get('/products/specific/badam', [ProductController::class, 'showBadamPage'])->name('products.badam');

Route::get('/products/specific/ghee', [ProductController::class, 'showGheePage'])->name('products.ghee');

Route::get('/contact', [ProductController::class, 'showContactPage'])->name('contact');



// Admin specific routes
Route::get('/admin/products', [ProductController::class, 'showAdminProducts'])->name('admin.products')->middleware(['auth']);

Route::get('/admin/products/in-stock', [ProductController::class, 'showInStockProducts'])->name('admin.products.in-stock')->middleware(['auth' ]);

Route::get('/admin/products/out-of-stock', [ProductController::class, 'outOfStockProducts'])->name('admin.products.out-of-stock')->middleware(['auth' ]);
Route::get('/admin/products/change-availability', [ProductController::class, 'changeProductsAvailability'])->name('admin.products.change-availability')->middleware(['auth' ]);





require __DIR__ . '/auth.php';
require __DIR__ . '/orders.php';
