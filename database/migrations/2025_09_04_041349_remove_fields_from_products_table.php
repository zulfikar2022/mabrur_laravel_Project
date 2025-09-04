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
             $table->dropColumn(['has_custom_delivery_charge', 'per_unit_amount_in_gram','first_unit_amount_in_gram', 'per_unit_delivery_charge_after_first_unit_inside_dhaka', 'per_unit_delivery_charge_after_first_unit_outside_dhaka']);
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
