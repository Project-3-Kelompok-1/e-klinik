<?php

namespace App\Http\Controllers;

use App\Http\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DiagnosisController extends Controller
{
    use ResponseTrait;
    public function validation(Request $request)
    {
        $validation  = Validator::make($request->all(), [
            'diagnosa_pasien' => ['required', 'array', 'min:1'],
            'diagnosa_pasien.*' => ['required', 'string', 'max:255']
        ]);
        if ($validation->fails()) {
            return $this->responseErrorMessages($validation->messages());
        }
        return true;
    }
}
