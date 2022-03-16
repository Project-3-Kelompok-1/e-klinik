<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AkunController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'unique:users,username', 'max:5'],
            'password' => ['required']
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'errors' => $validator->failed()
            ]);
        }
        $validated = $validator->validated();
        // if ($validated->fails()) {
        //     # code...
        // }
        $user = new User();
        $user->username = $validated['username'];
        $user->password = Hash::make($validated['password']);
        $user->save();
        return response()->json([
            'status' => 'success',
            'data' => $validated
        ]);
    }
}
