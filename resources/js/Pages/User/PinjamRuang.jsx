import { React, useState, useEffect, useRef } from "react";
import Index from "../Index";
import { Head, useForm, Link } from "@inertiajs/inertia-react";
import Select from "react-select";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import CalendarRuang from "./CalendarRuang";
// import DateRangePicker from "flowbite-datepicker"

// import { options } from "laravel-mix";

export default function PinjamRuang({ auth, ruangan }) {
    // Time Picker Awal
    const [jamAwal, setJamAwal] = useState("07:00");
    // Time Picker Akhir
    const [jamAkhir, setJamAkhir] = useState("17:00");

    // date picker today
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const handleChange = () => {
        setData(
            "tanggal_selesai_peminjaman",
            format(range[0].endDate, "dd-MM-yyyy")
        );
    };

    console.log("foto", ruangan);

    return (
        <Index
            auth={auth}
            errors={auth.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pinjam Ruang
                </h2>
            }
        >
            <Head title="Ruang Umum" />

            {/* Page  */}
            <div className="py-5">
                {/* Container  */}
                <div className="max-w-8xl mx-auto flex flex-wrap">
                    {/* Wrapper  */}
                    <div className="w-1/2 lg:w-5/12 pl-3">
                        {/* Left Panel  */}

                        <CalendarRuang />
                    </div>
                    <div className="w-1/2 lg:w-7/12  object-right text-right">
                        <table>
                            <div className="grid grid-cols-3 text-center justify-between">
                                {ruangan.map((list) => (
                                    <div
                                        key={list}
                                        className="relative carousel-item w-64 px-4"
                                    >
                                        <Link
                                            href={route(
                                                "pengajuan",
                                                list.id_ruangan
                                            )}
                                        >
                                            <div className="hover:-mt-4 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow rounded-lg ease-linear transition-all duration-150">
                                                <img
                                                    style={{
                                                        height: "125px",
                                                    }}
                                                    alt="..."
                                                    src={
                                                        "storage/img/" +
                                                        list.foto_ruangan
                                                    }
                                                    className="w-full align-middle rounded-t-lg"
                                                />
                                                <blockquote className="p-8 mb-4">
                                                    <h1>{list.nama_ruangan}</h1>
                                                </blockquote>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        </Index>
    );
}
