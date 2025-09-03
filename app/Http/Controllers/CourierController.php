<?php

namespace App\Http\Controllers;

use App\Models\Courier;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if(!$user?->isAdmin ){
            return Inertia::render("Unauthorized", [
                'user' => $user
            ]);
        }

        return Inertia::render("AllCouriers", [
            'user' => $user
        ]);
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

        return Inertia::render("AddNewCourier", [
            'user' => $user
        ]);
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
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // dd($request->all());

        Courier::create($request->only('name'));

        return redirect()->route('admin.couriers');
    }

    /**
     * Display the specified resource.
     */
    public function show(Courier $courier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Courier $courier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Courier $courier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Courier $courier)
    {
        //
    }
}
