<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('custom_delivery_charges', function (Blueprint $table) {
            $table->id();
            $table->decimal('minimum_weight_in_gram', 10, 2);
            $table->decimal('maximum_weight_in_gram', 10, 2);
            $table->decimal('delivery_charge_within_range_inside_dhaka', 10, 2);
            $table->decimal('delivery_charge_within_range_outside_dhaka', 10, 2);
            $table->boolean('is_deleted')->default(false);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_delivery_charges');
    }
};
