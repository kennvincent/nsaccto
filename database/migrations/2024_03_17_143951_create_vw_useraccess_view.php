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
        \DB::statement("
            CREATE VIEW vw_useraccess
            AS
            SELECT t1.id,
                t1.username,
                t1.password,
                t2.officeid,
                t3.officename
            FROM users t1
            INNER JOIN useraccess t2 ON t1.id=t2.userid
            LEFT JOIN offices t3 ON t2.officeid=t3.id
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vw_useraccess_view');
    }
};
