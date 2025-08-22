<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Primary key: id
            // product category: will be among "date", "nut", "mango" and "ghee"
            $table->enum('category', ['date', 'nut', 'mango', 'ghee']);
            $table->string('name'); // Product name
            $table->string('description'); // Product description
            $table->decimal('price_per_kg', 8, 2); // Price per kg
            $table->decimal('total_available_in_kg', 8, 2); // Available quantity in kg
            $table->boolean('is_deleted')->default(false); // Soft delete flag
            $table->string('image_path')->nullable(); // Path to product image
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
