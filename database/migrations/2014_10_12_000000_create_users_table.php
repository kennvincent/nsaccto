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
        Schema::create('users', function (Blueprint $table) {
            //UPDATE 01/24/2023 1:51PM
            $table->id();
            $table->string('username');
            $table->string('password');
            $table->string('lastname');
            $table->string('firstname');
            $table->string('usertype');
            $table->string('office_id');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
