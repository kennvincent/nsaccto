<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BudgetAllotmentController;
use App\Http\Controllers\ObligationRequestController;
use App\Http\Controllers\TempObligationRequestController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\BudgetImportController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SignatoriesController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('accounts',[AccountsController::class,'index']);
Route::post('account',[AccountsController::class,'insert']);
Route::get('account/{id}',[AccountsController::class,'edit']);
Route::put('account/update',[AccountsController::class,'update']);

Route::get('offices',[OfficeController::class,'index']);
Route::post('office',[OfficeController::class,'insert']);
Route::get('office/{id}',[OfficeController::class,'edit']);
Route::get('office/search/{id}',[OfficeController::class,'search']);
Route::put('office/update',[OfficeController::class,'update']);


Route::get('budgetallotment',[BudgetAllotmentController::class,'index']);
Route::get('budgetalloted/{yr}',[BudgetAllotmentController::class,'allbudget']);
Route::get('budgetallotment/{id}',[BudgetAllotmentController::class,'officebudget']);
Route::post('budgetallotment',[BudgetAllotmentController::class,'insert']);


//Route::put('employee/{id}/edit',[EmployeeController::class,'update']);


Route::get('tempobligationrequest/{id}',[TempObligationRequestController::class,'index']);
Route::get('tempobligationrequest/sum/{id}',[TempObligationRequestController::class,'sum']);
Route::post('tempobligationrequest',[TempObligationRequestController::class,'insert']);
Route::delete('tempobligationrequest/{id}',[TempObligationRequestController::class,'delete']);

Route::get('getobryear',[ObligationRequestController::class,'getobryear']);
Route::post('obligationrequest',[ObligationRequestController::class,'insert']);

Route::get('obligationrequest/getobrid',[ObligationRequestController::class,'getobrid']);
Route::get('obligationrequest',[ObligationRequestController::class,'viewlist']);
Route::get('obligationrequest/viewapprovedlist',[ObligationRequestController::class,'viewapprovedlist']);

Route::get('obligationrequest/edit/{id}',[ObligationRequestController::class,'editpreview']);
Route::get('obligationrequest/edit/details/{id}',[ObligationRequestController::class,'editdetailspreview']);
Route::get('obligationrequest/getheader/{id}',[ObligationRequestController::class,'getobrheader']);
Route::get('obligationrequest/getdetails/{id}',[ObligationRequestController::class,'getobrdetails']);
Route::put('obligationrequest/update/{id}',[ObligationRequestController::class,'updateobr']);
Route::get('obligationrequest/viewall/forapproval',[ObligationRequestController::class,'viewallforapprovalobrlist']);
Route::get('obligationrequest/viewall/officeapproved',[ObligationRequestController::class,'viewallofficeapprovedobrlist']);
Route::get('obligationrequest/{officename}',[ObligationRequestController::class,'viewofficeobrlist']);
Route::post('obligationrequest/searchbypayee',[ObligationRequestController::class,'viewbypayee']);
Route::get('obligationrequest/searchbyofficepayee/{payee}',[ObligationRequestController::class,'viewbyofficepayee']);

Route::get('obligationrequest/officeapproved/searchbypayee/{payee}',[ObligationRequestController::class,'approvedviewbypayee']);


Route::get('obligationrequest/budget/forapprovalobr/view',[ObligationRequestController::class,'foraprrovalobr']);
Route::get('obligationrequest/budget/forapprovalobr/office/{officename}',[ObligationRequestController::class,'budgetforaprrovalobr']);
Route::get('obligationrequest/budget/forapprovalobr/searchbypayee/{payee}',[ObligationRequestController::class,'budgetsearchbypayee']);

Route::get('obligationrequest/budget/approvedobr/view',[ObligationRequestController::class,'approvedobr']);
Route::get('obligationrequest/budgetview/selected/{id}',[ObligationRequestController::class,'viewobr']);
Route::get('obligationrequest/budgetview/selected/sum/{id}',[ObligationRequestController::class,'sum']);

// Route::get('obligationrequest/budgetview/selected/approve/{id}',[ObligationRequestController::class,'approve']);
Route::put('obligationrequest/budgetview/selected/approve',[ObligationRequestController::class,'approve']);


Route::get('obligationrequest/officeapprove/{id}',[ObligationRequestController::class,'officeapprove']);
Route::post('obligationrequest/officeapproveallobr',[ObligationRequestController::class,'officeapproveallobr']);
Route::post('obligationrequest/budgetapproveallobr',[ObligationRequestController::class,'budgetapproveall']);
Route::get('obligationrequest/officecancel/{id}',[ObligationRequestController::class,'officecancel']);

