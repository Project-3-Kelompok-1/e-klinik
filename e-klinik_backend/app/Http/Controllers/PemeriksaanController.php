<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Pemeriksaan;
use Illuminate\Http\Request;

class PemeriksaanController extends Controller
{
    public function index()
    {
        $pemeriksaan = Pemeriksaan::with(['diagnosis', 'penanganan_pasien', 'resep'])->get();
        return response()->json([
            'pemeriksaan' => $pemeriksaan
        ]);
    }
}
