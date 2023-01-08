<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RuangSeminar extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        'nama_ruangan',
        'foto_ruangan',
    ];
}