Route::put('obligationrequest/budgetview/selected/reject',[ObligationRequestController::class,'reject']);
Route::get('obligationrequest/printpreview/{id}',[ObligationRequestController::class,'printpreview']);
Route::get('obligationrequest/budgetview/rejectedobr',[ObligationRequestController::class,'rejectedobr']);
Route::get('obligationrequest/obrsum/{id}',[ObligationRequestController::class,'obrsum']);

Route::get('obligationrequest/accounting/payable/view',[ObligationRequestController::class,'accountingviewlist']);
Route::get('obligationrequest/accounting/paid/view',[ObligationRequestController::class,'accountingviewobrpaidlist']);
Route::get('obligationrequest/accounting/selectedoffice/view/{id}',[ObligationRequestController::class,'accountingviewlistselectedoffice']);
Route::get('obligationrequest/accounting/selectedpayee/view/{payee}',[ObligationRequestController::class,'accountingviewlistselectedpayee']);

Route::get('obligationrequest/accounting/selected/view/{id}',[ObligationRequestController::class,'accountingselectedviewobr']);
Route::get('obligationrequest/accounting/getobrforpayment/{id}',[ObligationRequestController::class,'getobrforpayment']);
Route::post('obligationrequest/accounting/payment',[ObligationRequestController::class,'savepayment']);

Route::get('obrtoexcel/{yr}',[ObligationRequestController::class,'obrtoexcel']);
Route::get('obrtoexcel/bydate/{dt}',[ObligationRequestController::class,'obrtoexcelbydate']);

Route::get('signatories',[SignatoriesController::class,'getsignatories']);

Route::post('register',[RegisterController::class,'register']);
Route::post('login',[LoginController::class,'login']);
Route::get('login/{username}',[LoginController::class,'currentuser']);

Route::post('import',[BudgetImportController::class,'import']);
Route::get('budgets',[BudgetImportController::class,'display']);
Route::get('budgets/officebudget/accounts/{officename}',[BudgetImportController::class,'officeaccounts']);
Route::get('budgets/available',[BudgetImportController::class,'getavailablebudget']);

Route::get('getallbudgetyear/{year}',[BudgetController::class,'allbudgetyear']);
Route::get('displayofficebudget/{officename}',[BudgetController::class,'officebudget']);
Route::get('getaccounts/{officename}',[BudgetController::class,'accountsperoffice']);
Route::get('getaccount/{id}',[BudgetController::class,'getaccount']);
Route::post('budgetaugmentation/save',[BudgetController::class,'saveaugmentation']);
Route::get('budgetaugmentation/list/{yr}',[BudgetController::class,'displayaugmentationlist']);
Route::get('budgetaugmentation/list/{yr}/{office}',[BudgetController::class,'displayaugmentationlistbyoffice']);
Route::get('budgetaugmentation/show/{id}',[BudgetController::class,'showselectedaugmentation']);
Route::get('budgetaugmentation/get/header/{id}',[BudgetController::class,'getselectedaugmentationheader']);
Route::get('budgetaugmentation/get/detail/{id}',[BudgetController::class,'getselectedaugmentationdetail']);
Route::put('budgetaugmentation/update/{id}',[BudgetController::class,'updateaugmentation']);
Route::get('budgetaugmentation/objectexpenditures/{office}/{fy}',[BudgetController::class,'objectexpenditures']);

Route::get('budget/view',[BudgetController::class,'samplebudget']);

Route::post('voucher',[VoucherController::class,'savevoucher']);
Route::put('voucher/obr/update',[VoucherController::class,'updateobr']);
Route::get('voucher/printpreview/{id}',[VoucherController::class,'printpreview']);
Route::get('voucher/deductions/{id}',[VoucherController::class,'voucherdeductions']);
Route::get('voucher/list',[VoucherController::class,'voucherslist']);
Route::get('voucher/{id}',[VoucherController::class,'selectedvoucher']);
Route::get('voucher/getobrvoucher/{id}',[VoucherController::class,'getobrvoucher']);
Route::get('voucher/getobrvoucher/header/{id}',[VoucherController::class,'getobrvoucherheadereditview']);
Route::get('voucher/getobrvoucher/deductions/{id}',[VoucherController::class,'getobrvouchereditdeductionsview']);
Route::put('voucher/update/{id}',[VoucherController::class,'updatevoucher']);

Route::get('payment/display',[PaymentController::class,'displaypayments']);
Route::get('utilization/display',[PaymentController::class,'utilization']);

