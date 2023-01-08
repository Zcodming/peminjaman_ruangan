<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArsipSeminar extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'nama_peminjam',
        'nim',
        'keterangan',
        'start',
        'end',
        'waktu_peminjaman',
        'sesi',
    ];
}
