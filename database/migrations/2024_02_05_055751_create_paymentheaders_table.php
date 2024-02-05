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
        Schema::create('paymentheaders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('obrid');
            $table->foreign('obrid')->references('id')->on('obrheaders');
            $table->string('checknumber');
            $table->string('bankname');
            $table->integer('userid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paymentheaders');
    }
};
