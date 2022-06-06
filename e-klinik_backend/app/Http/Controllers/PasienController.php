<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private function validation($request)
    {
        return Validator::make($request->all(), [
            'nik' => ['required', 'max:255'],
            'id_user' => ['required'],
            'nama_depan' => ['required', 'max:255'],
            'nama_belakang' => ['max:255'],
            'alamat_rumah' => ['max:255'],
            'usia' => ['integer'],
            'jenis_kelamin' => ['required', 'max:10'],
            'tempat_lahir' => ['max:255'],
            'tgl_lahir' => ['required', 'date']

        ]);
    }

    public function index()
    {
        $pasien = Pasien::all();
        if ($pasien) {
            $response = [
                'status' => 'success',
                'pasien' => $pasien
            ];
            return $this->responseSuccess($response);
        }
        $response = [
            'status' => 'empty',
            'message' => 'Data Obat Kosong'
        ];
        return $this->responseFailed($response, 404);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         // 1. Validasi form
         $validate = $this->validation($request);
         // Jika validasi gagal
         if ($validate->fails()) {
             return $this->responseValidationFailed($validate->failed());
         }
         // 2. Menimpan data pasien baru
         Pasien::create($request->all());
         // 3. Melakukan response
         $response = [
             'status' => 'success',
             'message' => 'Berhasil menyimpan data pasien'
         ];
         return $this->responseSuccess($response);
     
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // 1. Mencari detail data pasien
        $pasien = Pasien::find($id);
        if (!$pasien) {
            $response = [
                'status' => 'not found',
                'message' => 'Data pasien tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 2. Melakukan response
        $response = [
            'status' => 'success',
            'Pasien' => $pasien
        ];
        return $this->responseSuccess($response);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
       // 1. Mencari data Pasien
       $pasien = Pasien::find($id);
       // Data pasien tidak ditemukan
       if (!$pasien) {
           $response = [
               'status' => 'not found',
               'message' => 'Data pasien tidak ditemukan'
           ];
           return $this->responseFailed($response);
       }
       // 2. Validasi request
       $validate = $this->validation($request);
       // Validasi gagal
       if ($validate->fails()) {
           return $this->responseValidationFailed($validate->failed());
       }
       // 3. Update data pasien
       $pasien = Pasien::find($id)->update($request->all());
       // Gagal update pasien
       if (!$pasien) {
           $response = [
               'status' => 'failed',
               'message' => 'Gagal update data pasien'
           ];
           return $this->responseFailed($response, 400);
       }
       // 4. Melakukan response
       $response = [
           'status' => 'success',
           'message' => 'Data pasien berhasil di update'
       ];
       return $this->responseSuccess($response);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //// 1. Cari data pasien
        $pasien = Pasien::find($id);
        if (!$pasien) {
            $response = [
                'status' => 'not found',
                'message' => 'Data Pasien tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 2. Hapus data pasien
        Pasien::destroy($id);
        // 3. Melakukan response
        $response = [
            'status' => 'success',
            'message' => 'Data pasien berhasil di hapus'
        ];
        return $this->responseSuccess($response);
    }
    public function deleteSelected(Request $request)
    {
        // 1. Validasi form
        $validate = Validator::make($request->all(), [
            'id' => ['required', 'array', 'min:1'],
            'id.*' => ['required', 'integer']
        ]);
        // Validasi gagal
        if ($validate->fails()) {
            return $this->responseValidationFailed($validate->failed());
        }
        // 2. Cari semua data obat
        $pasien = Pasien::find($request->id);
        if (!$pasien) {
            $response = [
                'status' => 'not found',
                'message' => 'Data pasien tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        
        // 3. Hapus data pasien terpilih
        Pasien::destroy($request->id);
        $response = [
            'status' => 'success',
            'message' => 'Data pasien berhasil di hapus'
        ];
        return $this->responseSuccess($response);
    }
    }

