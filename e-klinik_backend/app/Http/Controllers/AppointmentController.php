<?php

namespace App\Http\Controllers;

use App\Http\Traits\ResponseTrait;
use App\Models\Appointment;
use App\Models\Pasien;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
{
    use ResponseTrait;
    /**
     * STATUS APPOINTMENT
     * 1. mendaftar
     * 2. periksa
     * 3. menunggu transaksi
     * 4. selesai
     */
    private function validation($request)
    {
        return Validator::make($request->all(), [
            'nik_pasien' => ['required', 'max:255'],
            'id_jadwal_praktek' => ['required', Rule::exists('jadwal_praktek', 'id')],
        ]);
    }
    private function findPasien($nik_pasien)
    {
        if (!Pasien::find($nik_pasien)) {
            $response = [
                'status' => 'failed',
                'message' => 'Pasien tidak terdaftar'
            ];
            return $this->responseFailed($response);
        }
        return false;
    }
    protected function validationAppointment($nik_pasien)
    {
        # code...
        $appointment = Appointment::where('nik_pasien', $nik_pasien)->where('status', '<>', 'selesai')->first();
        if ($appointment) {
            $response = [
                'status' => 'failed',
                'message' => 'Anda sudah melakukan pendaftaran'
            ];
            return $this->responseFailed($response, 400);
        }
        return false;
    }
    public function store(Request $request)
    {
        // 1. Validasi request
        $validasi = $this->validation($request);
        // Jika validas gagal
        if ($validasi->fails()) {
            return $this->responseValidationFailed($validasi);
        }
        // 2. Cari data pasien
        $not_found_pasien = $this->findPasien($request->nik_pasien);
        if ($not_found_pasien) return $not_found_pasien;

        // 3. Check apakah masih ada appointment yang status nya belum selesai
        $already_appointment = $this->validationAppointment($request->nik_pasien);
        if ($already_appointment) return $already_appointment;

        // 4. Membuat appointment
        Appointment::create([
            'nik_pasien' => $request->nik_pasien,
            'id_jadwal_praktek' => $request->id_jadwal_praktek,
            'konsultasi' => $request->konsultasi,
            'waktu_pesan' => Carbon::now(),
            'status' => 'mendaftar'
        ]);
        // 5. Melakukan response
        $response = [
            'status' => 'success',
            'message' => 'Berhasil melakukan pendaftaran'
        ];
        return $this->responseSuccess($response);
    }
}