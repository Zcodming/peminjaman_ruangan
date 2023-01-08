<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function sendResponse($result, $massage)
    {
        $response = [
            'success' => true,
            'massage' => $massage,
            'data' => $result
        ];

        return response()->json($response, 200);
    }

    public function sendError($error, $errorMassages = [], $code = 404)
    {
        $response = [
            "success" => false,
            "massage" => $error,
        ];

        if (!empty($errorMassages)) {
            $response['data'] = $errorMassages;
        }

        return response()->json($response, $code);
    }
}
