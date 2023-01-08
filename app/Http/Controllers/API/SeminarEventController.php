<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\SeminarEventResource;
use App\Models\ArsipSeminar;
use Illuminate\Http\Request;

class SeminarEventController extends Controller
{
    public function index()
    {
        $data = ArsipSeminar::all();

        $result = SeminarEventResource::collection($data);

        return $this->sendResponse($result, 'Successfull get all events');
    }
}
