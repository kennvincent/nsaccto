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
            CREATE VIEW vw_users
            AS
            SELECT 
            t1.id,
            t1.username,
            t1.lastname,
            t1.firstname,
            t1.usertype,
            t1.email,
            t1.office_id,
            t2.officecode,
            t2.officename,
            t2.officedesc,
            t2.officeaddress,
            t2.authorizedpersonnel,
            t2.position
            FROM users t1 
            LEFT JOIN offices t2 
            ON t1.office_id = t2.id
        ");
    }

    /**
     * Reverse the migrations.
     */
    
    public function down(): void
    {
        Schema::dropIfExists('user_view');
    }

};
