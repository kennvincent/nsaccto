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
        Schema::table('obrheaders', function (Blueprint $table) {
            $table->string('ispaid')->after('obrstatus');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('obrheaders', function (Blueprint $table) {
            $table->droColumn('ispaid');
        });
    }
};
