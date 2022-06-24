<?php

use App\Http\Controllers\AkunController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DokterController;
use App\Http\Controllers\JadwalPraktekController;
use App\Http\Controllers\ObatController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\PemeriksaanController;
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
Route::get('/pemeriksaan', [PemeriksaanController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::post('/register', [AkunController::class, 'register']);
Route::controller(AkunController::class)->group(function () {
    Route::post("/register", 'register');
    Route::post("/login", 'login');
    // Route::get('/logout', 'logout');
});
Route::get('/dokter', [DokterController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {
    // Sanctum auth
    Route::get('/logout', [AkunController::class, 'logout']);
    Route::get('/my-role', [AkunController::class, 'getRole']);

    // Pasien endpoints
    Route::get('/pasien', [PasienController::class, 'index'])->middleware('isAdmin');
    Route::post('/pasien/profile', [PasienController::class, 'store']);
    Route::get('/pasien/profile', [PasienController::class, 'show']);
    Route::delete('/pasien', [PasienController::class, 'destroy'])->middleware('isAdmin');

    // Kelola dokter

    Route::middleware('isAdmin')->group(function () {
        Route::post("/tambah_dokter", [DokterController::class, 'add']);
        Route::delete('/dokter/hapus/{id}', [DokterController::class, 'destroy']);
        Route::post('/dokter/update/{id}', [DokterController::class, 'update']);
    });

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
        Route::post('/data-obat/update/{id}', [ObatController::class, 'update']);
    });
    // Appointment
    Route::get('/appointment/todays_registration', [AppointmentController::class, 'todays_registration'])->middleware('isAdmin');
    Route::get('/appointment/todays_waiting', [AppointmentController::class, 'todays_waiting'])->middleware('isAdmin');
    Route::get('/appointment/todays_checking', [AppointmentController::class, 'todays_checking'])->middleware('isAdmin');
    Route::patch('/appointment/update_status/{id}', [AppointmentController::class, 'update_status'])->middleware('isAdmin');
    Route::post('/appointment/offline_registration', [AppointmentController::class, 'offline_registration'])->middleware('resepsionis');
    Route::delete('/appointment/{id}', [AppointmentController::class, 'destroy']);

    // Route::post('/appointment', [AppointmentController::class, 'store'])->middleware('isPasien');
    Route::middleware('isPasien')->group(function () {
        Route::get('/appointment', [AppointmentController::class, 'index']);
        Route::post('/appointment', [AppointmentController::class, 'store']);
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