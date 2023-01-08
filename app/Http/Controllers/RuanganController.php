<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Ruangan;
use App\Models\RuangSeminar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Console\View\Components\Alert;

class RuanganController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ruangans = Ruangan::all();
        $ruangseminars = RuangSeminar::all();
        // dd(request()->$ruangans);
        return Inertia::render('Admin/DataRuangan/Table', [
            'ruangan' => $ruangans->map(function ($ruangan) {
                return [
                    'id' => $ruangan->id,
                    'kode_ruangan' => $ruangan->kode_ruangan,
                    'nama_ruangan' => $ruangan->nama_ruangan,
                    'foto_ruangan' => $ruangan->foto_ruangan,
                ];
            }),
            'ruangseminar' => $ruangseminars->map(function ($ruangseminar) {
                return [
                    'id' => $ruangseminar->id,
                    'nama_ruangan' => $ruangseminar->nama_ruangan,
                    'foto_ruangan' => $ruangseminar->foto_ruangan,
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/DataRuangan/Input');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        request()->validate([
            'id' => 'unique:ruangan,id, . $ruangans->id',
            'kode_ruangan' => 'required',
            'nama_ruangan' => 'required',
            'foto_ruangan' => 'required',
        ]);

        // $nama_ruangan = request('nama_ruangan');
        $foto = request()->file('foto_ruangan');
        $filename = time() . '.' . $foto->getClientOriginalExtension();

        $request->foto_ruangan->move('storage/img', $filename);

        Ruangan::create([
            'kode_ruangan' => request('kode_ruangan'),
            'nama_ruangan' => request('nama_ruangan'),
            'foto_ruangan' => $filename,
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ruangan  $ruangan
     * @return \Illuminate\Http\Response
     */
    public function show(Ruangan $ruangan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ruangan  $ruangan
     * @return \Illuminate\Http\Response
     */
    public function edit(Ruangan $ruangan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ruangan  $ruangan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $ruangans = Ruangan::find($id);

        // dd($ruangans->foto_ruangan);
        $kode_ruangan = request('kode_ruangan');
        $nama_ruangan = request('nama_ruangan');
        $foto_ruangan = request('foto_ruangan');

        if ($kode_ruangan != null) {
            $ruangans->update([
                'kode_ruangan' => request('kode_ruangan'),
            ]);
        } else {
            $kode_ruangan = request('kode_ruangan');
        }

        if ($nama_ruangan != null) {
            $ruangans->update([
                'nama_ruangan' => request('nama_ruangan'),
            ]);
        } else {
            $nama_ruangan = request('nama_ruangan');
        }

        if ($foto_ruangan != null) {
            Storage::delete([$ruangans->foto_ruangan]);
            $foto = request()->file('foto_ruangan');

            $filename = time() . '.' . $foto->getClientOriginalExtension();

            $request->foto_ruangan->move('storage/img', $filename);

            $ruangans->update([
                'foto_ruangan' => $filename,
            ]);
        } else {
            $foto_ruangan = request('foto_ruangan');
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ruangan  $ruangan
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ruangan $ruangans, $id)
    {
        $ruangans = Ruangan::find($id);
        Storage::delete([$ruangans->foto_ruangan]);
        $ruangans->delete();
    }
}
