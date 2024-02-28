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
            t1.obrnumber,
            t3.id as obr_detail_id,
            t1.payee,
            t1.particulars,
            t1.officeid,
            t2.officecode,
            t2.officename,
            t2.officedesc,
            t1.address,
            t3.accountcode as accountcode1,
            t3.accountcode,
            t3.amount as amount1,
            t3.amount,
            t1.obryear,
            (SELECT SUM(t4.amount) FROM obrdetails t4 WHERE t1.id=t4.obrid) as totalamount,
            IFNULL((SELECT SUM(t5.amountpaid) FROM vw_payments t5 WHERE t1.id=t5.obrid AND t3.id=t5.obr_detail_id ),0) as paid,
            t3.amount - IFNULL((SELECT SUM(t6.amountpaid) FROM vw_payments t6 WHERE t3.id=t6.obr_detail_id),0) as balance1,
            t3.amount - IFNULL((SELECT SUM(t6.amountpaid) FROM vw_payments t6 WHERE t3.id=t6.obr_detail_id),0) as balance,
            IFNULL((SELECT SUM(t5.amountpaid) FROM vw_payments t5 WHERE t1.id=t5.obrid),0) as totalamountpaid,
            (SELECT SUM(t4.amount) FROM obrdetails t4 WHERE t1.id=t4.obrid) - 
            IFNULL((SELECT SUM(t5.amountpaid) FROM vw_payments t5 WHERE t1.id=t5.obrid),0) as totalbalance,
              CASE 
                WHEN t1.obrstatus='0' THEN 'Cancelled'
                WHEN t1.obrstatus='1' THEN 'For Approval'
                WHEN t1.obrstatus='2' THEN 'Approved'
                WHEN t1.obrstatus='3' THEN 'Obligated'
            END AS obrstatus,
            t1.withvoucher,
            t1.ispaid
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
