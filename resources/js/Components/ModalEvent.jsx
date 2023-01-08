import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import id from "date-fns/locale/id";

export default function ModalEvent(props) {
    const { data, setData, key, post, put, reset } = useForm({
        surat_pdf: null,
        preserveScroll: true,
    });

    if (!props.showModal) {
        return null;
    }

    return (
        <>
            <form encType="multipart/form-data" method="PUT">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <input
                    type="hidden"
                    name="_method"
                    value="{{ _method=PUT) }}"
                />
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}

                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-2xl">OUTLINE</h3>
                                <div>
                                    <button
                                        type="button"
                                        onClick={props.onClose}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto px-12">
                                <table className="">
                                    <tr className="border-y border-gray-300">
                                        <td className="text-left pr-14 py-3">
                                            <b>Nama Ruangan</b>
                                        </td>
                                        <td className="text-left">
                                            <p> {props.showModal}</p>
                                        </td>
                                    </tr>
                                    <tr className="border-y border-gray-300">
                                        <td className="text-left pr-14 py-3">
                                            <b>Nama Peminjam</b>
                                        </td>
                                        <td className="text-left">
                                            <p> {props.showName}</p>
                                        </td>
                                    </tr>
                                    <tr className="border-y border-gray-300">
                                        <td className="text-left pr-14 py-3">
                                            <b>Tanggal / Waktu</b>
                                        </td>
                                        <td className="text-left">
                                            <p>
                                                {" "}
                                                {`${format(
                                                    new Date(props.showStart),
                                                    "PPP",
                                                    { locale: id }
                                                )}`}{" "}
                                                / {props.showTimeStart}{" "}
                                                {props.showSesi}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr className="border-y border-gray-300">
                                        <td className="text-left pr-14 py-3 pb-12">
                                            <b>Keterangan</b>
                                        </td>
                                        <td className="text-left pr-14 py-3 pb-12">
                                            <p>{props.showKet}</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div className="flex text-right justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="bg-white text-black border border-gray-300 uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                    type="button"
                                    onClick={props.onClose}
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </form>
        </>
    );
}
