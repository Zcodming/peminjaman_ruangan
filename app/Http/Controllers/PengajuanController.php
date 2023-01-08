<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Ruangan;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use App\Models\PengajuanPinjam;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StorePengajuanRequest;

class PengajuanController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $ruangans = Ruangan::all();
        return Inertia::render('User/Pengajuan', [
            'ruangan' => $ruangans->map(function ($ruangan) {
                return [
                    'id_ruangan' => $ruangan->id,
                    'nama_ruangan' => $ruangan->nama_ruangan,
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePengajuanRequest $request)
    {
        dd(request()->all());
        PengajuanPinjam::create(
            $request->validated()
        );

        return Inertia::render('Welcome');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pengajuan  $pengajuan
     * @return \Illuminate\Http\Response
     */
    public function save(StorePengajuanRequest $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pengajuan  $pengajuan
     * @return \Illuminate\Http\Response
     */
    public function edit(StorePengajuanRequest $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pengajuan  $pengajuan
     * @return \Illuminate\Http\Response
     */
    public function update(StorePengajuanRequest $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pengajuan  $pengajuan
     * @return \Illuminate\Http\Response
     */
    public function destroy(StorePengajuanRequest $request)
    {
        //
    }
}
