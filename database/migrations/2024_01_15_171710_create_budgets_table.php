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
        Schema::create('budgets', function (Blueprint $table) {
            $table->id();
            $table->string('office');
            $table->text('particulars');
            $table->string('accountcode');
            $table->integer('budgetyear');
            $table->decimal('proposedamount',18,2)->nullable();
            $table->string('accountclassification')->nullable();
            $table->string('funding')->nullable();
            $table->string('sector')->nullable();
            $table->string('budgetstatus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budgets');
    }
};
