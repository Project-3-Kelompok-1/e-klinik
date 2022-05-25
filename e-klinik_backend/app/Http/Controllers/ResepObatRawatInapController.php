<?php

namespace App\Http\Controllers;

use App\Models\ResepObatRawatInap;
use Illuminate\Http\Request;

class ResepObatRawatInapController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rori=ResepObatRawatInap::all();
       return response()->json([
           'status'=> 'succes',
           'rori'=> $rori
       ]);
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
        ResepObatRawatInap::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Resep obat rawat inap berhasil ditambahkan'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // 1. Cari rori berdasarkan id
        $rori = ResepObatRawatInap::find($id);
         // rori ditemukan
         return response()->json([
            $response = 
                'status' => 'success',
                'rori_show' => $rori
            ]);
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
        // 2. Cari rori & update
        $rori = ResepObatRawatInap::find($id)->update($request->all());
        // Rori tidak ditemukan
        if (!$rori) {
            $response = [
                'status' => 'failed',
                'message' => 'Resep Obat Rawat Inap tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        $response = [
            'status' => 'success',
            'message' => 'Resep Obat Rawat Inap berhasil diupdate'
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
     // 1. Cari rori
     $hapus = ResepObatRawatInap::find($id);
     if (!$hapus) {
         $response = [
             'status' => 'failed',
             'message' => 'Resep Obat Rawat Inap tidak ditemukan'
         ];
         return $this->responseFailed($response);
     }
     // 2. Hapus ruangan
     $hapus->delete();
     $response = [
         'status' => 'success',
         'message' => 'Resep Obat Rawat Inap berhasil dihapus'
     ];
     return $this->responseSuccess($response);
    }
}
