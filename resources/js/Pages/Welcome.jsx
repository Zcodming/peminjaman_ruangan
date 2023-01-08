import React from "react";
import Index from "./Index";
import { Head } from "@inertiajs/inertia-react";
// import Intro from "/storage/audio/Intro.mp3";

export default function Welcome(props) {
    return (
        <Index
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="relative md:ml-64 font-semibold text-xl text-gray-800 leading-tight">
                    Welcome
                </h2>
            }
        >
            <Head title="Welcome" />

            <section>
                {/* <img
                    className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
                    src={require("storage/public/img/pattern_react.png").default}
                    alt="..."
                /> */}
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200 text-center">
                                <h1>
                                    <b>
                                        Selamat Datang di Aplikasi Peminjaman
                                        Ruangan Fakultas Teknik Universitas
                                        Tanjungpura
                                    </b>
                                </h1>
                                <br />
                                <div className="text-left mx-20">
                                    <p>Cara Melakukan Peminjaman Ruangan :</p>
                                    <p>
                                        1. Masuk Ke Menu Pinjam Ruang, lalu
                                        pilih ruangan yang ingin anda pinjam
                                    </p>
                                    <p>
                                        2. Isi formulir dengan data yang lengkap
                                        :
                                        <br />
                                        <ul className="px-5">
                                            <li>
                                                a. Nama Peminjam ( diharapkan
                                                mengisi nama asli anda )
                                            </li>
                                            <li>
                                                b. Email Peminjam ( diharapkan
                                                mengisi email anda degan benar,
                                                karena pemberitahuan akan
                                                dikirimkan ke alamat email
                                                tersebut )
                                            </li>
                                            <li>
                                                c. Keterangan ( diharapkan
                                                mengisi keperluan peminjaman
                                                ruangan, maupun rekomendator
                                                terkait )
                                            </li>
                                            <li>
                                                d. Tanggal Peminjaman (
                                                diharapkan mengisi tanggal di
                                                hari apa anda ingin meminjam
                                                ruangan )
                                            </li>
                                            <li>
                                                e. Waktu Peminjaman ( diharapkan
                                                mengisi waktu di jam berapa anda
                                                ingin meminjam ruangan )
                                            </li>
                                            <li>
                                                f. Surat Permohonan ( diharapkan
                                                mengupload surat permohonan
                                                peminjaman ruangan berbentuk
                                                PDF, seperti contoh dibawah ini
                                                : )
                                            </li>
                                            <li>
                                                <img
                                                    src="/storage/logo/surat_peminjaman_ruangan.jpg"
                                                    alt="surat permohonan"
                                                />
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Index>
    );
}
