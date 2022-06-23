<?php

namespace App\Http\Controllers;

use App\Http\Traits\ResponseTrait;
use App\Models\Appointment;
use App\Models\JadwalPraktek;
use App\Models\Pasien;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
    private $status = [
        'mendaftar',
        'menunggu',
        'diperiksa',
        'selesai'
    ];
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
    public function todays_registration(Request $request)
    {
        // 1. Cari data appointment yang memiliki status mendaftar dan jadwal hari ini
        $appointment = Appointment::join('jadwal_praktek', 'appointment.id_jadwal_praktek', '=', 'jadwal_praktek.id')
            ->join('pasien', 'appointment.nik_pasien', '=', 'pasien.nik')
            ->where('appointment.status', 'mendaftar')
            ->where('pasien.nik', 'LIKE', '%' . $request->search . '%')
            ->orWhere(DB::raw("CONCAT(`nama_depan`, ' ', `nama_belakang`)"), 'LIKE', '%' . $request->search . '%')
            ->whereDate('jadwal_praktek.tgl_praktek', Carbon::today())
            ->select('appointment.id', 'appointment.waktu_pesan', 'pasien.nik', 'pasien.nama_depan', 'pasien.nama_belakang', 'pasien.usia', 'pasien.jenis_kelamin')
            ->get();
        // 2. Response 
        $response = [
            'status' => 'success',
            'todays_appointment' => $appointment
        ];
        return $this->responseSuccess($response);
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
        } else {
            // Gagal menghapus
            $response = [
                'status' => 'failed',
                'message' => 'Gagal menghapus pendaftaran'
            ];
            return $this->responseFailed($response);
        }
    }
    public function change_status($id)
    {

        // 1. Cari data appointment berdasarkan id
        $appointment = Appointment::where('id', $id)->where('status', '<>', 'selesai')->first();
        // Jika appointment tidak ditemukan
        if (!$appointment) {
            $response = [
                'status' => 'fialed',
                'message' => 'Appointment tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 2. Ubah status menjadi menunggu
        foreach ($this->status as $key => $value) {
            if ($value === $appointment->status) {
                $appointment->update([
                    'status' => $this->status[$key + 1]
                ]);
                break;
            }
        }
        // 3. Response
        $response = [
            'status' => 'success',
            'message' => 'Appointment berhasil di update'
        ];
        return $this->responseSuccess($response);
    }
    public function update_status(Request $request, $id)
    {
        // 1. Validasi request
        $validation = Validator::make($request->all(), [
            'status' => ['required', 'string', Rule::in(['menunggu', 'diperiksa', 'selesai'])]
        ]);
        // Jika validasi gagal
        if ($validation->fails()) {
            return $this->responseErrorMessages($validation->messages());
        }
        // 2. Cari appointment berdasarkan id
        $appointment = Appointment::find($id);
        // Jika appointment tidak ditemukan
        if (!$appointment) {
            $response = [
                'status' => 'failed',
                'message' => 'Appointmetn tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 3. Update appointment
        $appointment->update([
            'status' => $request->status
        ]);
        // 4. Response
        $response = [
            'status' => 'success',
            'message' => 'Status berhasil di update'
        ];
        return $this->responseSuccess($response);
    }
}
