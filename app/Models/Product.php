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
        return self::where('is_deleted', false)->where('is_available', true)->orderBy('id','desc')->get();
    }

    public static function getKhejurs()
    {
        return self::where(['category' => 'date', 'is_deleted' => false, 'is_available' => true])->orderBy('id','desc')->get();
    }

    public static function getBadams()
    {
        return self::where(['category' => 'nut', 'is_deleted' => false, 'is_available' => true])->orderBy('id','desc')->get();
    }

    public static function getGhees()
    {
        
        $data = self::where(['category' => 'ghee', 'is_deleted' => false, 'is_available' => true])->orderBy('id','desc')->get();
        return $data;
    }

    public static function getModhus(){
        $modhu = self::where(['category'=> 'honey',   'is_deleted'=> false, 'is_available' => true ])->orderBy('id','desc')->get();
        return $modhu;
    }

}
