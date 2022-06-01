<?php

use App\Http\Controllers\AkunController;
use App\Http\Controllers\DokterController;
use App\Http\Controllers\JadwalPraktekController;
use App\Http\Controllers\ObatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::post('/register', [AkunController::class, 'register']);
Route::controller(AkunController::class)->group(function () {
    Route::post("/register", 'register');
    Route::post("/login", 'login');
});
Route::get('/dokter', [DokterController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    // Kelola dokter
    Route::post("/tambah_dokter", [DokterController::class, 'add']);
    Route::delete('/dokter/hapus/{id}', [DokterController::class, 'destroy']);
    Route::post('/dokter/update/{id}', [DokterController::class, 'update']);

    Route::get('/data-obat', [ObatController::class, 'index'])->middleware('isAdmin');
    Route::middleware('resepsionis')->group(function () {
        // Kelola jadwal praktek 
        Route::post('/jadwal-praktek/create', [JadwalPraktekController::class, 'store']);
        Route::post('/jadwal-praktek/update', [JadwalPraktekController::class, 'update']);
        Route::post('/jadwal-praktek/delete', [JadwalPraktekController::class, 'destroy']);

        // Kelola data obat
        Route::post('/data-obat/create', [ObatController::class, 'store']);
        Route::post('/data-obat/update/{id}', [ObatController::class, 'update']);
        Route::delete('/data-obat/delete/{id}', [ObatController::class, 'destroy']);
        Route::delete('/data-obat/delete', [ObatController::class, 'deleteSelected']);
    });
});
// Get semua jadwal praktek
Route::get('/jadwal-praktek', [JadwalPraktekController::class, 'index']);
// Get jadwal praktek selama 1 minggu
Route::get('/jadwal-praktek/seminggu', [JadwalPraktekController::class, 'seminggu']);
// Get jadwal praktek yang dimiliki dokter
Route::get('/jadwal-praktek/{id}', [JadwalPraktekController::class, 'detail']);

// Route::middleware('auth:sanctum')->group(function(){
//     Route::get("/user", function(){
//         return response()->json([
//             'message' => "Hello Wolrd"
//         ]);
//     });
// });
// Route::get("/hello", function () {
//     return response()->json([
//         'message' => "Hello World"
//     ]);
// });