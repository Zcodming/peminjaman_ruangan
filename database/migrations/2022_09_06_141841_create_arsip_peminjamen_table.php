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
        Schema::create('arsip_peminjamen', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('nama_peminjam');
            $table->string('email_peminjam');
            $table->string('keterangan');
            $table->date('start');
            $table->date('end');
            $table->time('waktu_mulai');
            $table->time('waktu_selesai');
            $table->string('surat_pdf')->nullable();
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
        Schema::dropIfExists('arsip_peminjamen');
    }
};
