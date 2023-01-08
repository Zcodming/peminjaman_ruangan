<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PinjamResource;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StorePinjamRequest;
use App\Models\ArsipSeminar;

class PinjamRuangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePinjamRequest $request)
    {
        // dd($request);
        $request->validate([
            'nama_ruangan' => 'required|string|max:255',
            'nama_peminjam' => 'required|string|max:255',
            'nim' => 'required|string|max:255',
            'keterangan' => 'required|string|max:255',
            'tanggal_peminjaman' => 'required',
            'waktu_peminjaman' => 'required',
            'sesi' => 'required|string|max:255|unique:arsip_seminars',
        ]);

        $data = new PinjamResource(ArsipSeminar::create([
            'title' => $request->nama_ruangan,
            'nama_peminjam' => $request->nama_peminjam,
            'nim' => $request->nim,
            'keterangan' => $request->keterangan,
            'start' => $request->tanggal_peminjaman,
            'end' => $request->tanggal_peminjaman,
            'waktu_peminjaman' => $request->waktu_peminjaman,
            'sesi' => $request->sesi,
        ]));
        // return $this->sendResponse($data, 'Successfull store');

        return Redirect::route('ruangseminar');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
