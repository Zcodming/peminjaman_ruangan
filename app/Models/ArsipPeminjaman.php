<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArsipPeminjaman extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'nama_peminjam',
        'email_peminjam',
        'keterangan',
        'start',
        'end',
        'waktu_mulai',
        'waktu_selesai',
        'surat_pdf',
    ];
}
