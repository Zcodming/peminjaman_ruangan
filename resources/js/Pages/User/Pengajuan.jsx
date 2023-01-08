import { React, useState, useEffect, useRef } from "react";
import Index from "../Index";
import { Head, useForm } from "@inertiajs/inertia-react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import id from "date-fns/locale/id";
import TimeKeeper from "react-timekeeper";
// import DateRangePicker from "flowbite-datepicker"

export default function Pengajuan({ auth, ruangan }) {
    let email;
    if (auth.user) {
        email = auth.user.email;
    }

    const { data, setData, key, post, progress, processing, errors, reset } =
        useForm({
            nama_ruangan: ruangan.nama_ruangan,
            nama_peminjam: "",
            email_peminjam: email,
            keterangan: "",
            tanggal_mulai_peminjaman: [],
            tanggal_selesai_peminjaman: [],
            waktu_mulai_peminjaman: [],
            waktu_selesai_peminjaman: [],
            // durasi_pinjam: "",
            pengajuan_pdf: [],
            preserveScroll: true,
        });

    const [dateEnd, setDateEnd] = useState("");

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    console.log(startTime);

    function preview(e) {
        setData("pengajuan_pdf", e.target.files[0]);
        iframe.src = URL.createObjectURL(e.target.files[0]);
    }

    const [timeStart, setTimeStart] = useState("00:00");
    const [timeEnd, setTimeEnd] = useState("00:00");

    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);

    // date picker today
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    // open close
    const [open, setOpen] = useState(false);

    const refOne = useRef(null);

    useEffect(() => {
        document.addEventListener("click", hiddenOnClickOutside, true);
        setStartTime(data.waktu_mulai_peminjaman);
        setEndTime(data.waktu_selesai_peminjaman);
    }, []);

    const hiddenOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            // setOpen(false);
            setOpenStart(false);
            setOpenEnd(false);
        }
    };

    const threeWeeksFromNow = new Date();
    threeWeeksFromNow.setDate(threeWeeksFromNow.getDate() + 20);

    function submit(e) {
        e.preventDefault();
        console.log("pengajuan_pdf", data);
        post(route("pengajuan.store"), data, {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    }

    return (
        <Index
            auth={auth}
            errors={auth.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengajuan
                </h2>
            }
        >
            <Head title="Pengajuan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Top */}
                        <div className="py-12">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6 bg-white border-b border-gray-200">
                                        <form
                                            onSubmit={submit}
                                            encType="multipart/form-data"
                                            action={route("pengajuan.store")}
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
                                                </div>
                                                {/* {errors.nama_depan && <div>{errors.nama_depan}</div>} */}
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label
                                                        className="text-xl text-gray-600"
                                                        htmlFor="email_peminjam"
                                                    >
                                                        Email
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        id="email_peminjam"
                                                        name="email_peminjam"
                                                        defaultValue={email}
                                                        placeholder="Masukkan Email Anda"
                                                        className="border-2 border-gray-300 p-2 w-full rounded"
                                                        onChange={(e) =>
                                                            setData(
                                                                "email_peminjam",
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
                                                <div className="w-full md:w-1/2 px-3">
                                                    <label
                                                        className="text-xl text-gray-600"
                                                        // htmlFor="tanggal_peminjaman"
                                                    >
                                                        Tanggal Peminjaman
                                                    </label>
                                                    <br />
                                                    <input
                                                        type="button"
                                                        value={`${format(
                                                            range[0].startDate,
                                                            "PPP",
                                                            { locale: id }
                                                        )} sampai ${format(
                                                            range[0].endDate,
                                                            "PPP",
                                                            { locale: id }
                                                        )}`}
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
                                                                className="absolute border-2 border-blue-400 rounded"
                                                                minDate={
                                                                    new Date()
                                                                } // Disable past date
                                                                maxDate={
                                                                    threeWeeksFromNow
                                                                } // Disable future date
                                                                ranges={range}
                                                                months={2}
                                                                // disabledDates={[
                                                                //     new Date(
                                                                //         "2022/11/11"
                                                                //     ),
                                                                // ]}
                                                                direction="horizontal"
                                                                onChange={(
                                                                    item
                                                                ) => {
                                                                    setRange([
                                                                        item.selection,
                                                                    ]);
                                                                    setDateEnd(
                                                                        format(
                                                                            item
                                                                                .selection
                                                                                .endDate,
                                                                            "yyyy-MM-dd"
                                                                        )
                                                                    );
                                                                    setData(
                                                                        "tanggal_mulai_peminjaman",
                                                                        format(
                                                                            item
                                                                                .selection
                                                                                .startDate,
                                                                            "yyyy-MM-dd"
                                                                        )
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="w-full md:w-1/2 px-3">
                                                    <label
                                                        className="text-xl text-gray-600"
                                                        htmlFor="waktu_peminjaman"
                                                    >
                                                        Waktu Peminjaman
                                                    </label>
                                                    <div className="flex flex-wrap ">
                                                        <div className="md:w-1/2 pr-3">
                                                            <input
                                                                type="button"
                                                                value={
                                                                    timeStart
                                                                }
                                                                readOnly
                                                                className="border-2 border-gray-300 p-2 w-full rounded"
                                                                onClick={() =>
                                                                    setOpenStart(
                                                                        (
                                                                            openStart
                                                                        ) =>
                                                                            !openStart
                                                                    )
                                                                }
                                                            />
                                                            <div
                                                                ref={refOne}
                                                                className="absolute"
                                                            >
                                                                {openStart && (
                                                                    <TimeKeeper
                                                                        time={
                                                                            timeStart
                                                                        }
                                                                        onChange={(
                                                                            newTime
                                                                        ) => {
                                                                            setTimeStart(
                                                                                newTime.formatted24
                                                                            );
                                                                            setData(
                                                                                "waktu_mulai_peminjaman",
                                                                                newTime.formatted24
                                                                            );
                                                                        }}
                                                                        disabledTimeRange={{
                                                                            from: "20:00",
                                                                            to: "6:00",
                                                                        }}
                                                                        forceCoarseMinutes
                                                                        hour24Mode
                                                                        coarseMinutes={
                                                                            15
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="md:w-1/2 pl-3">
                                                            <input
                                                                type="button"
                                                                readOnly
                                                                value={timeEnd}
                                                                className="border-2 border-gray-300 p-2 w-full rounded"
                                                                onClick={() =>
                                                                    setOpenEnd(
                                                                        (
                                                                            openEnd
                                                                        ) =>
                                                                            !openEnd
                                                                    )
                                                                }
                                                            />
                                                            <div
                                                                ref={refOne}
                                                                className="absolute"
                                                            >
                                                                {openEnd && (
                                                                    <TimeKeeper
                                                                        time={
                                                                            timeEnd
                                                                        }
                                                                        onChange={(
                                                                            newTime
                                                                        ) => {
                                                                            setTimeEnd(
                                                                                newTime.formatted24
                                                                            );
                                                                            setData(
                                                                                "waktu_selesai_peminjaman",
                                                                                newTime.formatted24
                                                                            );
                                                                        }}
                                                                        disabledTimeRange={{
                                                                            from: "20:00",
                                                                            to: "7:00",
                                                                        }}
                                                                        forceCoarseMinutes
                                                                        hour24Mode
                                                                        coarseMinutes={
                                                                            15
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-xl text-gray-600">
                                                    Surat Peminjaman
                                                </label>
                                                <div className="mb-4 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <div className="text-sm text-gray-600">
                                                            <label
                                                                htmlFor="pengajuan_pdf"
                                                                className="cursor-pointer bg-indigo-600 rounded-md font-medium text-white hover:text-gray-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <span>
                                                                    Upload a
                                                                    file
                                                                </span>

                                                                <input
                                                                    type="file"
                                                                    id="pengajuan_pdf"
                                                                    onChange={
                                                                        preview
                                                                    }
                                                                    className="sr-only"
                                                                />
                                                            </label>
                                                        </div>
                                                        <p className="text-xs">
                                                            PDF maksimal 2MB
                                                        </p>
                                                        <iframe
                                                            src=""
                                                            id="iframe"
                                                            alt="pdf"
                                                            className="rounded-md"
                                                            style={{
                                                                width: "800px",
                                                                height: "400px",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex p-1">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="p-3 bg-blue-500 text-white hover:bg-blue-400 rounded"
                                                    onClick={() => {
                                                        setData(
                                                            "tanggal_selesai_peminjaman",
                                                            dateEnd
                                                        );
                                                    }}
                                                    processing={processing}
                                                >
                                                    Submit
                                                </button>
                                                {progress && (
                                                    <progress
                                                        value={
                                                            progress.percentage
                                                        }
                                                        max="100"
                                                    >
                                                        {progress.percentage}%
                                                    </progress>
                                                )}
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
