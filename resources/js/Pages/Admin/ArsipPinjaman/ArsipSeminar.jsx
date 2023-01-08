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
import Select from "react-select";
import makeAnimated from "react-select/animated";
import InputError from "@/Components/InputError";

export default function ArsipSeminar(props) {
    const { data, setData, key, post, errors, reset } = useForm({
        nama_ruangan: "Seminar 1",
        nama_peminjam: "",
        nim: "",
        keterangan: "",
        tanggal_peminjaman: [],
        waktu_peminjaman: "",
        sesi: "",
        preserveScroll: true,
    });

    const opsiRuangan = props.ruangan.map((list) => {
        return { value: list.nama_ruangan, label: list.nama_ruangan };
    });

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

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

    const animatedComponents = makeAnimated();

    const opsi = [
        { value: "Sesi 1", label: "Sesi 1 : 07:00 - 10:00" },
        { value: "Sesi 2", label: "Sesi 2 : 10:00 - 14:00" },
        { value: "Sesi 3", label: "Sesi 3 : 14:00 - 17:00" },
    ];

    function submit(e) {
        e.preventDefault();
        console.log("data", data);
        post("arsip/store", data, {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    }

    const [showModal, setShowModal] = React.useState(false);
    const [showId, setShowId] = React.useState(null);

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
                                    filename="Arsip Peminjaman Ruang Seminar"
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
                                                setData(
                                                    "nama_ruangan",
                                                    options.value
                                                )
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
                                            <InputError
                                                message={errors.nama_peminjam}
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
                                                value={data.tanggal_peminjaman}
                                                type="button"
                                                readOnly
                                                className="border-2 border-gray-300 p-2 w-full rounded"
                                                onClick={() =>
                                                    setOpen((open) => !open)
                                                }
                                            />
                                            <div ref={refOne}>
                                                {open && (
                                                    <DateRange
                                                        className="relative border-2 border-blue-400 rounded"
                                                        minDate={new Date()}
                                                        ranges={range}
                                                        months={1}
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
                                                            setData(
                                                                "tanggal_peminjaman",
                                                                format(
                                                                    item
                                                                        .selection
                                                                        .startDate,
                                                                    "yyyy-MM-dd"
                                                                )
                                                            );
                                                            setOpen(false);
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
                                                    className="relative basic-single"
                                                    classNamePrefix="select"
                                                    name="waktu"
                                                    options={opsi}
                                                    onChange={(options) => {
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
                                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-5 whitespace-nowrap">
                                                    <span
                                                        className="ml-3 font-bold text-blueGray-600 object-center"
                                                        key={list.id}
                                                    >
                                                        {list.id}
                                                    </span>
                                                </td>
                                                <td
                                                    className="py-3 px-5 text-center "
                                                    key={list.nama_ruangan}
                                                >
                                                    <span>
                                                        {list.nama_ruangan}
                                                    </span>
                                                </td>
                                                <td
                                                    className="py-3 px-5 text-center "
                                                    key={list.nama_peminjam}
                                                >
                                                    <span>
                                                        {list.nama_peminjam}
                                                    </span>
                                                </td>
                                                <td
                                                    className="py-3 px-5 w-30 objects-center"
                                                    key={list.keterangan}
                                                >
                                                    <span>
                                                        <p>{list.keterangan}</p>
                                                    </span>
                                                </td>
                                                <td
                                                    className="py-3 px-5 object-center"
                                                    key={
                                                        list.tanggal_mulai_peminjaman
                                                    }
                                                >
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
                                                            setShowModal(
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
