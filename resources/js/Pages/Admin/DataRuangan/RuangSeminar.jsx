import React, { useState, useEffect, useRef } from "react";
import FormContainer from "@/Components/FormContainer";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPenToSquare,
    faArrowLeft,
    faPen,
} from "@fortawesome/free-solid-svg-icons";
import ModalEdit from "@/Components/ModalEdit";

export default function RuangSeminar(props) {
    const { data, setData, key, post, progress, processing, errors, reset } =
        useForm({
            nama_ruangan: null,
            foto_ruangan: [],
            preserveScroll: true,
        });

    function preview(e) {
        setData("foto_ruangan", e.target.files[0]);
        img.src = URL.createObjectURL(e.target.files[0]);
    }

    function submit(e) {
        e.preventDefault();
        console.log("File data", data);
        post("save", data, {
            forceFormData: true,
        });
        setAdd((add) => false);
    }

    const [showModal, setShowModal] = React.useState(false);
    const [showId, setShowId] = React.useState(null);
    const [showCode, setShowCode] = React.useState(null);
    const [showName, setShowName] = React.useState(null);
    const [showPicture, setShowPicture] = React.useState(null);

    const [add, setAdd] = useState(false);
    const refAdd = useRef(null);

    const tableRef = useRef(null);

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-lg text-blueGray-700">
                                Kelola Ruang Seminar
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div
                            className="relative w-full px-4 max-w-full flex-grow flex-1"
                            ref={refAdd}
                        >
                            {add ? (
                                <button
                                    className="bg-green-400 text-white hover:bg-green-500 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                    onClick={() => setAdd((add) => false)}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                            ) : (
                                <button
                                    className="bg-green-400 text-white hover:bg-green-500 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                    onClick={() => setAdd((add) => !add)}
                                >
                                    Tambah Ruang Seminar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto" ref={refAdd}>
                    {add ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <form
                                    onSubmit={submit}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value="{{ csrf_token() }}"
                                    />
                                    <div className="mb-4">
                                        <label
                                            className="text-xl text-gray-600"
                                            htmlFor="nama_ruangan"
                                        >
                                            Nama Ruangan
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <br />
                                        <input
                                            type="text"
                                            id="nama_ruangan"
                                            name="nama_ruangan"
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
                                                    <label
                                                        htmlFor="foto_ruangan"
                                                        className="cursor-pointer bg-indigo-600 rounded-md font-medium text-white hover:text-gray-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>
                                                            Upload a file
                                                        </span>
                                                        <input
                                                            type="file"
                                                            id="foto_ruangan"
                                                            onChange={preview}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs">
                                                    PDF maksimal 2MB
                                                </p>
                                                <img
                                                    src=""
                                                    id="img"
                                                    alt="img"
                                                    className="rounded-md"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex p-1">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="p-3 bg-blue-500 text-white hover:bg-blue-400"
                                            // onClick={getId}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <table
                            className="min-w-max w-full table-fixed"
                            ref={tableRef}
                        >
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-5 text-center mx-auto ">
                                        Foto Ruangan
                                    </th>
                                    <th className="py-3 px-5 text-center max-w-md mx-auto">
                                        Nama Ruangan
                                    </th>
                                    <th className="py-3 px-5 text-center mx-auto ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {props.data.map((list) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-5 w-30 objects-center">
                                            <img
                                                src={
                                                    "/storage/img/" +
                                                    list.foto_ruangan
                                                }
                                                style={{
                                                    height: "120px"
                                                }}
                                                alt="foto ruangan"
                                                className="rounded"
                                            />
                                        </td>
                                        <td className="py-3 px-5 text-center ">
                                            <span>{list.nama_ruangan}</span>
                                        </td>
                                        <td className="py-3 px-5" key={list.id}>
                                            <button
                                                type="button"
                                                className="bg-yellow-300 text-white hover:bg-yellow-400 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setShowId(list.id);
                                                    setShowCode(
                                                        list.kode_ruangan
                                                    );
                                                    setShowName(
                                                        list.nama_ruangan
                                                    );
                                                    setShowPicture(
                                                        list.foto_ruangan
                                                    );
                                                }}
                                            >
                                                {/* View */}
                                                {list.surat_pdf}
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                />
                                            </button>
                                            <ModalEdit
                                                onClose={() =>
                                                    setShowModal(false)
                                                }
                                                showModal={showModal}
                                                showId={showId}
                                                showCode={showCode}
                                                showName={showName}
                                                showPicture={showPicture}
                                            />
                                            <Link
                                                as="button"
                                                // onClick={showAlert}
                                                href={route("delete", list.id)}
                                                className="bg-red-500 text-white hover:bg-red-600 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                            >
                                                {/* View */}

                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div className="mt-4">
                {/* {arsip.map((link) => (
                        <Link href={link.url} className="px-1">
                        {link.label}
                        </Link>
                    ))} */}
            </div>
        </>
    );
}
