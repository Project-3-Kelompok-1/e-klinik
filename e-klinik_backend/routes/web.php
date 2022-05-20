<?php

use App\Http\Controllers\ruang_rawat_inapController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




route::group(['middleware'=> 'auth'], function() {
    route::get('/ruang_rawat_inap/data', [ruang_rawat_inapController::class, 'data']);
    route::resource('/ruang_rawat_inap', [ruang_rawat_inapController::class]);
});