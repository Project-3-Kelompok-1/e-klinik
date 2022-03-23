<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DokterController extends Controller
{
    public function tambah(Request $request)
    {
        $user = $request->user();
        $user = User::where('username', $user['username'])->first();
        if ($user->role !== 'resepsionis') {
            return response()->json([
                'status' => 'failed',
                'message' => 'Permission denied'
            ], 403);
        }
        $validator = Validator::make($request->all(), [
            'nama_depan' => ['required', 'max:255'],
            'nama_belakang' => ['max:255'],
            'jenis_kelamin' => ['required', 'max:10'],
            'no_hp' => ['max:13'],
            'no_wa' => ['max:13'],
            'foto_dokter' => ['image:jpeg,png,jpg,gif,svg']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'errors' => $validator->failed()
            ], 400);
        }
        $validated = $validator->validated();
        $dokter = new Dokter();
        $dokter->nama_depan = $validated['nama_depan'];
        if (isset($validated['nama_belakang'])) {
            $dokter->nama_belakang = $validated['nama_belakang'];
        }
        $dokter->jenis_kelamin = $validated['jenis_kelamin'];
        if (isset($validated['no_hp'])) {
            $dokter->no_hp = $validated['no_hp'];
        }
        if (isset($validated['no_wa'])) {
            $dokter->no_wa = $validated['no_wa'];
        }
        if ($request->hasFile('foto_dokter')) {
            $file = $request->file('foto_dokter');
            $fileName = $file->getClientOriginalName();
            $fileName = date('His') . $fileName;

            $dokter->foto_dokter = $fileName;
            $request->file('foto_dokter')->storeAs('foto_dokter/', $fileName, 'public');
        }
        $dokter->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Success request'
        ], 200);
    }
    public function testUpload(Request $request)
    {
        if ($request->hasFile('foto_dokter')) {
            $file = $request->file('foto_dokter');
            $fileName = $file->getClientOriginalName();
            $fileName = date('His') . $fileName;

            $request->file('foto_dokter')->storeAs('foto_dokter/', $fileName, 'public');
            return response()->json([
                'message' => 'Successfully upload an image'
            ], 200);
        }
        return response()->json([
            'message' => 'You must select the image first'
        ], 400);
    }
}
