import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import CardStats from "@/Components/CardStats";
import CalendarRuang from "./User/CalendarRuang";
import CalendarSeminar from "./User/CalendarSeminar";

export default function Dashboard({
    auth,
    pengajuan_pinjams,
    arsip_peminjamen,
    ruangans,
    arsip_seminars,
}) {
    return (
        <Authenticated
            auth={auth}
            // header={<h2 className="relative md:ml-64 font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="px-4 py-6 md:px-10 mx-auto w-full">
                <div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <CardStats
                                statSubtitle="ARSIP"
                                statTitle={arsip_peminjamen}
                                statLink="/arsip"
                                statIconName="fa-solid fa-book"
                                statIconColor="bg-green-400"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <CardStats
                                statSubtitle="ARSIP SEMINAR"
                                statTitle={arsip_seminars}
                                statLink="/arsip"
                                statIconName="fa-solid fa-user"
                                statIconColor="bg-red-500"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <CardStats
                                statSubtitle="PENGAJUAN"
                                statTitle={pengajuan_pinjams}
                                statLink="/pinjamanmasuk"
                                statIconName="fa-solid fa-bell"
                                statIconColor="bg-yellow-300"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <CardStats
                                statSubtitle="RUANGAN"
                                statTitle={ruangans}
                                statLink="/dataruangan/table"
                                statIconName="far fa-chart-bar"
                                statIconColor="bg-blue-500"
                            />
                        </div>
                    </div>
                </div>
                <div className=" mt-3">
                    <span className="text-white">Ruang Umum</span>
                    <CalendarRuang />
                </div>
            </div>
        </Authenticated>
    );
}
