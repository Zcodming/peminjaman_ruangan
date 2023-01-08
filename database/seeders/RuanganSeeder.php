<?php

namespace Database\Seeders;

use App\Models\Ruangan;
use App\Models\RuangSeminar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RuanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ruangan::insert([
            [
                "kode_ruangan" => "D1",
                "nama_ruangan" => "Ruang Komputer",
                "foto_ruangan" => "1666341236.jpg",
            ],
            [
                "kode_ruangan" => "D02",
                "nama_ruangan" => "Ruang Kelas D02",
                "foto_ruangan" => "1666366508.jpg",
            ],
            [
                "kode_ruangan" => "D03",
                "nama_ruangan" => "Ruang Kelas D03",
                "foto_ruangan" => "1666366508.jpg",
            ],
        ]);

        RuangSeminar::insert([
            [
                "nama_ruangan" => "Seminar 1",
                "foto_ruangan" => "1666341173.jpg",
            ],
            [
                "nama_ruangan" => "Seminar 2",
                "foto_ruangan" => "1666341173.jpg",
            ],
            [
                "nama_ruangan" => "Seminar 3",
                "foto_ruangan" => "1666341173.jpg",
            ],
            [
                "nama_ruangan" => "Seminar 4",
                "foto_ruangan" => "1666341173.jpg",
            ],
        ]);
    }
}
