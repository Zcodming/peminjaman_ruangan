import React, { useState, useEffect, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faEye,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import ModalSurat from "@/Components/ModalSurat";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import id from "date-fns/locale/id";
import TimeKeeper from "react-timekeeper";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function Arsip(props) {
    const { data, setData, key, post, progress, processing, errors, reset } =
        useForm({
            nama_ruangan: [],
            nama_peminjam: "",
            keterangan: "",
            tanggal_mulai_peminjaman: [],
            tanggal_selesai_peminjaman: [],
            waktu_mulai_peminjaman: [],
            waktu_selesai_peminjaman: [],
            durasi_pinjam: "",
            surat_pdf: [],
            preserveScroll: true,
        });

    function preview(e) {
        setData("surat_pdf", e.target.files[0]);
        iframe.src = URL.createObjectURL(e.target.files[0]);
    }

    const opsiRuangan = props.ruangan.map((list) => {
        return { value: list.nama_ruangan, label: list.nama_ruangan };
    });

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    // Time Picker Awal
    const [timeStart, setTimeStart] = useState("00:00");
    const [timeEnd, setTimeEnd] = useState("00:00");

    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);

    // date picker today
    const [range, setRange] = useState([
        // jarak pilih tanggal
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const [open, setOpen] = useState(false); // Buka Pilih Tanggal
    const refOne = useRef(null);

    useEffect(() => {
        document.addEventListener("click", hiddenOnClickOutside, true);
        setStartTime(data.waktu_mulai_peminjaman);
        setEndTime(data.waktu_selesai_peminjaman);
    }, []);

    const hiddenOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpenStart(false);
            setOpenEnd(false);
        }
    };

    const animatedComponents = makeAnimated();

    const [dateEnd, setDateEnd] = useState("");

    const threeWeeksFromNow = new Date();
    threeWeeksFromNow.setDate(threeWeeksFromNow.getDate() + 20);

    function submit(e) {
        e.preventDefault();
        console.log("data", data);
        post("arsip/add", data, {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    }

    const [showModal, setShowModal] = React.useState(false);
    const [showId, setShowId] = React.useState(null);
    const [showSurat, setShowSurat] = React.useState("");

    const [add, setAdd] = useState(false);
    const refAdd = useRef(null);

    const tableRef = useRef(null);

    const [sortState, setSortState] = useState("terbaru");
    const sortMethods = {
        terbaru: (a, b) => b.id - a.id,
        terlama: (a, b) => a.id - b.id,
    };

    const [name, setName] = useState("");
    // the search result
    const [foundTanggal, setFoundTanggal] = useState(props.data);

    const filter = (e) => {
        const keyword = e.target.value;
        if (keyword !== "") {
            const results = props.data.filter((list) => {
                return list.tanggal_mulai_peminjaman
                    ?.toLowerCase()
                    .startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFoundTanggal(results);
            console.log(results);
        } else {
            setFoundTanggal(props.data);
            // If the text field is empty, show all users
        }

        setName(keyword);
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-lg text-blueGray-700">
                                Arsip Peminjaman Ruangan
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
                                    Tambah Data
                                </button>
                            )}
                        </div>
                        {add ? (
                            <input hidden /> // fix this
                        ) : (
                            <div>
                                <DownloadTableExcel
                                    filename="Arsip Peminjaman Ruangan"
                                    sheet="arsip"
                                    currentTableRef={tableRef.current}
                                >
                                    <button
                                        type="button"
                                        className="bg-green-400 text-white hover:bg-green-500 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                    >
                                        Export ke Excel
                                    </button>
                                </DownloadTableExcel>
                                {/* Filter Tanggal */}
                                <input
                                    type="text"
                                    placeholder="Filter Tanggal"
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    style={{ width: "200px" }}
                                    title="Filter Tanggal"
                                    value={name}
                                    onChange={(e) => filter(e)}
                                    className="input rounded mr-2"
                                />
                                <select
                                    defaultValue={"terbaru"}
                                    className="rounded"
                                    onChange={(e) =>
                                        setSortState(e.target.value)
                                    }
                                >
                                    <option value="terbaru">
                                        sortir - terbaru
                                    </option>
                                    <option value="terlama">
                                        sortir - terlama
                                    </option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                <div className="block w-full overflow-x-auto" ref={refAdd}>
                    {add ? (
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
                                            Ruangan yang ingin dipinjam
                                        </label>
                                        <Select
                                            id="nama_ruangan"
                                            name="nama_ruangan"
                                            className="basic-single"
                                            classNamePrefix="select"
                                            components={animatedComponents}
                                            options={opsiRuangan}
                                            onChange={(options) =>
                                                setData("nama_ruangan", options)
                                            }
                                        />
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
                                                    setOpen((open) => !open)
                                                }
                                            />
                                            <div ref={refOne}>
                                                {open && (
                                                    <DateRange
                                                        className="absolute border-2 border-blue-400 rounded"
                                                        minDate={new Date()} // Disable past date
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
                                                        onChange={(item) => {
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
                                                        value={timeStart}
                                                        readOnly
                                                        className="border-2 border-gray-300 p-2 w-full rounded"
                                                        onClick={() =>
                                                            setOpenStart(
                                                                (openStart) =>
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
                                                                time={timeStart}
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
                                                                (openEnd) =>
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
                                                                time={timeEnd}
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
                                                            Upload a file
                                                        </span>

                                                        <input
                                                            type="file"
                                                            id="pengajuan_pdf"
                                                            onChange={preview}
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
                                                value={progress.percentage}
                                                max="100"
                                            >
                                                {progress.percentage}%
                                            </progress>
                                        )}
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
                                    <th className="py-3 px-5 text-center w-20">
                                        No
                                    </th>
                                    <th className="py-3 px-5 text-center mx-auto">
                                        Ruangan
                                    </th>
                                    <th className="py-3 px-5 text-center max-w-md mx-auto">
                                        Nama Peminjam
                                    </th>
                                    <th className="py-3 px-5 text-center mx-auto ">
                                        Keterangan
                                    </th>
                                    <th className="py-3 px-5 text-center mx-auto ">
                                        Tanggal Peminjaman
                                    </th>
                                    <th className="py-3 px-5 text-center mx-auto ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {foundTanggal && foundTanggal.length > 0 ? (
                                    foundTanggal
                                        .sort(sortMethods[sortState])
                                        .map((list) => (
                                            <tr
                                                key={list.id}
                                                className="list border-b border-gray-200 hover:bg-gray-100"
                                            >
                                                <td className="list-id py-3 px-5 whitespace-nowrap">
                                                    <span className="ml-3 font-bold text-blueGray-600 object-center">
                                                        {list.id}
                                                    </span>
                                                </td>
                                                <td className="list-nama_ruangan py-3 px-5 text-center ">
                                                    <span>
                                                        {list.nama_ruangan}
                                                    </span>
                                                </td>
                                                <td className="list-name py-3 px-5 text-center ">
                                                    <span>
                                                        {list.nama_peminjam}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-5 w-30 objects-center">
                                                    <span>
                                                        <p>{list.keterangan}</p>
                                                    </span>
                                                </td>
                                                <td className="py-3 px-5 object-center ">
                                                    <span>
                                                        <p>
                                                            {
                                                                list.tanggal_mulai_peminjaman
                                                            }{" "}
                                                            hingga{" "}
                                                            {
                                                                list.tanggal_selesai_peminjaman
                                                            }
                                                        </p>
                                                    </span>
                                                </td>
                                                <td
                                                    className="py-3 px-5 text-center flex item-center justify-center"
                                                    key={list.surat_pdf}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setShowModal(true);
                                                            setShowSurat(
                                                                list.surat_pdf
                                                            );
                                                            setShowId(list.id);
                                                        }}
                                                        className="bg-yellow-300 text-white hover:bg-yellow-400 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear"
                                                    >
                                                        {/* View */}
                                                        {/* {list.surat_pdf} */}
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                        />
                                                    </button>
                                                    <ModalSurat
                                                        onClose={() =>
                                                            setShowModal(false)
                                                        }
                                                        showModal={showModal}
                                                        showSurat={showSurat}
                                                        showId={showId}
                                                        title={
                                                            "Surat Peminjaman"
                                                        }
                                                        // details={pinjamanmasuk}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <h1>No results found!</h1>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div className="mt-4">
                {props.data.map((link) => (
                    <Link href={link.url} className="px-1">
                        {link.label}
                    </Link>
                ))}
            </div>
        </>
    );
}
