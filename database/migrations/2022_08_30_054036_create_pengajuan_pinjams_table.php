<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pengajuan_pinjams', function (Blueprint $table) {
            $table->id();
            $table->string('nama_ruangan');
            $table->string('nama_peminjam');
            $table->string('email_peminjam');
            $table->string('keterangan');
            $table->date('tanggal_mulai_peminjaman');
            $table->date('tanggal_selesai_peminjaman');
            $table->time('waktu_mulai_peminjaman');
            $table->time('waktu_selesai_peminjaman');
            $table->string('pengajuan_pdf')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pengajuan_pinjams');
    }
};
