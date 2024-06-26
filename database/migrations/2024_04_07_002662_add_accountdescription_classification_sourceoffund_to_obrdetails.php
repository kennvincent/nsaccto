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
        Schema::table('obrdetails', function (Blueprint $table) {
            $table->text('accountdesc')->after('id');
            $table->text('accountclassification')->nullable()->after('accountdesc');
            $table->text('funding')->after('accountclassification');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('obrdetails', function (Blueprint $table) {
            $table->dropColumn('accountdesc');
            $table->dropColumn('accountclassification');
            $table->dropColumn('funding');
        });
    }
};
