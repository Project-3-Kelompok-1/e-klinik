<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AkunController extends Controller
{
    public function register(Request $request)
    {
        // return response()->json([
        //     'status' => 'success'
        // ]);
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'unique:users,username', 'max:255'],
            'password' => ['required']
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'errors' => $validator->failed()
            ], 400);
        }
        $validated = $validator->validated();
        $user = new User();
        $user->username = $validated['username'];
        $user->password = Hash::make($validated['password']);
        $data['username'] = $validated['username'];
        $user->save();
        $data['token'] = $user->createToken('E-Klinik')->plainTextToken;
        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required'],
            'password' => ['required']
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'errors' => $validator->failed(),
                'message' => 'Username dan password tidak boleh kosong !!!'
            ]);
        }
        $validated = $validator->validated();
        $user = User::where('username', $request->username)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Username atau password salah !!!'
            ]);
        }

        
        $data['token'] = $user->createToken('E-Klinik')->plainTextToken;
        $data['username'] = $validated['username'];
        $data['role'] = $user->role;
        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }
    public function getUsers()
    {
        return response()->json([
            'message' => 'Hello World !!!'
        ]);
    }
}
