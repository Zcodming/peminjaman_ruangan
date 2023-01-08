import React from "react";

export default function ConfirmationMail(details) {
    return (
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <h1>Peminjaman Ruangan Telah Disetujui</h1>
            <p>Kepada {details.nama_peminjam}</p>
            <p>
                Pengajuan peminjaman anda terhadap ruangan {details.nama_ruangan} telah disetujui. <br />
                Dengan Data pengajuan sebagai berikut :
            </p>
            <p>Nama Ruangan : {details.nama_ruangan}</p>
            <p>Nama Peminjam : {details.nama_peminjam}</p>
            <p>Keteragan : {details.keterangan}</p>
            <p>Tanggal Peminjaman : {details.tanggal_mulai_peminjaman} sampai {details.tanggal_selesai_peminjaman}</p>
            <p>Waktu Peminjaman : </p>
            <br />
            <p>Terima Kasih sudah menggunakan sistem PINJAR TEKNIK UNTAN</p>
            <p>Untuk kritik dan saran dapat dilakukan dihalaman <b>https://www.pinjarteknik.untan.ac.id</b></p>
        </body>
        </html>
    );
}