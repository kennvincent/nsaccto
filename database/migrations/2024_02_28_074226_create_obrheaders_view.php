<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        \DB::statement("
            CREATE VIEW vw_obrheaders 
            AS
            SELECT
            t1.id,
            t1.obrnumber,
            t1.payee,
            t1.particulars,
            t1.obryear,
            t1.officeid,
            t2.officecode,
            t2.officename,
            t2.officedesc,
            t1.address,
            (SELECT SUM(t3.amount) FROM obrdetails t3 WHERE t1.id=t3.obrid) as totalamount,
            IFNULL((SELECT SUM(t4.amountpaid) FROM vw_payments t4 WHERE t1.id=t4.obrid),0) as totalamountpaid,
            IFNULL((SELECT SUM(t5.amount) FROM obrdetails t5 WHERE t1.id=t5.obrid) - IFNULL((SELECT SUM(t6.amountpaid) FROM vw_payments t6 WHERE t1.id=t6.obrid),0),0) as balance,
            CASE 
                WHEN t1.obrstatus='0' THEN 'Cancelled'
                WHEN t1.obrstatus='1' THEN 'For Approval'
                WHEN t1.obrstatus='2' THEN 'Approved'
                WHEN t1.obrstatus='3' THEN 'Obligated'
                WHEN t1.obrstatus='4' THEN 'Rejected'
            END AS obrstatus,
            withvoucher
            FROM obrheaders t1
            LEFT JOIN offices t2 ON t1.officeid=t2.id
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        \DB::statement($this->dropView());
    }
};
