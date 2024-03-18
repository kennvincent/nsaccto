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
        //   2024_02_25_110234
            \DB::statement("
                CREATE VIEW vw_voucher 
                AS
                SELECT 
                t1.id,
                t1.obrnumber,
                t1.payee,
                t3.officename,
                t1.explanation,
                t1.address,
                t1.obramount,
                IFNULL(t1.checknumber,'') AS checknumber,
                t1.bank,
                t1.signatory1,
                t1.signatory1position,
                t1.signatory2,
                t1.signatory2position,
                t1.signatory3,
                t1.signatory3position,
                IFNULL(t2.description,'') AS description,
                IFNULL(t2.amount,0) AS amount
                FROM vouchers t1
                LEFT JOIN voucherdeductions t2 ON t1.id = t2.voucher_id
                LEFT JOIN vw_obrheaders t3 ON t1.obrnumber=t3.obrnumber
            ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vwvoucher_view');
    }
};
