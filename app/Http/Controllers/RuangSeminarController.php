<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RuangSeminar;

class RuangSeminarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ruangseminars = RuangSeminar::all();
        return Inertia::render('User/RuangSeminar', [
            'ruangseminar' => $ruangseminars->map(function ($ruangseminar) {
                return [
                    'id_ruangan' => $ruangseminar->id,
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
    public function create($id_ruangan)
    {
        return Inertia::render('User/Pinjam', [
            'ruangan' => RuangSeminar::find($id_ruangan)
        ]);
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
            'id' => 'unique:ruangsidang,id, . $ruangsidangs->id',
            'nama_ruangan' => 'required',
            'foto_ruangan' => 'required',
        ]);

        // $nama_ruangan = request('nama_ruangan');
        $foto = request()->file('foto_ruangan');
        $filename = time() . '.' . $foto->getClientOriginalExtension();

        $request->foto_ruangan->move('storage/img', $filename);

        RuangSeminar::create([
            'nama_ruangan' => request('nama_ruangan'),
            'foto_ruangan' => $filename,
        ]);

        return back();
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
