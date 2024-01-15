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
            CREATE VIEW vw_budgetallotments
            AS
            SELECT 	t1.id,
            t1.office_id,
            t2.officename,
            t3.accountid,
            t3.accountcode,
            t3.accountdesc,
            t1.amount as allotted, 
            (SELECT IFNULL(SUM(t4.amount),0) FROM vw_obr t4 
            where t3.accountid = t4.accountid 
            and t4.officeid=t1.office_id
            and t4.obrstatus='Approved') as utilized,

            (t1.amount - (SELECT IFNULL(SUM(t4.amount),0) FROM vw_obr t4 
            where t3.accountid = t4.accountid 
            and t4.officeid=t1.office_id
            and t4.obrstatus='Approved')) as remaining

            FROM budgetallotments t1
            LEFT JOIN vw_offices t2 ON t1.office_id=t2.officeid
            LEFT JOIN vw_accounts t3 ON t3.accountid = t1.account_id

       ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vwbudgetalloments_view');
    }
};
