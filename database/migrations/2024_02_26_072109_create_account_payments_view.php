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
            CREATE VIEW vw_accountspaymnents
            AS
            SELECT 
                t1.id,
                t1.accountdesc,
                t1.accountcode,
                IFNULL((SELECT SUM(t2.amountpaid) FROM paymentdetails t2 WHERE t1.accountcode=t2.accountcode),0) as total
            FROM accounts t1
       ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_payments_view');
    }
};
