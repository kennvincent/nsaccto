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

Route::get('obligationrequest',[ObligationRequestController::class,'viewlist']);
Route::get('obligationrequest/{officename}',[ObligationRequestController::class,'viewofficeobrlist']);
Route::get('obligationrequest/budget/forapprovalobr/view',[ObligationRequestController::class,'foraprrovalobr']);
Route::get('obligationrequest/budget/approvedobr/view',[ObligationRequestController::class,'approvedobr']);
Route::get('obligationrequest/budgetview/selected/{id}',[ObligationRequestController::class,'viewobr']);
Route::get('obligationrequest/budgetview/selected/sum/{id}',[ObligationRequestController::class,'sum']);
Route::get('obligationrequest/budgetview/selected/approve/{id}',[ObligationRequestController::class,'approve']);

Route::get('obligationrequest/officeapprove/{id}',[ObligationRequestController::class,'officeapprove']);
Route::get('obligationrequest/officecancel/{id}',[ObligationRequestController::class,'officecancel']);

Route::get('obligationrequest/budgetview/selected/reject/{id}',[ObligationRequestController::class,'reject']);
Route::get('obligationrequest/printpreview/{id}',[ObligationRequestController::class,'printpreview']);
Route::get('obligationrequest/obrsum/{id}',[ObligationRequestController::class,'obrsum']);

Route::get('obligationrequest/accountingview',[ObligationRequestController::class,'accountingviewlist']);

Route::post('register',[RegisterController::class,'register']);
Route::post('login',[LoginController::class,'login']);
Route::get('login/{username}',[LoginController::class,'currentuser']);

Route::post('import',[BudgetImportController::class,'import']);
Route::get('budgets',[BudgetImportController::class,'display']);

Route::get('displayofficebudget/{officename}',[BudgetController::class,'officebudget']);
Route::get('getaccounts/{officename}',[BudgetController::class,'accountsperoffice']);
Route::get('getaccount/{id}',[BudgetController::class,'getaccount']);

Route::get('budget/view',[BudgetController::class,'samplebudget']);