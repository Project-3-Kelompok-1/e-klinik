<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Traits\ResponseTrait;
use App\Models\Obat;
use Illuminate\Support\Facades\Validator;

class ObatController extends Controller
{
    use ResponseTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private function validation($request)
    {
        return Validator::make($request->all(), [
            'nama_obat' => ['required', 'max:255'],
            'dosis_obat' => ['required', 'max:255'],
            'stok_obat' => ['required', 'numeric'],
            'jenis_obat' => ['required', 'max:255'],
            'tipe_obat' => ['max:255'],
            'harga_jual' => ['integer'],
            'harga_pabrik' => ['required', 'integer']
        ]);
    }
    public function index()
    {
        $obat = Obat::all();
        if ($obat) {
            $response = [
                'status' => 'success',
                'obat' => $obat
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
        // 2. Menimpan data obat baru
        Obat::create($request->all());
        // 3. Melakukan response
        $response = [
            'status' => 'success',
            'message' => 'Berhasil menyimpan data obat'
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
        // 1. Mencari detail data obat
        $obat = Obat::find($id);
        if (!$obat) {
            $response = [
                'status' => 'not found',
                'message' => 'Data obat tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 2. Melakukan response
        $response = [
            'status' => 'success',
            'obat' => $obat
        ];
        return $this->responseSuccess($response);
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
        // 1. Mencari data obat
        $obat = Obat::find($id);
        // Data obat tidak ditemukan
        if (!$obat) {
            $response = [
                'status' => 'not found',
                'message' => 'Data obat tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 2. Validasi request
        $validate = $this->validation($request);
        // Validasi gagal
        if ($validate->fails()) {
            return $this->responseValidationFailed($validate->failed());
        }
        // 3. Update data obat
        $obat = Obat::find($id)->update($request->all());
        // Gagal update obat
        if (!$obat) {
            $response = [
                'status' => 'failed',
                'message' => 'Gagal update obat'
            ];
            return $this->responseFailed($response, 400);
        }
        // 4. Melakukan response
        $response = [
            'status' => 'success',
            'message' => 'Data obat berhasil di update'
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
        // 1. Cari data obat
        $obat = Obat::find($id);
        if (!$obat) {
            $response = [
                'status' => 'not found',
                'message' => 'Data obat tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 2. Hapus data obat
        Obat::destroy($id);
        // 3. Melakukan response
        $response = [
            'status' => 'success',
            'message' => 'Data obat berhasil di hapus'
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
        $obat = Obat::find($request->id);
        if (!$obat) {
            $response = [
                'status' => 'not found',
                'message' => 'Data obat tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        
        // 3. Hapus data obat terpilih
        Obat::destroy($request->id);
        $response = [
            'status' => 'success',
            'message' => 'Data obat berhasil di hapus'
        ];
        return $this->responseSuccess($response);
    }
}
