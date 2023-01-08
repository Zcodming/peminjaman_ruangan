<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRuanganRequest;
use App\Http\Resources\RuanganResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Ruangan;

class RuanganController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Ruangan::all();

        $result = RuanganResource::collection($data);

        return $this->sendResponse($result, 'Successfull get ruangan');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRuanganRequest $request)
    {
        $foto = request()->file('foto_ruangan');
        $filename = time() . '.' . $foto->getClientOriginalExtension();

        $request->foto_ruangan->move('storage/img', $filename);

        $data = new RuanganResource(Ruangan::create([
            'kode_ruangan' => $request->validated('kode_ruangan'),
            'nama_ruangan' => $request->validated('nama_ruangan'),
            'foto_ruangan' => $filename,
        ]));

        // return $this->sendResponse($data, 'Successfull store');
        return back();
        // HElP
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Ruangan $ruangan)
    {
        $cek = Ruangan::find($ruangan->id);
        if (!$cek) {
            abort(404, 'Object not found');
        }
        $data = new RuanganResource($cek);

        return $this->sendResponse($data, 'Successfull get ruangan');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreRuanganRequest $request, Ruangan $ruangan)
    {

        $ruangan->update($request->validated());

        $result = new RuanganResource($ruangan);

        return $this->sendResponse($result, 'Successfull update ruangan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ruangan $ruangan)
    {
        $ruangan->delete();

        return response()->noContent();
    }
}
