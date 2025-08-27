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
        Schema::table('delivery_charges', function (Blueprint $table) {
            $table->integer('dhaka_one_gram_to_150_gram')->unsigned()->default(0);
            $table->integer('dhaka_151_gram_to_500_gram')->unsigned()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('delivery_charges', function (Blueprint $table) {
            //
        });
    }
};
