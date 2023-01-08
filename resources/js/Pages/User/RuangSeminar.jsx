import { React, useState, useEffect, useRef } from "react";
import Index from "../Index";
import { Head, useForm, Link } from "@inertiajs/inertia-react";
import Select from "react-select";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import CalendarSeminar from "./CalendarSeminar";
// import DateRangePicker from "flowbite-datepicker"

// import { options } from "laravel-mix";

export default function RuangSeminar({ auth, ruangseminar }) {
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

    // console.log(ruangseminar);

    const handleChange = () => {
        setData(
            "tanggal_selesai_peminjaman",
            format(range[0].endDate, "dd-MM-yyyy")
        );
    };

    let count = 0;
    const [num, setNum] = useState("1");
    const [room, setRoom] = useState("Seminar 1");
    const [change, setChange] = useState("1");
    const refChange = useRef(null);

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
            <Head title="Ruang Seminar" />

            {/* Page  */}
            <div className="py-5">
                {/* Container  */}
                {/* <div className="max-w-8xl mx-auto"> */}
                {change == num ? (
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <div className="ml-3">
                            {ruangseminar.map((list) => (
                                <button
                                    count={count++}
                                    className={
                                        change == list.id_ruangan
                                            ? "bg-white text-grey-200 hover:bg-green-500 object-center px-4 py-3 rounded-t hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 ease-linear"
                                            : "bg-green-400 text-white hover:bg-green-500 object-center px-4 py-3 rounded-t shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 ease-linear"
                                    }
                                    onClick={() => (
                                        setChange(list.id_ruangan),
                                        setNum(list.id_ruangan),
                                        setRoom(list.nama_ruangan)
                                    )}
                                >
                                    {list.nama_ruangan}
                                </button>
                            ))}
                        </div>
                        <div className="relative flex justify-end object-right px-10 pt-4 bg-white rounded-t-lg">
                            <Link
                                className="bg-green-400 text-white hover:bg-green-500 px-4 py-3 rounded shadow hover:shadow-lg"
                                href={route("pinjam", change)}
                            >
                                Pinjam Ruang Sidang
                            </Link>
                        </div>

                        <div style={{ width: "100%" }}>
                            <CalendarSeminar room={room} />
                        </div>
                    </div>
                ) : (
                    <p>error</p>
                )}
            </div>
            {/* <div className="w-1/2 lg:w-7/12 px-4">
                        <table>
                            <div className="grid grid-cols-3 text-center justify-between">
                                {ruangseminar.map((list) => (
                                    <div
                                        key={list}
                                        className="carousel-item w-64 px-4"
                                    >
                                        <Link
                                            href={route(
                                                "pinjam",
                                                list.id_ruangan
                                            )}
                                        >
                                            <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
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
                                                <blockquote className="relative p-8 mb-4">
                                                    <h1>{list.nama_ruangan}</h1>
                                                </blockquote>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </table>
                    </div> */}
            {/* </div> */}
        </Index>
    );
}
