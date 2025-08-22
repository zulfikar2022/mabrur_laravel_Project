<?php

namespace App\Http\Controllers;

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
        if($user?->isAdmin ){ //TODO: Have to invet the logic
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }
        return Inertia::render('AddProduct', ['user' => $user]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    
    $user = Auth::user();
        if($user?->isAdmin ){ // TODO: Have to invet the logic
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }

        // dd($request->all());
               
        $validated =  $request->validate([
            'category' => 'required|string|in:date,nut,mango,ghee',
            'name' => 'required|string|max:255',
            'description' => 'string',
            'price_per_kg' => 'required|numeric|min:0.01',
            'total_kg' => 'required|numeric|min:0.01',
        ]);

    $product = new Product();
    $product->category = $request->category;
    $product->name = $request->name;
    $product->description = $request->description;
    $product->price_per_kg = $request->price_per_kg;
    $product->total_available_in_kg = $request->total_kg;


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
        return Inertia::render('UpdateProduct', [
            'product' => $product,
            'user'=> $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $user = Auth::user();
        if($user?->isAdmin ){ // TODO: Have to invert the logic
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }
        
        return Inertia::render('UpdateProduct', [
            'product' => $product,
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {

        $user = Auth::user();
        
        if($user?->isAdmin ){ // TODO: Have to invert the logic
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }


        // dd($request->all('name', 'description', 'price_per_kg', 'total_kg', 'image'));
        // dd($request->all());

        $validated =  $request->validate([
            'category' => 'required|string|in:date,nut,mango,ghee',
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
        $product->delete();
        
        $products = Product::all();
        $user = Auth::user();
        return redirect()->back()->with('success', 'Product deleted successfully!')->with('products', $products)->with('user', $user);
    }
}
