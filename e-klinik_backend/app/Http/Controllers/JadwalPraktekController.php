<?php

namespace App\Http\Controllers;

use App\Models\JadwalPraktek;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\ResponseTrait;
use App\Models\Dokter;

class JadwalPraktekController extends Controller
{
    use ResponseTrait;
    protected function validasi($request)
    {
        return Validator::make($request->all(), [
            'id_dokter' => ['required'],
            'tgl_praktek' => ['required', 'date_format:Y-m-d'],
            'jam_mulai' => ['required', 'date_format:H:i:s'],
            'jam_selesai' => ['required', 'date_format:H:i:s', 'after:jam_mulai'],
            'status' => ['required']
        ]);
    }
    public function index(Request $request)
    {
        $jadwalPraktek = JadwalPraktek::whereBetween('tgl_praktek', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->get();
        return response()->json([
            'jadwal_praktek' => $jadwalPraktek
        ]);
    }
    public function store(Request $request)
    {
        // 1. Valdasi request
        $validator = $this->validasi($request);
        // Validasi gagal
        if ($validator->fails()) {
            $response = [
                'status' => 'validation failed',
                'errors' => $validator->failed()
            ];
            return $this->responseFailed($response, 400);
        }

        // 2. Cari data dokter
        $dokter = Dokter::find($request->id_dokter);
        // Dokter tidak ditemukan
        if (!$dokter) {
            $response = [
                'status' => 'failed',
                'message' => 'Dokter tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 3. Simpan jadwal baru
        JadwalPraktek::create($request->all());
        $response = [
            'status' => 'success',
            'message' => 'Jadwal berhasil ditambahkan'
        ];
        return $this->responseSuccess($response);
    }
    public function update(Request $request, $id)
    {
        // 1. Validasi request
        $validator = $this->validasi($request);
        // Validasi gagal
        if ($validator->fails()) {
            $response = [
                'status' => 'validation failed',
                'errors' => $validator->failed()
            ];
            return $this->responseFailed($response, 400);
        }

        // 2. Cari jadwal & update
        $jadwal = JadwalPraktek::find($id)->update($request->all());
        // Jadwal tidak ditemukan
        if (!$jadwal) {
            $response = [
                'status' => 'failed',
                'message' => 'Jadwal tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        $response = [
            'status' => 'success',
            'message' => 'Jadwal berhasil diupdate'
        ];
        return $this->responseSuccess($response);
    }
    public function detail($id)
    {
        // 1. Cari jadwal berdasarkan id
        $jadwal = JadwalPraktek::find($id);

        // 2. Cari relasi dokter nya
        $jadwal['dokter'] = $jadwal->dokter;
        // Jadwal tidak ditemukan
        if (!$jadwal) {
            $response = [
                'status' => 'failed',
                'message' => 'Jadwal tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // Jadwal ditemukan
        $response = [
            'status' => 'success',
            'jadwal_detail' => $jadwal
        ];
        return $this->responseSuccess($response);
    }
    public function destroy($id)
    {
        // 1. Cari jadwal
        $hapus = JadwalPraktek::find($id);
        if (!$hapus) {
            $response = [
                'status' => 'failed',
                'message' => 'Jadwal tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 2. Hapus jadwal
        $hapus->delete();
        $response = [
            'status' => 'success',
            'message' => 'Jadwal berhasil dihapus'
        ];
        return $this->responseSuccess($response);
    }
}
