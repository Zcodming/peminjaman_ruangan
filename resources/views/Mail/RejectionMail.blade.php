<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <h1>Peminjaman Ruangan Ditolak</h1>
        <p>Kepada {{$details['nama_peminjam']}}</p>
        <p>
            Mohon maaf, pengajuan peminjaman anda dengan detail :
        </p>
        <p>Nama Ruangan : {{$details['title']}}</p>
        <p>Nama Peminjam : {{$details['nama_peminjam']}}</p>
        <p>Keteragan : {{$details['keterangan']}}</p> 
        <p>Tanggal Peminjaman : {{$details['start']}} sampai {{$details['end']}}</p>
        <p>Waktu Peminjaman : Jam {{$details['waktu_mulai']}} sampai Jam {{$details['waktu_selesai']}}</p>
        <br/>
        <p>Pesan Dari Admin : <b>{{$details['komentar']}}</b></p>
        <p>Anda dapat mengirimkan permintaan ulang</p>
        <p>Terima Kasih sudah menggunakan sistem PINJAR TEKNIK UNTAN</p>
        <p>Untuk kritik dan saran dapat dilakukan dihalaman <b>https://www.pinjarteknik.untan.ac.id</b></p>
    </body>
</html>