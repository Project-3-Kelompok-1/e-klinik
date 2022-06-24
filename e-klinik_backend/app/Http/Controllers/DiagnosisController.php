<?php

namespace App\Http\Controllers;

use App\Http\Traits\ResponseTrait;
use App\Models\Diagnosis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class DiagnosisController extends Controller
{
    use ResponseTrait;
    public function validation(Request $request)
    {
        $validation  = Validator::make($request->all(), [
            'diagnosa_pasien' => ['required', 'array', 'min:1'],
            'diagnosa_pasien.*' => ['required', 'string', 'max:255'],
            'id_pemeriksaan' => ['required', Rule::exists('pemeriksaan', 'id')]
        ]);
        if ($validation->fails()) {
            return $this->responseErrorMessages($validation->messages());
        }
        return true;
    }
    public function store(Request $request)
    {
        // 1. Validasi request
        $validation = $this->validation($request);
        if ($validation !== true) {
            return $validation;
        }
        // 2. Cari dan hapus data diagnosis berdasarkan id_pemeriksaan
        Diagnosis::where('id_pemeriksaan', $request->id_pemeriksaan)->delete();
        // 3. Simpan data diagnosis
        foreach ($request->diagnosa_pasien as $key => $diagnosa_pasien) {
            Diagnosis::create([
                'id_pemeriksaan' => $request->id_pemeriksaan,
                'diagnosa_pasien' => $diagnosa_pasien
            ]);
        }
        // 4. Response
        $response = [
            'status' => 'success',
            'message' => 'Berhasil menyimpan diagnosa pasien'
        ];
        return $this->responseSuccess($response);
    }
}
