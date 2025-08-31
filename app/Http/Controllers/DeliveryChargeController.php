<?php

namespace App\Http\Controllers;

use App\Models\DeliveryCharge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DeliveryChargeController extends Controller
{
    //

    public function showDeliveryCharge(Request $request)
    {
        $user = Auth::user();
        if(!$user?->isAdmin){ 
            return Inertia::render('Unauthorized', [
                'user' => $user
            ]);
        }

        $deliveryCharge = DeliveryCharge::latest()->first();

        return Inertia::render("delivery_charge/ShowDeliveryCharge", [
            'user' => $user,
            'deliveryCharge' => $deliveryCharge
        ]);
    }

    public function addNewDeliveryChargeForm(Request $request)
    {
        $user = Auth::user();
        if(!$user?->isAdmin){ 
            return Inertia::render('Unauthorized', [
                'user' => $user
            ]);
        }

        return Inertia::render("delivery_charge/CreateNewDeliveryCharge", [
            'user' => $user,
        ]);
    }

    public function saveDeliveryCharges(Request $request){
        $user = Auth::user();
        if(!$user?->isAdmin){ 
            return Inertia::render('Unauthorized', [
                'user' => $user
            ]);
        }

        $validated = $request->validate([
            'dhaka_one_gram_to_150_gram' => 'required|integer|min:1',
            'dhaka_151_gram_to_500_gram' => 'required|integer|min:1',
            'dhaka_first_kg' => 'required|integer|min:1',
            'dhaka_additional_kgs' => 'required|integer|min:1',
            'outside_dhaka_first_kg' => 'required|integer|min:1',
            'outside_dhaka_additional_kgs' => 'required|integer|min:1',
        ]);

        $deliveryCharge = new DeliveryCharge();
        $deliveryCharge->dhaka_first_kg = $validated['dhaka_first_kg'];
        $deliveryCharge->dhaka_additional_kgs = $validated['dhaka_additional_kgs'];
        $deliveryCharge->outside_dhaka_first_kg = $validated['outside_dhaka_first_kg'];
        $deliveryCharge->outside_dhaka_additional_kgs = $validated['outside_dhaka_additional_kgs'];
        $deliveryCharge->dhaka_one_gram_to_150_gram = $validated['dhaka_one_gram_to_150_gram'];
        $deliveryCharge->dhaka_151_gram_to_500_gram = $validated['dhaka_151_gram_to_500_gram'];
        $deliveryCharge->save();

        return redirect()->route('show-delivery-charge');
    }
}
