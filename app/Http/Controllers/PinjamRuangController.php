<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Ruangan;
use App\Mail\RejectionMail;
use Illuminate\Http\Request;
use App\Mail\ConfirmationMail;
use App\Models\ArsipPeminjaman;
use App\Models\PengajuanPinjam;
use App\Models\ArsipSeminar;
use App\Models\RuangSeminar;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StorePengajuanRequest;
use App\Http\Requests\StorePinjamRequest;
use App\Models\User;

class PinjamRuangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Menu Pinjam Ruangan
        $ruangans = Ruangan::all();
        return Inertia::render('User/PinjamRuang', [
            'ruangan' => $ruangans->map(function ($ruangan) {
                return [
                    'id_ruangan' => $ruangan->id,
                    'nama_ruangan' => $ruangan->nama_ruangan,
                    'foto_ruangan' => $ruangan->foto_ruangan,
                ];
            }),
        ]);
    }

    public function dashboard()
    {
        $pengajuan_pinjams = PengajuanPinjam::count();
        $arsip_peminjamen = ArsipPeminjaman::count();
        $arsip_seminars = ArsipSeminar::count();
        $ruangumum = Ruangan::count();
        $ruangseminar = RuangSeminar::count();
        $ruangans = $ruangumum + $ruangseminar;

        return Inertia::render('Dashboard', compact('pengajuan_pinjams', 'arsip_peminjamen', 'ruangans', 'arsip_seminars'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Ruangan $ruangans, $id_ruangan)
    {
        // Pengajuan Ruangan
        // dd(request()->$id_ruangan);
        return Inertia::render('User/Pengajuan', [
            'ruangan' => Ruangan::find($id_ruangan)
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
        // dd(request());
        request()->validate([
            'nama_ruangan' => 'required',
            'nama_peminjam' => 'required',
            'email_peminjam' => 'required',
            'keterangan' => 'required',
            'tanggal_mulai_peminjaman' => 'required',
            'tanggal_selesai_peminjaman' => 'required',
            'waktu_mulai_peminjaman' => 'required',
            'waktu_selesai_peminjaman' => 'required',
        ]);
        $filename = "";
        if (request()->file('pengajuan_pdf') !== null) {
            $pengajuan_pdf = request()->file('pengajuan_pdf');
            $filename = time() . '.' . $pengajuan_pdf->getClientOriginalExtension();

            $request->pengajuan_pdf->move('storage/surat', $filename);
        }

        PengajuanPinjam::create([
            'nama_ruangan' => request('nama_ruangan'),
            'nama_peminjam' => request('nama_peminjam'),
            'email_peminjam' => request('email_peminjam'),
            'keterangan' => request('keterangan'),
            'tanggal_mulai_peminjaman' => request('tanggal_mulai_peminjaman'),
            'tanggal_selesai_peminjaman' => request('tanggal_selesai_peminjaman'),
            'waktu_mulai_peminjaman' => request('waktu_mulai_peminjaman'),
            'waktu_selesai_peminjaman' => request('waktu_selesai_peminjaman'),
            'pengajuan_pdf' => $filename,
        ]);

        return Redirect::route('pinjamruang');
    }

    public function save(StorePinjamRequest $request)
    {
        dd($request);
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

    public function add(Request $request)
    {
        // dd(request());
        request()->validate([
            'nama_ruangan' => 'required',
            'nama_peminjam' => 'required',
            'email_peminjam' => 'required',
            'keterangan' => 'required',
            'tanggal_mulai_peminjaman' => 'required',
            'tanggal_selesai_peminjaman' => 'required',
            'waktu_mulai_peminjaman' => 'required',
            'waktu_selesai_peminjaman' => 'required',
        ]);

        $surat_pdf = request()->file('surat_pdf');
        $filename = "";
        if ($surat_pdf !== null) {
            $filename = time() . '.' . $surat_pdf->getClientOriginalExtension();
            $request->surat_pdf->move('storage/surat', $filename);
        }

        ArsipPeminjaman::create([
            'title' => request('nama_ruangan.value'),
            'nama_peminjam' => request('nama_peminjam'),
            'email_peminjam' => request('email_peminjam'),
            'keterangan' => request('keterangan'),
            'start' => request('tanggal_mulai_peminjaman'),
            'end' => request('tanggal_selesai_peminjaman'),
            'waktu_mulai' => request('waktu_mulai_peminjaman'),
            'waktu_selesai' => request('waktu_selesai_peminjaman'),
            'surat_pdf' => $filename,
        ]);

        return Redirect::route('dashboard');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $pengajuan_pinjams = PengajuanPinjam::latest()->paginate(10);

        return Inertia::render('Admin/ArsipPinjaman/Persetujuan', [
            'pinjamanmasuk' => $pengajuan_pinjams->map(function ($pengajuan_pinjam) {
                return [
                    'id' => $pengajuan_pinjam->id,
                    'nama_ruangan' => $pengajuan_pinjam->nama_ruangan,
                    'nama_peminjam' => $pengajuan_pinjam->nama_peminjam,
                    'keterangan' => $pengajuan_pinjam->keterangan,
                    'tanggal_mulai_peminjaman' => $pengajuan_pinjam->tanggal_mulai_peminjaman,
                    'tanggal_selesai_peminjaman' => $pengajuan_pinjam->tanggal_selesai_peminjaman,
                    'surat_pdf' => $pengajuan_pinjam->surat_pdf,
                    'pengajuan_pdf' => $pengajuan_pinjam->pengajuan_pdf,
                ];
            }),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function confirm($id)
    {
        $data = PengajuanPinjam::find($id);
        // dd($data->email_peminjam);
        $email = $data->email_peminjam;
        $details = [
            'title' => $data->nama_ruangan,
            'nama_peminjam' => $data->nama_peminjam,
            'email_peminjam' => $data->email_peminjam,
            'keterangan' => $data->keterangan,
            'start' => $data->tanggal_mulai_peminjaman,
            'end' => $data->tanggal_selesai_peminjaman,
            'waktu_mulai' => $data->waktu_mulai_peminjaman,
            'waktu_selesai' => $data->waktu_selesai_peminjaman,
            'surat_pdf' => $data->pengajuan_pdf,
        ];

        // dd($details);
        ArsipPeminjaman::create([
            'title' => $data->nama_ruangan,
            'nama_peminjam' => $data->nama_peminjam,
            'email_peminjam' => $data->email_peminjam,
            'keterangan' => $data->keterangan,
            'start' => $data->tanggal_mulai_peminjaman,
            'end' => $data->tanggal_selesai_peminjaman,
            'waktu_mulai' => $data->waktu_mulai_peminjaman,
            'waktu_selesai' => $data->waktu_selesai_peminjaman,
            'surat_pdf' => $data->pengajuan_pdf,
        ]);

        Mail::to($email)->send(new ConfirmationMail($details));

        PengajuanPinjam::destroy($id);

        return Redirect::route('pinjamanmasuk');
    }

    public function reject($id, Request $request)
    {
        // dd($request);
        $request->validate(['comment' => 'required|string']);

        $data = PengajuanPinjam::find($id);
        $email = $data->email_peminjam;
        $details = [
            'title' => $data->nama_ruangan,
            'nama_peminjam' => $data->nama_peminjam,
            'email_peminjam' => $data->email_peminjam,
            'keterangan' => $data->keterangan,
            'start' => $data->tanggal_mulai_peminjaman,
            'end' => $data->tanggal_selesai_peminjaman,
            'waktu_mulai' => $data->waktu_mulai_peminjaman,
            'waktu_selesai' => $data->waktu_selesai_peminjaman,
            'surat_pdf' => $data->pengajuan_pdf,
            'komentar' => $request->comment,
        ];
        $pdf = $data->pengajuan_pdf;


        Mail::to($email)->send(new RejectionMail($details));

        PengajuanPinjam::destroy($id);

        Storage::delete([$pdf]);

        return Redirect::route('pinjamanmasuk');
    }

    public function arsip()
    {
        $arsip_peminjamen = ArsipPeminjaman::all();
        $arsip_seminars = ArsipSeminar::all();
        $ruangans = Ruangan::all();
        $ruanganseminar = RuangSeminar::all();

        return Inertia::render('Admin/ArsipPinjaman/Table', [
            'arsip' => $arsip_peminjamen->map(function ($arsip) {
                return [
                    'id' => $arsip->id,
                    'nama_ruangan' => $arsip->title,
                    'nama_peminjam' => $arsip->nama_peminjam,
                    'keterangan' => $arsip->keterangan,
                    'tanggal_mulai_peminjaman' => $arsip->start,
                    'tanggal_selesai_peminjaman' => $arsip->end,
                    'waktu_mulai' => $arsip->waktu_mulai,
                    'waktu_selesai' => $arsip->waktu_selesai,
                    'surat_pdf' => $arsip->surat_pdf,
                ];
            }),
            'arsipseminar' => $arsip_seminars->map(function ($arsipseminar) {
                return [
                    'id' => $arsipseminar->id,
                    'nama_ruangan' => $arsipseminar->title,
                    'nama_peminjam' => $arsipseminar->nama_peminjam,
                    'nim' => $arsipseminar->nim,
                    'keterangan' => $arsipseminar->keterangan,
                    'tanggal_mulai_peminjaman' => $arsipseminar->start,
                    'tanggal_selesai_peminjaman' => $arsipseminar->end,
                    'waktu_peminjaman' => $arsipseminar->waktu_peminjaman,
                ];
            }),
            'ruangan' => $ruangans->map(function ($ruangan) {
                return [
                    'id_ruangan' => $ruangan->id,
                    'nama_ruangan' => $ruangan->nama_ruangan,
                ];
            }),
            'ruanganseminar' => $ruanganseminar->map(function ($ruanganseminar) {
                return [
                    'id_ruangan' => $ruanganseminar->id,
                    'nama_ruangan' => $ruanganseminar->nama_ruangan,
                ];
            }),
        ]);
    }

    public function surat()
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
    public function upload(Request $request, $id)
    {
        $pengajuan_pinjams = PengajuanPinjam::find($id);

        // dd($request);

        request()->validate([
            'surat_pdf' => 'required',
        ]);


        $surat_pdf = request()->file('surat_pdf');
        $filename = time() . '.' . $surat_pdf->getClientOriginalExtension();

        $request->surat_pdf->move('storage/surat', $filename);

        $pengajuan_pinjams->update([
            'surat_pdf' => $filename,
        ]);
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
