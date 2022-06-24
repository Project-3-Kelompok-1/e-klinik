<?php

namespace App\Http\Controllers;

use App\Http\Traits\ResponseTrait;
use App\Models\Appointment;
use App\Models\Pemeriksaan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

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
    public function validation(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'planning' => ['required', 'string', 'max:255'],
            'keputusan' => ['required', 'string', 'max:255'],
            'amnanesta' => ['required', 'string'],
            'id_appointment' => ['required', Rule::exists('appointment', 'id')]
        ]);
        if ($validation->fails()) {
            return $this->responseErrorMessages($validation->messages());
        }
        return true;
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
    public function store(Request $request)
    {
        // 1. Validasi request
        $validation = $this->validation($request);
        // Jika validasi gagal
        if ($validation !== true) {
            return $validation;
        }
        // 2. Create or Update data pemeriksaan
        $request->request->add([
            'tgl_periksa' => Carbon::now()->format('Y-m-d'),
            'jam_periksa' => Carbon::now()->format('H:i:s'),
        ]);
        $pemeriksaan = Pemeriksaan::updateOrCreate(
            ['id_appointment' => $request->id_appointment],
            $request->all()
        );
        // 3. Response 
        $response = [
            'status' => 'success',
            'message' => 'Berhasil menyimpan data pemeriksaan',
            'id' => $pemeriksaan->id
        ];
        return $this->responseSuccess($response);
    }
}
