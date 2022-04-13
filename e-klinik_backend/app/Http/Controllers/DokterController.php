<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class DokterController extends Controller
{
    public function responseValidatedFailed($validator)
    {
        return response()->json([
            'status' => 'failed',
            'errors' => $validator->failed()
        ], 400);
    }
    public function responseFailed($response, $code = 404)
    {
        return response()->json($response, $code);
    }
    public function responseSuccess($response, $code = 200)
    {
        return response()->json($response, $code);
    }
    public function add(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'resepsionis') {
            $response = [
                'status' => 'failed',
                'message' => 'Permission denied'
            ];
            return $this->responseFailed($response, 403);
        } //Cek role user
        $validator = Validator::make($request->all(), [
            'nama_depan' => ['required', 'max:255'],
            'nama_belakang' => ['max:255'],
            'jenis_kelamin' => ['required', 'max:10'],
            'tempat_lahir' => ['max:255'],
            'tgl_lahir' => ['required', 'date'],
            'no_hp' => ['max:13'],
        ]); //validasi input
        if ($validator->fails()) {
            $response = [
                'status' => 'validation failed',
                'errors' => $validator->failed()
            ];
            return $this->responseFailed($response, 400);
        } //response error validasi
        $dokter = Dokter::create([
            'nama_depan' => $request->nama_depan,
            'nama_belakang' => $request->nama_belakang,
            'jenis_kelamin' => $request->jenis_kelamin,
            'no_hp' => $request->no_hp,
            'tempat_lahir' => $request->tempat_lahir,
            'alamat' => $request->alamat,
            'tgl_lahir' => Carbon::createFromFormat('Y-m-d', $request->tgl_lahir)
        ]); //menyimpan data dokter
        if ($request->hasFile('foto_dokter')) {
            $validator = Validator::make($request->all(), [
                'foto_dokter' => ['image:jpeg,png,jpg,gif,svg']
            ]); // file harus berupa image
            if ($validator->fails()) {
                $response = [
                    'status' => 'validation failed',
                    'errors' => $validator->failed()
                ];
                return $this->responseFailed($response, 400);
            } //validasi gagal
            $dokter->foto_dokter =  $this->simpanFoto($request->file('foto_dokter'));
            $dokter->save();
        }
        $response = [
            'status' => 'success',
            'message' => 'Dokter berhasil ditambahkan'
        ];
        return $this->responseSuccess($response);
    }
    public function simpanFoto($file)
    {
        $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();
        $file->storeAs('foto_dokter/', $fileName, 'public');
        return $fileName;
    }
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'resepsionis' && $user->role !== 'dokter') {
            return response()->json([
                'status' => 'failed',
                'message' => 'Permission denied'
            ], 403);
        }
        if ($request->search) {
            $dokter = Dokter::where('nama_depan', 'LIKE', '%' . $request->search . '%')
                ->orWhere('nama_belakang', 'LIKE', '%' . $request->search . '%')->get();
            $response = [
                'status' => 'success',
                'dokter' => $dokter,
                'search' => $request->search
            ];
        } else {
            $dokter = Dokter::all();
            $response = [
                'status' => 'success',
                'dokter' => $dokter
            ];
        }

        return $this->responseSuccess($response);
    }
    public function testUpload(Request $request)
    {
        if ($request->hasFile('foto_dokter')) {
            $file = $request->file('foto_dokter');
            $fileName = $file->getClientOriginalName();
            $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();

            $request->file('foto_dokter')->storeAs('foto_dokter/', $fileName, 'public');
            return response()->json([
                'message' => 'Successfully upload an image'
            ], 200);
        }
        return response()->json([
            'message' => 'You must select the image first'
        ], 400);
    }
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'resepsionis') {
            $response = [
                'status' => 'failed',
                'message' => 'Permission denied'
            ];
            return $this->responseFailed($response, 403);
        }
        $dokter = Dokter::destroy($id);
        if ($dokter > 0) {
            $response = [
                'status' => 'success',
                'message' => 'Dokter berhasil dihapus'
            ];
            return $this->responseSuccess($response);
        } else {
            $response = [
                'status' => 'failed',
                'message' => 'Data dokter tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
    }
    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'resepsionis') {
            $response = [
                'status' => 'failed',
                'message' => 'Permission denied'
            ];
            return $this->responseFailed($response, 403);
        }

        $validator = Validator::make($request->all(), [
            'nama_depan' => ['required', 'max:255'],
            'nama_belakang' => ['max:255'],
            'jenis_kelamin' => ['required', 'max:10'],
            'tempat_lahir' => ['max:255'],
            'tgl_lahir' => ['required'],
            'no_hp' => ['max:13'],
        ]); //validasi input
        if ($validator->fails()) {
            $response = [
                'status' => 'validation failed',
                'errors' => $validator->failed()
            ];
            return $this->responseFailed($response, 400);
        } //response error validasi
        $dokter = Dokter::find($id)->update([
            'nama_depan' => $request->nama_depan,
            'nama_belakang' => $request->nama_belakang,
            'jenis_kelamin' => $request->jenis_kelamin,
            'no_hp' => $request->no_hp,
            'tempat_lahir' => $request->tempat_lahir,
            'alamat' => $request->alamat,
            'tgl_lahir' => Carbon::createFromFormat('Y-m-d', $request->tgl_lahir)
        ]);
        if ($request->hasFile('foto_dokter')) {
            $validator = Validator::make($request->all(), [
                'foto_dokter' => ['image:jpeg,png,jpg,gif,svg']
            ]); // file harus berupa image
            if ($validator->fails()) {
                $response = [
                    'status' => 'validation failed',
                    'errors' => $validator->failed()
                ];
                return $this->responseFailed($response, 400);
            } //validasi gagal
            $dokter = Dokter::find($id);
            $dokter->foto_dokter =  $this->simpanFoto($request->file('foto_dokter'));
            $dokter->save();
        }
        $response = [
            'status' => 'success',
            'message' => 'Dokter berhasil diupdate'
        ];
        return $this->responseSuccess($response);
    }
}
