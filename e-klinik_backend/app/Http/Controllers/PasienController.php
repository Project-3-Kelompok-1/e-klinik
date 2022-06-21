<?php

namespace App\Http\Controllers;

use App\Http\Traits\ResponseTrait;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PasienController extends Controller
{
    use ResponseTrait;
    private function validation($request)
    {
        return Validator::make($request->all(), [
            'nik' => ['required', 'size:16'],
            'nama_depan' => ['required', 'string', 'max:32'],
            'nama_belakang' => ['string', 'max:255'],
            'alamat_rumah' => ['required', 'string', 'min:32'],
            'usia' => ['required', 'integer', 'min:0'],
            'jenis_kelamin' => ['required', 'string', 'max:255'],
            'tempat_lahir' => ['required', 'string', 'max:32'],
            'tgl_lahir' => ['required', 'date_format:Y-m-d', 'before_or_equal:today'],
        ]);
    }
    public function index(Request $request)
    {
        // 1. Cari semua data pasien
        if ($request->search) {
            $pasien = Pasien::where('nik', 'LIKE', '%' . $request->search . '%')
                ->orWhere(DB::raw("CONCAT(`nama_depan`, ' ', `nama_belakang`)"), 'LIKE', '%' . $request->search . '%')
                ->get();
        } else {
            $pasien = Pasien::all();
        }
        // 2. Lakukan response
        $response = [
            'status' => 'success',
            'data_pasien' => $pasien
        ];
        return $this->responseSuccess($response);
    }
    public function show(Request $request)
    {
        $user = $request->user();
        $pasien = $user->pasien;
        return response()->json([
            'pasien' => $pasien
        ]);
    }
    public function store(Request $request)
    {
        // Algoritma update profile pasien
        // 1. Validasi form
        $validation = $this->validation($request);
        if ($validation->fails()) {
            return $this->responseErrorMessages($validation->messages());
        }
        // 2. Validasi data pasien dan user
        $user = $request->user();
        $pasien = Pasien::find($request->nik);
        // 3. Validasi role
        if ($user->role === 'pasien') {
            if ($pasien && ($user->id !== $pasien->id_user)) {
                $validation = Validator::make($request->all(), [
                    'nik' => ['unique:pasien,nik']
                ]);
                if ($validation->fails()) {
                    return $this->responseErrorMessages($validation->messages());
                }
            }
            // 4. Create or Update profile pasien
            $request->request->add([
                'id_user' => $request->user()->id
            ]);
            Pasien::updateOrCreate(
                ['id_user' => $user->id],
                $request->all()
            );
            $response = [
                'status' => 'success',
                'message' => 'Profile berhasil disimpan',
            ];
        } else if ($user->role === 'resepsionis') {
            // Check id user => jika id bukan 0 tidak bisa melakukan update
            $pasien = Pasien::where('nik', $request->nik)->where('id_user', 0)->firstOrFail();
            if ($pasien) {
                // 4. Create or Update pasien
                $request->request->add([
                    'id_user' => 0
                ]);
                Pasien::updateOrCreate(
                    ['nik' => $request->nik],
                    $request->all()
                );
                $response = [
                    'status' => 'success',
                    'message' => 'Data pasien berhasil disimpan',
                ];
            } else {
                $validation = Validator::make($request->all(), [
                    'nik' => ['unique:pasien,nik']
                ]);
                if ($validation->fails()) {
                    return $this->responseErrorMessages($validation->messages());
                }
                $response = [
                    'status' => 'failed',
                    'message' => 'Permission denied'
                ];
                return $this->responseFailed($response, 403);
            }
        } else {
            $response = [
                'status' => 'failed',
                'message' => 'Permission denied'
            ];
            return $this->responseFailed($response, 403);
        }
        // 4. Response berhasil
        return $this->responseSuccess($response);
    }
    public function destroy(Request $request)
    {
        // 1. Validasi request
        $validation = Validator::make($request->all(), [
            'nik' => 'required'
        ]);
        // Jika validasi gagal
        if ($validation->fails()) {
            return $this->responseErrorMessages($validation->messages());
        }
        // 2. Hapus
        $pasien = Pasien::where('nik', $request->nik)->where('id_user', 0)->delete();
        if (!$pasien) {
            $response = [
                'status' => 'failed',
                'message' => 'Permission denied'
            ];
            return $this->responseFailed($response, 403);
        }
        // 3. Response
        $response = [
            'status' => 'success',
            'message' => 'Berhasil menghapus pasien'
        ];
        return $this->responseSuccess($response);
    }
}
