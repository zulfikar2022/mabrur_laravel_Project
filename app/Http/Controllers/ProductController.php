<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return a view with all products
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        if(!$user?->isAdmin ){
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }
        $couriers = Courier::all();
        return Inertia::render('AddProduct', ['user' => $user, 'couriers' => $couriers]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    
    $user = Auth::user();
        if(!$user?->isAdmin ){ 
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }

        // dd($request->all());
               
        $validated =  $request->validate([
            'category' => 'required|string|in:date,nut,mango,ghee,honey',
            'name' => 'required|string|max:255',
            'description' => 'string',
            'price_per_kg' => 'required|numeric|min:0.01',
            'total_kg' => 'required|numeric|min:0.01',
            'is_delivery_charge_free' => 'required|boolean',
            'minimum_weight_for_free_delivery' => 'required|numeric|min:0',
            'courier_id' => 'required|exists:couriers,id',
        ]);

    $product = new Product();
    $product->category = $request->category;
    $product->name = $request->name;
    $product->description = $request->description;
    $product->price_per_kg = $request->price_per_kg;
    $product->total_available_in_kg = $request->total_kg;
    $product->is_delivery_charge_free = $request->is_delivery_charge_free;
    $product->minimum_weight_for_free_delivery = $request->minimum_weight_for_free_delivery;
    $product->courier_id = $request->courier_id;



    if($request->image != null) {
        $imageName = $product->name.".".time() . '.' . $request->file('image')->getClientOriginalExtension();
        $imagePath = $request->file('image')->storeAs('products', $imageName, 'public');
        $product->image_path = $imagePath;
    }

    $product->save();
    

    return redirect()->back()->with('success', 'Product added successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $user = Auth::user();
        if($user->is_admin){ 
            return Inertia::render('UpdateProduct', [
            'product' => $product,
            'user'=> $user
        ]);
        }
        return Inertia::render('Unauthorized', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $user = Auth::user();
        if(!$user?->isAdmin ){ 
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }
        $couriers = Courier::all();
        return Inertia::render('UpdateProduct', [
            'product' => $product,
            'user' => $user,
            'couriers' => $couriers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {

        $user = Auth::user();
        
        if(!$user?->isAdmin ){
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }


        // dd($request->all('name', 'description', 'price_per_kg', 'total_kg', 'image'));
        // dd($request->all());

        $validated =  $request->validate([
            'category' => 'required|string|in:date,nut,mango,ghee,honey',
            'name' => 'required|string|max:255',
            'description' => 'string',
            'price_per_kg' => 'required|numeric|min:0.01',
            'total_kg' => 'required|numeric|min:0.01',
        ]);

        

        $product->category = $request->category;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price_per_kg = $request->price_per_kg;
        $product->total_available_in_kg = $request->total_kg;

        

        if($request->image != null) {
            if ($product->image_path) {
                $imagePath = public_path('storage/' . $product->image_path);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
            $imageName = $product->name.".".time() . '.' . $request->file('image')->getClientOriginalExtension();
            $imagePath = $request->file('image')->storeAs('products', $imageName, 'public');
            $product->image_path = $imagePath;
        }

        $product->save();

        return redirect()->back()->with('success','successfully updated')->with('product', $product)->with('user', $user);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        
        if ($product->image_path) {
            $imagePath = public_path('storage/' . $product->image_path);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
        // $product->delete();
        $product->is_deleted = true;
        $product->save();

        $products = Product::getProducts();
        $user = Auth::user();
        return redirect()->back()->with('success', 'Product deleted successfully!')->with('products', $products)->with('user', $user);
    }

    public function showInStockProducts() {
        $user = Auth::user();
        if(!$user?->isAdmin ){ 
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }
        $products = Product::getProducts();
        return Inertia::render('InStockProducts', [
            'products' => $products,
            'user'=> $user
        ]);
    }

    public function outOfStockProducts() {
        $user = Auth::user();
        if(!$user?->isAdmin ){ 
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }
        $products = Product::where('is_deleted', false)->where('is_available', false)->orderBy('id','desc')->get();
        return Inertia::render('OutOfStockProducts', [
            'products' => $products,
            'user'=> $user
        ]);
    }

    public function showAdminProducts(){
    $products = Product::where('is_deleted', false)->orderBy('id','desc')->get();
    $user = Auth::user();
    if(!$user?->isAdmin){ 
        return Inertia::render("Unauthorized", [
            'user' => $user
        ]);
    }
    return Inertia::render('AdminProducts', [
        'products' => $products,
        'user'=> $user
    ]);
    }

    public function changeProductsAvailability(Request $request) {
        
        $user = Auth::user();
        if(!$user?->isAdmin ){ 
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }

        $productId = $request->query('id');
        $product = Product::find($productId);
        if (!$product) {
            return redirect()->back()->with('error', 'Product not found.');
        }

        $product->is_available = !$product->is_available;
        $product->save();

        return redirect()->back()->with('success', 'Product availability updated successfully!')->with('product', $product)->with('user', $user);
    }

    public function showContactPage() {
    $user = Auth::user();
    return Inertia::render('Contact', [
        'user'=> $user,
        'title' => 'Contact Us'
    ]);
    }

    public function showBadamPage(){

    $badams = Product::getBadams();
    $user = Auth::user();

    return Inertia::render('Badam', [
        'products' => $badams,
        'user' => $user
    ]);
    }

    public function showKhejurPage(){

    $khejurs = Product::getKhejurs();
    $user = Auth::user();
    return Inertia::render('Khejur', [
        'products' => $khejurs,
        'user'=> $user
    ]);
    }

    public function showGheePage(){
        $ghee = Product::getGhees();
        $user = Auth::user();
        return Inertia::render('Ghee', [
            'products' => $ghee,
            'user'=> $user
        ]);
    }

    public function showModhuPage(){
        $modhu = Product::getModhus();
        $user = Auth::user();
        return Inertia::render('Modhu', [
            'products' => $modhu,
            'user'=> $user
        ]);
    }
}