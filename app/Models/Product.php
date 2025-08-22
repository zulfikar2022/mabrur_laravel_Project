<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Mass assignable fields
    protected $fillable = [
        'name',
        'description',
        'price_per_kg',
        'total_available_in_kg',
    ];

    // Optional: cast fields to appropriate types
    protected $casts = [
        'price_per_kg' => 'decimal:2',
        'total_available_in_kg' => 'decimal:2',
    ];

    public static function getProducts()
    {
        // get products which have isDeleted false
        return self::where('is_deleted', false)->get();
    }
}
