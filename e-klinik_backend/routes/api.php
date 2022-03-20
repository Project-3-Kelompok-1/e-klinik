<?php

use App\Http\Controllers\AkunController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::post('/register', [AkunController::class, 'register']);
Route::controller(AkunController::class)->group(function () {
    Route::post("/register", 'register');
    Route::post("/login", 'login');
});
// Route::middleware('auth:sanctum')->group(function(){
//     Route::get("/user", function(){
//         return response()->json([
//             'message' => "Hello Wolrd"
//         ]);
//     });
// });
Route::get("/hello", function(){
    return response()->json([
        'message' => "Hello World"
    ]);
});
