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
            CREATE VIEW vw_payments
            AS
            SELECT	t1.id,
                t1.obrid,
                t4.officename,
                t3.obryear,
                t3.officeid,
                t1.checknumber,
                t1.bankname,
                t2.obr_detail_id,
                t2.accountcode,
                t5.accountdesc,
                t2.amountpaid,
                month(t1.created_at) as payment_month,
                year(t1.created_at) as payment_year
        FROM paymentheaders t1
        INNER JOIN paymentdetails t2 ON t1.id=t2.paymentid
        INNER JOIN obrheaders t3 on t1.obrid=t3.id
        INNER JOIN offices t4 on t3.officeid=t4.id
        INNER JOIN accounts t5 on t2.accountcode=t5.accountcode
       ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vwpayments_view');
    }
};
