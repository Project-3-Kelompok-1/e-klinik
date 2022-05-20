<?php

namespace App\Http\Controllers;

use App\Models\RuangRawatInap;
use Illuminate\Http\Request;

class RuangRawatInapController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $ruangan=RuangRawatInap::all();
       return response()->json([
           'status'=> 'succes',
           'ruangan'=> $ruangan
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
        RuangRawatInap::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Ruang rawat inap berhasil ditambahkan'
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
        // 1. Cari ruangan berdasarkan id
        $ruangan = RuangRawatInap::find($id);

        // 2. Cari relasi dokter nya
        //$jadwal['dokter'] = $jadwal->dokter;
        // Jadwal tidak ditemukan
        //if (!$jadwal) {
            //$response = [
                //'status' => 'failed',
                //'message' => 'Jadwal tidak ditemukan'
            //];
            //return $this->responseFailed($response);
        //}
        // ruangan ditemukan
        return response()->json([
        $response = 
            'status' => 'success',
            'ruangan_show' => $ruangan
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

        // 2. Cari ruang rawat inap & update
        $ruangan = RuangRawatInap::find($id)->update($request->all());
        // Ruangan tidak ditemukan
        if (!$ruangan) {
            $response = [
                'status' => 'failed',
                'message' => 'Ruangan tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        $response = [
            'status' => 'success',
            'message' => 'Ruangan berhasil diupdate'
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
        // 1. Cari ruangan
        $hapus = RuangRawatInap::find($id);
        if (!$hapus) {
            $response = [
                'status' => 'failed',
                'message' => 'Rawat tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 2. Hapus ruangan
        $hapus->delete();
        $response = [
            'status' => 'success',
            'message' => 'ruangan berhasil dihapus'
        ];
        return $this->responseSuccess($response);
    }
}
