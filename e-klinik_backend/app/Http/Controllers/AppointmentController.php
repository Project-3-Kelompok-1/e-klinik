<?php

namespace App\Http\Controllers;

use App\Http\Traits\ResponseTrait;
use App\Models\Appointment;
use App\Models\JadwalPraktek;
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
    public function index(Request $request)
    {
        // 1. Cari data pasien
        $pasien = $request->user()->pasien;
        // 2. Cari data appointment
        if ($pasien) {
            $appointment = JadwalPraktek::join('appointment', 'appointment.id_jadwal_praktek', '=', 'jadwal_praktek.id')
                ->where('appointment.nik_pasien', $pasien->nik)
                ->get(
                    [
                        'appointment.id',
                        'appointment.waktu_pesan',
                        'appointment.konsultasi',
                        'appointment.status',
                        'jadwal_praktek.tgl_praktek',
                        'jadwal_praktek.jam_mulai',
                        'jadwal_praktek.jam_selesai'
                    ]
                );
            return response()->json([
                'status' => 'success',
                'appointment' => $appointment
            ]);
        }
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
    public function destroy(Request $request, $id)
    {
        // 1. Cari data appointment
        $appointment = Appointment::find($id);
        // 2. Bandingkan nik_pasien dengan user pasien yang mengakses
        if ($appointment && ($appointment->nik_pasien == $request->user()->pasien->nik)) {
            // 3. Hapus appointment
            $appointment->delete();
            $response = [
                'status' => 'success',
                'message' => 'Berhasil menghapus pendaftaran'
            ];
            // 4. Response
            return $this->responseSuccess($response);
        }
        else {
            // Gagal menghapus
            $response = [
                'status' => 'failed',
                'message' => 'Gagal menghapus pendaftaran'
            ];
            return $this->responseFailed($response);
        }
    }
}
