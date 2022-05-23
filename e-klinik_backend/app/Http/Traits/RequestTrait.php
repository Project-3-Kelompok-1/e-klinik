<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;

/**
 * 
 */
trait RequestTrait
{
    protected function createRecurrenceRule($arrayRequest)
    {
        // Create request data with split by "="
        $request = new Request();
        $request->setMethod('POST');
        foreach ($arrayRequest as $key => $req) {
            $req = explode("=", $req);
            $request->request->add([
                $req[0] => $req[1]
            ]);
        }
        return $request;
        # code...
    }
}
