<?php

namespace App\Http\Controllers;

use App\Models\RawatInap;
use Illuminate\Http\Request;

class RawatInapController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ranap=RawatInap::all();
        return response()->json([
            'status'=> 'succes',
            'ranap'=> $ranap
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
        RawatInap::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Pasien rawat inap berhasil ditambahkan'
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
         // 1. Cari pasien ranap berdasarkan id
        $ranap = RawatInap::find($id);


        //pasien ranap ditemukan
        return response()->json([
            $response = 
                'status' => 'success',
                'ranap_show' => $ranap
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
        // 2. Cari pasien rawat inap & update
        $ranap = RawatInap::find($id)->update($request->all());
        // pasien ranap tidak ditemukan
        if (!$ranap) {
            $response = [
                'status' => 'failed',
                'message' => 'Pasien rawat inap tidak ditemukan'
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
         // 1. Cari pasien ranap
         $hapus = RawatInap::find($id);
         if (!$hapus) {
             $response = [
                 'status' => 'failed',
                 'message' => 'Pasien rawat inap tidak ditemukan'
             ];
             return $this->responseFailed($response);
         }
         // 2. Hapus ranap
         $hapus->delete();
         $response = [
             'status' => 'success',
             'message' => 'rawat inap berhasil dihapus'
         ];
         return $this->responseSuccess($response);
    }
}
