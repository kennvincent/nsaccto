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
            CREATE VIEW vw_obr
            AS
            SELECT
            t1.id,
            t1.payee,
            t1.particulars,
            t2.officecode,
            t2.officename,
            t2.officedesc,
            t2.officeaddress,
            t3.accountcode,
            t3.amount,
            CASE 
                WHEN t1.obrstatus='0' THEN 'Cancelled'
                WHEN t1.obrstatus='1' THEN 'Pending'
                WHEN t1.obrstatus='2' THEN 'Approved'
            END AS obrstatus
            FROM obrheaders t1
            LEFT JOIN offices t2 ON t1.officeid=t2.id
            LEFT JOIN obrdetails t3 on t1.id = t3.obrid
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        \DB::statement($this->dropView());
    }
};
