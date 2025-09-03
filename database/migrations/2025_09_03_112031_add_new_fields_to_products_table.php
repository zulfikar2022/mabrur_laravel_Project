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
        Schema::table('products', function (Blueprint $table) {
            $table->boolean('is_delivery_charge_free')->default(false);
            $table->decimal('minimum_weight_for_free_delivery', 10, 2)->default(0);
            $table->boolean('has_custom_delivery_charge')->default(false);
            $table->decimal('per_unit_amount_in_gram', 10, 2)->default(1000);
            $table->decimal('first_unit_amount_in_gram', 10, 2)->default(1000);
            $table->decimal('per_unit_delivery_charge_after_first_unit_inside_dhaka', 10, 2)->default(0);
            $table->decimal('per_unit_delivery_charge_after_first_unit_outside_dhaka', 10, 2)->default(0);
            $table->unsignedBigInteger('courier_id')->nullable();
            $table->foreign('courier_id')->references('id')->on('couriers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            //
        });
    }
};
