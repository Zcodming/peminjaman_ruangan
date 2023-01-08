import React, { useState, useEffect, useRef } from "react";
import Authenticated from "@/Layouts/Authenticated";
import Register from "../Auth/Register";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPenToSquare,
    faArrowLeft,
    faPen,
} from "@fortawesome/free-solid-svg-icons";
import ModalEdit from "@/Components/ModalEdit";
import EditAccount from "../Auth/EditAccount";

export default function ManageAccount({ auth, users }) {
    console.log("kode", users);

    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);
    const refEdit = useRef(null);

    const tableRef = useRef(null);

    return (
        <Authenticated
            auth={auth}
            errors={auth.errors}
            // header={<h2 className="relative md:ml-64 font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Ruangan" />

            <div className="flex flex-wrap">
                <div className="w-full lg:w-7/12 px-4">
                    <div className="relative flex flex-col min-w-0 w-full mb-6 shadow-lg rounded bg-white">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-lg text-blueGray-700">
                                        Kelola Ruangan
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table
                                className="min-w-max w-full table-fixed"
                                ref={tableRef}
                            >
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-5 text-center mx-auto">
                                            Akun
                                        </th>
                                        <th className="py-3 px-5 text-center max-w-md mx-auto">
                                            Username
                                        </th>
                                        <th className="py-3 px-5 text-center mx-auto ">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {users.map((list) => (
                                        <tr
                                            key={list.id}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-3 px-5 text-center ">
                                                <span>{list.name}</span>
                                            </td>
                                            <td className="py-3 px-5 text-center ">
                                                <span>{list.email}</span>
                                            </td>
                                            <td
                                                className="py-3 px-5 text-center flex item-center justify-center"
                                                key={list.id}
                                            >
                                                <button
                                                    type="button"
                                                    className="bg-yellow-300 text-white hover:bg-yellow-400 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                                    onClick={() => {
                                                        setEdit(
                                                            (edit) => !edit
                                                        );
                                                        setId(list.id);
                                                    }}
                                                >
                                                    {/* View */}
                                                    {/* {list.surat_pdf} */}
                                                    <FontAwesomeIcon
                                                        icon={faPenToSquare}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-5/12 px-4" ref={refEdit}>
                    {edit ? (
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 object-center">
                                    <h3 className="font-semibold text-lg text-blueGray-700 text-center">
                                        Edit Akun
                                    </h3>
                                </div>
                                <EditAccount
                                    users={users}
                                    id={id}
                                    // onClose={setEdit((edit) => false)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 object-center">
                                    <h3 className="font-semibold text-lg text-blueGray-700 text-center">
                                        Tambah Akun
                                    </h3>
                                </div>
                                <Register />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}
