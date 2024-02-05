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
        Schema::create('paymentdetails', function (Blueprint $table) {
            $table->id();
            $table->integer('obr_detail_id');
            $table->string('accountcode');
            $table->decimal('amountpaid',18,2);
            $table->unsignedBigInteger('paymentid');
            $table->foreign('paymentid')->references('id')->on('paymentheaders');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paymentdetails');
    }
};
