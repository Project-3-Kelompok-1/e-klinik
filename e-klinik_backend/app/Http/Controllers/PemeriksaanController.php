<?php

namespace App\Http\Controllers;

use App\Http\Traits\ResponseTrait;
use App\Models\Appointment;
use App\Models\Pemeriksaan;
use App\Models\PenangananPasien;
use App\Models\Resep;
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
    public function validaion_penanganan(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'id_pemeriksaan' => ['required', Rule::exists('pemeriksaan', 'id')],
            'tindakan_penanganan' => ['required', 'string'],
            'nama_obat' => ['required', 'array', 'min:1'],
            'jumlah_obat' => ['required', 'array', 'min:1'],
            'dosis_konsumsi' => ['required', 'array', 'min:1'],
            'nama_obat.*' => ['required', 'string', 'max:255'],
            'jumlah_obat.*' => ['required', 'integer', 'min:1'],
            'dosis_konsumsi.*' => ['required', 'string'],
        ]);
        if ($validation->fails()) {
            return $this->responseErrorMessages($validation->messages());
        }
        if (sizeof($request->nama_obat) != sizeof($request->jumlah_obat) || sizeof($request->nama_obat) != sizeof($request->dosis_konsumsi)) {
            $response = [
                'status' => 'failed',
                'message' => 'Semua kolom resep obat wajib diisi'
            ];
            return $this->responseFailed($response, 400);
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
    public function penanganan(Request $request)
    {
        // 1. Validasi request
        $isValid = $this->validaion_penanganan($request);
        // Jika validasi gagal
        if ($isValid !== true) {
            return $isValid;
        }
        // 2. Menyimpan tindakan penanganan
        PenangananPasien::updateOrCreate(
            ['id_pemeriksaan' => $request->id_pemeriksaan],
            $request->all()
        );
        // 3. Menyimpan semua data resep obat
        // Hapus semua resep berdasarkan id_pemeriksaan
        Resep::where('id_pemeriksaan', $request->id_pemeriksaan)->delete();
        for ($i = 0; $i < sizeof($request->nama_obat); $i++) {
            Resep::create([
                'id_pemeriksaan' => $request->id_pemeriksaan,
                'nama_obat' => $request->nama_obat[$i],
                'jumlah_obat' => $request->jumlah_obat[$i],
                'dosis_konsumsi' => $request->dosis_konsumsi[$i]
            ]);
        }
        // 4. Response
        $response = [
            'status' => 'success',
            'message' => 'Berhasil menyimpan pemeriksaan'
        ];
        return $this->responseSuccess($response);;
    }
}
