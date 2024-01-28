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
        Schema::create('obrheaders', function (Blueprint $table) {
            $table->id();
            $table->string('payee');
            $table->unsignedBigInteger('officeid');
            $table->foreign('officeid')->references('id')->on('offices');
            $table->text('particulars');
            $table->string('signatory1');
            $table->string('posistion1');
            $table->string('signatory2');
            $table->string('posistion2');
            $table->string('obrstatus');
            $table->string("ispaid");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obrheaders');
    }
};
