<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengajuanPinjam extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_ruangan',
        'nama_peminjam',
        'email_peminjam',
        'keterangan',
        'tanggal_mulai_peminjaman',
        'tanggal_selesai',
        'tanggal_selesai_peminjaman',
        'waktu_mulai_peminjaman',
        'waktu_selesai_peminjaman',
        'pengajuan_pdf',
        // 'waktu_peminjaman',
    ];
}
