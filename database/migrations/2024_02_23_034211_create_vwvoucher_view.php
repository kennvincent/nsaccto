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
        Schema::create('vwvoucher_view', function (Blueprint $table) {
            \DB::statement("
                CREATE VIEW vw_voucher AS
                SELECT
                    t1.id,
                    t1.obrnumber,
                    t1.payee,
                    t1.explanation,
                    t1.address,
                    t1.obramount,
                    t1.bank,
                    t1.signatory1,
                    t1.signatory1position,
                    t1.signatory2,
                    t1.signatory2position,
                    t1.signatory3,
                    t1.signatory3position,
                    t2.description,
                    t2.amount
                    FROM vouchers t1
                    LEFT JOIN voucherdeductions t2 ON t1.id = t2.voucher_id
            ");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vwvoucher_view');
    }
};
