<?php

namespace App\Http\Traits;

trait ResponseTrait
{
    protected function responseValidationFailed($validator)
    {
        return response()->json([
            'status' => 'failed',
            'errors' => $validator->failed()
        ], 400);
    }
    protected function responseFailed($response, $code = 404)
    {
        return response()->json($response, $code);
    }
    protected function responseSuccess($response, $code = 200)
    {
        return response()->json($response, $code);
    }
}
