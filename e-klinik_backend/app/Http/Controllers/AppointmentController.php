<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $apoin=Appointment::all();
       return response()->json([
           'status'=> 'succes',
           'apoin'=> $apoin
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
        Appointment::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Appoinment berhasil dibuat'
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
        $apoin = Appointment::find($id);

        // appoinmen ditemukan
        return response()->json([
            $response = 
                'status' => 'success',
                'apoin_show' => $apoin
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
        $apoin = Appointment::find($id)->update($request->all());
        // Ruangan tidak ditemukan
        if (!$apoin) {
            $response = [
                'status' => 'failed',
                'message' => 'appoinment tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        $response = [
            'status' => 'success',
            'message' => 'appoinment berhasil diupdate'
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
         $hapus = Appointment::find($id);
         if (!$hapus) {
             $response = [
                 'status' => 'failed',
                 'message' => ' Appointment tidak ditemukan'
             ];
             return $this->responseFailed($response);
         }
         // 2. Hapus Appointment
         $hapus->delete();
         $response = [
             'status' => 'success',
             'message' => 'Appointment berhasil dihapus'
         ];
         return $this->responseSuccess($response);
     }
    }
