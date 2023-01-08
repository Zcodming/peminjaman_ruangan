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
        Schema::create('arsip_seminars', function (Blueprint $table) {
            $table->id();
            $table->string('title')->index();
            $table->string('nama_peminjam');
            $table->string('nim');
            $table->string('keterangan');
            $table->date('start');
            $table->date('end');
            $table->string('waktu_peminjaman');
            $table->string('sesi')->unique();
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
        Schema::dropIfExists('arsip_seminars');
    }
};
