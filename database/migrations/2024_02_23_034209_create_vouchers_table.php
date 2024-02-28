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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('obrnumber');
            $table->string('payee');
            $table->text('explanation');
            $table->text('address');
            $table->decimal('obramount',18,2);
            $table->string('bank');
            $table->string('signatory1');
            $table->string('signatory1position');
            $table->string('signatory2');
            $table->string('signatory2position');
            $table->string('signatory3');
            $table->string('signatory3position');
            $table->string('voucherstatus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
