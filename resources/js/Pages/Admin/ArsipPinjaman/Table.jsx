import React, { useState, useEffect, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import FormContainer from "@/Components/FormContainer";
import Arsip from "./Arsip";
import ArsipSeminar from "./ArsipSeminar";

export default function Table({
    auth,
    ruangan,
    ruanganseminar,
    arsip,
    arsipseminar,
}) {
    const [change, setChange] = useState(false);
    const refChange = useRef(null);
    return (
        <Authenticated auth={auth} errors={auth.errors}>
            <Head title="Arsip" />

            <FormContainer>
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-lg text-blueGray-700">
                                Kelola Ruangan
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div
                        className="relative w-full px-4 max-w-full flex-grow flex-1 bg-green-400 rounded-t"
                        ref={refChange}
                    >
                        <button
                            className={
                                change
                                    ? "bg-green-400 text-white hover:bg-green-500 object-center px-4 py-3 rounded-t shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 ease-linear"
                                    : "bg-white text-grey-200 active:bg-green-400 active:text-white hover:bg-green-500 object-center px-4 py-3 rounded-t shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 ease-linear"
                            }
                            onClick={() => setChange((change) => false)}
                        >
                            Ruang Umum
                        </button>

                        <button
                            className={
                                !change
                                    ? "bg-green-400 text-white hover:bg-green-500 object-center px-4 py-3 rounded-t shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 ease-linear"
                                    : "bg-white text-grey-200 active:bg-green-400 active:text-white hover:bg-green-500 object-center px-4 py-3 rounded-t shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 ease-linear"
                            }
                            onClick={() => setChange((change) => true)}
                        >
                            Ruangan Seminar
                        </button>
                    </div>
                </div>
                {change ? (
                    <ArsipSeminar
                        data={arsipseminar}
                        ruangan={ruanganseminar}
                    />
                ) : (
                    <Arsip data={arsip} ruangan={ruangan} />
                )}
            </FormContainer>
        </Authenticated>
    );
}
