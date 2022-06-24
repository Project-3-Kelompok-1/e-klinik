<?php

namespace App\Http\Controllers;

use App\Http\Traits\ResponseTrait;
use App\Models\Appointment;
use App\Models\Pemeriksaan;
use Illuminate\Http\Request;

class PemeriksaanController extends Controller
{
    use ResponseTrait;
    public function index()
    {
        $pemeriksaan = Pemeriksaan::with(['diagnosis', 'penanganan_pasien', 'resep'])->get();
        return response()->json([
            'pemeriksaan' => $pemeriksaan
        ]);
    }
    public function show($id_appoinment)
    {
        // 1. Cari data peeriksaan berdasarkan id_appointments
        $pemeriksaan = Pemeriksaan::with(['diagnosis', 'penanganan_pasien', 'resep'])->where('id_appointment', $id_appoinment)->first();
        // 2. Response
        $response = [
            'status' => 'success',
            'pemeriksaan' => $pemeriksaan
        ];
        return $this->responseSuccess($response);
    }
}
