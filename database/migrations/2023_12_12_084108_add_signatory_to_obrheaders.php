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
            $table->string('signatory1')->after('particulars');
            $table->string('position1')->after('signatory1');
            $table->string('signatory2')->after('position1');
            $table->string('position2')->after('signatory2');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('obrheaders', function (Blueprint $table) {
            $table->dropColumn('signatory1');
            $table->dropColumn('position1');
            $table->dropColumn('signatory2');
            $table->dropColumn('position2');
        });
    }
};
