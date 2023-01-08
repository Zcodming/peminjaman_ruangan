import React from "react";
import { useForm, Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function ModalComment(props) {
    const { data, setData, key, post, put, reset } = useForm({
        comment: "",
        preserveScroll: true,
    });

    if (!props.showComment) {
        return null;
    }

    function submit(e) {
        e.preventDefault();
        Swal.fire({
            position: "center",
            title: "Mengirim Email",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 7000,
            didOpen: () => {
                Swal.showLoading();
                post(`reject/${props.showId}`, data, {
                    forceFormData: true,
                    onSuccess: () => reset(),
                });
            },
        });
    }

    return (
        <>
            <form onSubmit={submit} encType="multipart/form-data" method="PUT">
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
                                <h3 className="text-3xl font-semibold">
                                    {props.title}
                                </h3>
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
                                <textarea
                                    name="comment"
                                    id="comment"
                                    placeholder="Masukkan Komentar"
                                    className="rounded"
                                    style={{
                                        width: "600px",
                                        height: "200px",
                                    }}
                                    onChange={(e) => {
                                        setData("comment", e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    type="submit"
                                    // onClick={showAlert}
                                    className="bg-red-600 text-white hover:bg-red-700 object-center px-4 py-3 rounded font-bold uppercase shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                >
                                    Tolak Permintaan
                                </button>
                                <button
                                    className="bg-emerald-500 text-white disabled:bg-gray-400 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={props.onClose}
                                >
                                    Batal
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
