<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use App\Models\ArsipSeminar;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StorePinjamRequest;

class PinjamController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $ruangans = Ruangan::all();
        return Inertia::render('User/Pinjam', [
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
    public function store(StorePinjamRequest $request)
    {
        // dd($request);
        request()->validate([
            'nama_ruangan' => 'required',
            'nama_peminjam' => 'required',
            'nim' => 'required',
            'keterangan' => 'required',
            'tanggal_pinjam' => 'required',
            'waktu_peminjaman' => 'required',
        ]);

        ArsipSeminar::create([
            'title' => request('nama_ruangan'),
            'nama_peminjam' => request('nama_peminjam'),
            'nim' => request('nim'),
            'keterangan' => request('keterangan'),
            'start' => request('tanggal_pinjam'),
            'end' => request('tanggal_pinjam'),
            'waktu_peminjaman' => request('waktu_peminjaman'),
        ]);

        return Redirect::route('ruangseminar');
    }
}
