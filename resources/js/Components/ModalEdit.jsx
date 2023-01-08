import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ModalEdit(props) {
    const { data, setData, key, post, reset } = useForm({
        kode_ruangan: null,
        nama_ruangan: null,
        foto_ruangan: null,
        preserveScroll: true,
    });

    if (!props.showModal) {
        return null;
    }

    function view(e) {
        setData("foto_ruangan", e.target.files[0]);
        img.src = URL.createObjectURL(e.target.files[0]);
        console.log("foto", e.target.files[0]);
    }

    function submit(e) {
        e.preventDefault();
        console.log("request", data);
        post(`/dataruangan/update/${props.showId}`, data, {
            forceFormData: true,
            onSuccess: () => reset(),
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
                <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div
                        className="relative my-6 mx-auto max-w-3xl"
                        style={{
                            width: "600px",
                        }}
                    >
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}

                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Edit Ruangan
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto px-12">
                                <input
                                    type="hidden"
                                    name="_token"
                                    value="{{ csrf_token() }}"
                                />
                                <div className="mb-4">
                                    <label
                                        className="text-xl text-gray-600"
                                        htmlFor="kode_ruangan"
                                    >
                                        Kode Ruangan
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="kode_ruangan"
                                        name="kode_ruangan"
                                        defaultValue={props.showCode}
                                        className="border-2 border-gray-300 p-2 w-full"
                                        onChange={(e) =>
                                            setData(
                                                "kode_ruangan",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {/* {errors.kode_ruangan && <div>{errors.kode_ruangan}</div>} */}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-xl text-gray-600"
                                        htmlFor="nama_ruangan"
                                    >
                                        Nama Ruangan
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="nama_ruangan"
                                        name="nama_ruangan"
                                        defaultValue={props.showName}
                                        className="border-2 border-gray-300 p-2 w-full"
                                        onChange={(e) =>
                                            setData(
                                                "nama_ruangan",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {/* {errors.nama_ruangan && <div>{errors.nama_ruangan}</div>} */}
                                </div>
                                <div>
                                    <label className="text-xl text-gray-600">
                                        Foto Ruangan
                                    </label>
                                    <div className="mb-4 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <div className="text-sm text-gray-600">
                                                <label className="cursor-pointer bg-indigo-600 rounded-md font-medium text-white hover:text-gray-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input
                                                        type="file"
                                                        id="foto_ruangan"
                                                        onChange={view}
                                                        className="sr-only"
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs">Jpeg/PNG</p>
                                            <img
                                                style={{
                                                    height: "100px",
                                                }}
                                                src={
                                                    "/storage/img/" +
                                                    props.showPicture
                                                }
                                                id="img"
                                                alt="img"
                                                className="rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center p-6 border-t border-solid border-slate-200 rounded-b justify-between">
                                <button
                                    className="bg-emerald-500 text-white hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Simpan Data
                                </button>
                                <button
                                    className="bg-red-500 text-white hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
