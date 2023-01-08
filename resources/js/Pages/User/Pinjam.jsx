import { React, useState, useEffect, useRef } from "react";
import Index from "../Index";
import { Head, useForm } from "@inertiajs/inertia-react";
import { DateRange } from "react-date-range";
import InputError from "@/Components/InputError";
import format from "date-fns/format";
import Select from "react-select";
import { addDays, isWeekend } from "date-fns";

// import DateRangePicker from "flowbite-datepicker"

export default function Pinjam({ auth, ruangan }) {
    const { data, setData, key, post, errors, reset } = useForm({
        nama_ruangan: ruangan.nama_ruangan,
        nama_peminjam: "",
        nim: "",
        keterangan: "",
        tanggal_peminjaman: [],
        waktu_peminjaman: "",
        sesi: "",
        preserveScroll: true,
    });

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    function calcWeekends(startDate, endDate) {
        if (startDate > endDate) return false;
        var date = startDate;
        var dates = [];

        while (date < endDate) {
            if (isWeekend(date)) dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    const disabledDates = calcWeekends(new Date(), addDays(new Date(), 100));

    function handleSelect(date) {
        setData("tanggal_peminjaman", format(date, "yyyy-MM-dd"));
    }
    // open close
    const [open, setOpen] = useState(false);

    const refOne = useRef(null);

    useEffect(() => {
        document.addEventListener("click", hiddenOnClickOutside, true);
        setData("tanggal_peminjaman", format(new Date(), "yyyy-MM-dd"));
    }, []);

    const hiddenOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false);
        }
    };

    const opsi = [
        { value: "Sesi 1", label: "Sesi 1 : 07:00 - 10:00" },
        { value: "Sesi 2", label: "Sesi 2 : 10:00 - 14:00" },
        { value: "Sesi 3", label: "Sesi 3 : 14:00 - 17:00" },
    ];

    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 13);

    function submit(e) {
        e.preventDefault();
        post(route("pinjam.store"));
    }

    return (
        <Index
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengajuan
                </h2>
            }
        >
            <Head title="Pinjam" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-auto">
                        {/* Top */}
                        <div className="py-12">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6 bg-white border-b border-gray-200">
                                        <form
                                            onSubmit={submit}
                                            encType="multipart/form-data"
                                            action={route("pinjam.store")}
                                        >
                                            <input
                                                type="hidden"
                                                name="_token"
                                                value="{{ csrf_token() }}"
                                            />
                                            <div className="mb-4">
                                                <label
                                                    className="text-xl text-gray-600"
                                                    htmlFor="ruangan"
                                                >
                                                    Ruangan yang ingin dipinjam{" "}
                                                    <b>
                                                        {ruangan.nama_ruangan}
                                                    </b>
                                                </label>
                                            </div>
                                            <div className="mb-4 flex flex-wrap -mx-3">
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label
                                                        className="text-xl text-gray-600"
                                                        htmlFor="nama_peminjam"
                                                    >
                                                        Nama
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        id="nama_peminjam"
                                                        name="nama_peminjam"
                                                        placeholder="Masukkan Nama Anda"
                                                        className="border-2 border-gray-300 p-2 w-full rounded"
                                                        onChange={(e) =>
                                                            setData(
                                                                "nama_peminjam",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.nama_peminjam
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                {/* {errors.nama_depan && <div>{errors.nama_depan}</div>} */}
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label
                                                        className="text-xl text-gray-600"
                                                        htmlFor="nim"
                                                    >
                                                        NIM
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        id="nim"
                                                        name="nim"
                                                        placeholder="Masukkan NIM Anda"
                                                        className="border-2 border-gray-300 p-2 w-full rounded"
                                                        onChange={(e) =>
                                                            setData(
                                                                "nim",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    className="text-xl text-gray-600"
                                                    htmlFor="keterangan"
                                                >
                                                    Keterangan
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <br />
                                                <input
                                                    type="text"
                                                    id="keterangan"
                                                    name="keterangan"
                                                    placeholder="Masukkan Tujuan Peminjaman Ruangan, dan Rekomendasi Jika Ada"
                                                    className="border-2 border-gray-300 p-2 w-full rounded"
                                                    onChange={(e) =>
                                                        setData(
                                                            "keterangan",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                {/* {errors.keterangan && <div>{errors.keterangan}</div>} */}
                                            </div>
                                            <div className="mb-4 flex flex-wrap -mx-3">
                                                <div className="w-full md:w-1/2 px-3 relative">
                                                    <label
                                                        className="text-xl text-gray-600"
                                                        // htmlFor="tanggal_peminjaman"
                                                    >
                                                        Tanggal Peminjaman
                                                    </label>
                                                    <br />
                                                    <input
                                                        value={
                                                            data.tanggal_peminjaman
                                                        }
                                                        type="button"
                                                        readOnly
                                                        className="border-2 border-gray-300 p-2 w-full rounded"
                                                        onClick={() =>
                                                            setOpen(
                                                                (open) => !open
                                                            )
                                                        }
                                                    />
                                                    <div ref={refOne}>
                                                        {open && (
                                                            <DateRange
                                                                className="relative border-2 border-blue-400 rounded"
                                                                minDate={
                                                                    new Date()
                                                                }
                                                                maxDate={
                                                                    twoWeeksFromNow
                                                                }
                                                                disabledDates={
                                                                    disabledDates
                                                                }
                                                                weekStartsOn={0}
                                                                ranges={range}
                                                                months={1}
                                                                direction="horizontal"
                                                                onChange={(
                                                                    item
                                                                ) => {
                                                                    setRange([
                                                                        item.selection,
                                                                    ]);
                                                                    setData(
                                                                        "tanggal_peminjaman",
                                                                        format(
                                                                            item
                                                                                .selection
                                                                                .startDate,
                                                                            "yyyy-MM-dd"
                                                                        )
                                                                    );
                                                                    setOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="relative w-full md:w-1/2 px-3">
                                                    <label
                                                        className="text-xl text-gray-600"
                                                        htmlFor="waktu_peminjaman"
                                                    >
                                                        Waktu Peminjaman
                                                    </label>
                                                    <div>
                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            name="waktu"
                                                            options={opsi}
                                                            onChange={(
                                                                options
                                                            ) => {
                                                                setData(
                                                                    "waktu_peminjaman",
                                                                    options.value
                                                                );
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={errors.sesi}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="h-36"></div>
                                            <div className="flex p-1">
                                                <button
                                                    type="submit"
                                                    className="p-3 bg-blue-500 text-white hover:bg-blue-400 rounded"
                                                    onClick={(e) =>
                                                        setData(
                                                            "sesi",
                                                            `${data.nama_ruangan},${data.tanggal_peminjaman},${data.waktu_peminjaman}`
                                                        )
                                                    }
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Index>
    );
}
