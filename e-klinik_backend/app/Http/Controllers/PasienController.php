<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PasienController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $pasien = $user->pasien;
        return response()->json([
            'pasien' => $pasien
        ]);
    }
}
