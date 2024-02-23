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
            $table->string('obrnumber')->nullable();
            $table->unsignedBigInteger('officeid');
            $table->foreign('officeid')->references('id')->on('offices');
            $table->text('particulars');
            $table->string('obryear');
            $table->string('signatory1');
            $table->string('position1');
            $table->string('signatory2');
            $table->string('position2');
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
