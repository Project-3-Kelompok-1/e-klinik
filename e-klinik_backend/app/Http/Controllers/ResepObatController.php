<?php

namespace App\Http\Controllers;

use App\Models\ResepObat;
use Illuminate\Http\Request;

class ResepObatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $resep=ResepObat::all();
        return response()->json([
            'status'=> 'succes',
            'resep'=> $resep
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
        ResepObat::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Resep Obat berhasil ditambahkan'
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
        // 1. Cari Resep.O berdasarkan id
        $resep = ResepObat::find($id);
        return response()->json([
            $response = 
                'status' => 'success',
                'resep_show' => $resep
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
        // 2. Cari resep.O & update
        $resep = ResepObat::find($id)->update($request->all());
        //  tidak ditemukan
        if (!$resep) {
            $response = [
                'status' => 'failed',
                'message' => 'Resep tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        $response = [
            'status' => 'success',
            'message' => 'Resep berhasil diupdate'
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
        // 1. Cari resep
        $hapus = ResepObat::find($id);
        if (!$hapus) {
            $response = [
                'status' => 'failed',
                'message' => 'Resep tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // 2. Hapus resep
        $hapus->delete();
        $response = [
            'status' => 'success',
            'message' => 'resep berhasil dihapus'
        ];
        return $this->responseSuccess($response);
    }
}
