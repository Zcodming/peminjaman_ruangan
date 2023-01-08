import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import FormContainer from "@/Components/FormContainer";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faEye,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalSurat from "@/Components/ModalSurat";
import ModalComment from "@/Components/ModalComment";
import Swal from "sweetalert2";
import axios from "axios";

export default function Persetujuan({ auth, pinjamanmasuk }) {
    const { post, reset } = useForm();

    const [showModal, setShowModal] = React.useState(false);
    const [showId, setShowId] = React.useState(null);
    const [showSurat, setShowSurat] = React.useState(null);
    const [showComment, setShowComment] = React.useState(null);
    // console.log("Data", pinjamanmasuk)

    function showAlert(e) {
        e.preventDefault();
        var id = e.target.value;
        Swal.fire({
            title: "Terima Peminjaman Ruangan?",
            text: "Data akan masuk kedalam pengarsipan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Terima!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                // axios.post(`confirm/${id}`);
                Swal.fire({
                    position: "center",
                    title: "Mengirim Email",
                    showConfirmButton: false,
                    timer: 7000,
                    didOpen: () => {
                        Swal.showLoading();
                        post(`confirm/${id}`, {
                            forceFormData: true,
                            onSuccess: () => reset(),
                        });
                    },
                });
            }
        });
    }

    const [sortState, setSortState] = useState("terbaru");
    const sortMethods = {
        terbaru: (a, b) => b.id - a.id,
        terlama: (a, b) => a.id - b.id,
    };

    const getYesterday = (dateOnly = false) => {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        return dateOnly ? new Date(d).toDateString() : d;
    };
    console.log(`Yesterday (method)\n${getYesterday()}`);

    return (
        <Authenticated auth={auth} errors={auth.errors}>
            <Head title="Peminjaman" />

            <FormContainer>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-lg text-blueGray-700">
                                    Peminjaman Masuk
                                </h3>
                            </div>
                            <div>
                                <select
                                    defaultValue={"terbaru"}
                                    className="rounded"
                                    onChange={(e) =>
                                        setSortState(e.target.value)
                                    }
                                >
                                    <option value="terbaru">
                                        sortir - terbaru
                                    </option>
                                    <option value="terlama">
                                        sortir - terlama
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="min-w-max w-full table-fixed">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-5 text-center mx-auto">
                                        Ruangan
                                    </th>
                                    <th className="py-3 px-5 text-center max-w-md mx-auto">
                                        Nama Peminjam
                                    </th>
                                    <th className="py-3 px-5 text-center mx-auto ">
                                        Keterangan
                                    </th>
                                    <th className="py-3 px-5 text-center mx-auto ">
                                        Tanggal Peminjaman
                                    </th>
                                    <th className="py-3 px-5 text-center mx-auto ">
                                        Actions
                                    </th>
                                </tr>
                                {/* <tr>
                                    <th>Yesterday</th>
                                </tr> */}
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {pinjamanmasuk
                                    .sort(sortMethods[sortState])
                                    .map((list) => (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                                            <td
                                                className="py-3 px-5 text-center "
                                                key={list.nama_ruangan}
                                            >
                                                <div className="flex ">
                                                    <span>
                                                        {list.nama_ruangan}
                                                    </span>
                                                </div>
                                            </td>
                                            <td
                                                className="py-3 px-5 text-center "
                                                key={list.nama_peminjam}
                                            >
                                                <div className="flex ">
                                                    <span>
                                                        {list.nama_peminjam}
                                                    </span>
                                                </div>
                                            </td>
                                            <td
                                                className="py-3 px-5 w-30 objects-center"
                                                key={list.keterangan}
                                            >
                                                <div>
                                                    <span>
                                                        <p>{list.keterangan}</p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td
                                                className="py-3 px-5 object-center"
                                                key={
                                                    list.tanggal_mulai_peminjaman
                                                }
                                            >
                                                <div>
                                                    <span>
                                                        <p>
                                                            {
                                                                list.tanggal_mulai_peminjaman
                                                            }
                                                        </p>
                                                        <br />
                                                        <p>sampai</p>
                                                        <br />
                                                        <p>
                                                            {
                                                                list.tanggal_selesai_peminjaman
                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td
                                                className="py-3 px-5 text-center"
                                                key={list.pengajuan_pdf}
                                            >
                                                <div className="flex item-center justify-center">
                                                    <button
                                                        type="button"
                                                        // disabled={!list.pengajuan_pdf}
                                                        onClick={() => {
                                                            setShowModal(true);
                                                            setShowSurat(
                                                                list.pengajuan_pdf
                                                            );
                                                            setShowId(list.id);
                                                        }}
                                                        className="bg-yellow-300 text-white hover:bg-yellow-400 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                                    >
                                                        {/* View */}
                                                        {/* {list.pengajuan_pdf} */}
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                        />
                                                    </button>
                                                    <ModalSurat
                                                        onClose={() =>
                                                            setShowModal(false)
                                                        }
                                                        showModal={showModal}
                                                        showSurat={showSurat}
                                                        showId={showId}
                                                        title={
                                                            "Surat Peminjaman"
                                                        }
                                                        // details={pinjamanmasuk}
                                                    />

                                                    <button
                                                        value={list.id}
                                                        onClick={showAlert}
                                                        // href={route(
                                                        //     "confirm",
                                                        //     list.id
                                                        // )}
                                                        className="bg-emerald-500 text-white disabled:bg-gray-400 hover:bg-emerald-600 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                                    >
                                                        {/* Accept  */}
                                                        <FontAwesomeIcon
                                                            icon={faCircleCheck}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        name="tolak"
                                                        onClick={() => {
                                                            setShowComment(
                                                                true
                                                            );
                                                            setShowId(list.id);
                                                        }}
                                                        className="bg-red-600 text-white hover:bg-red-700 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                                    >
                                                        {/* View */}
                                                        {/* {list.pengajuan_pdf} */}
                                                        <FontAwesomeIcon
                                                            icon={faCircleXmark}
                                                        />
                                                    </button>
                                                    <ModalComment
                                                        onClose={(e) =>
                                                            setShowComment(
                                                                false
                                                            )
                                                        }
                                                        showComment={
                                                            showComment
                                                        }
                                                        showId={showId}
                                                        title={
                                                            "Komentar Penolakan"
                                                        }
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-4">
                    {pinjamanmasuk.map((link) => (
                        <Link href={link.url} className="px-1">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </FormContainer>
        </Authenticated>
    );
}
