import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalEvent from "@/Components/ModalEvent";

export default function CalendarSeminar(props) {
    const [showModal, setShowModal] = React.useState(false);
    const [showId, setShowId] = React.useState(null);
    const [showName, setShowName] = React.useState(null);
    const [showKet, setShowKet] = React.useState(null);
    const [showStart, setShowStart] = React.useState(null);
    const [showEnd, setShowEnd] = React.useState(null);
    const [showSesi, setShowSesi] = React.useState(null);

    const localizer = momentLocalizer(moment);

    const { views } = useMemo(
        () => ({
            views: {
                month: true,
            },
        }),
        []
    );

    const [list, setList] = useState([]);

    const url = "/api/event2";

    const fetchData = async () => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setList(json.data);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    let color = "#40BF46";

    const listRuangan = list
        .filter((ruang) => ruang.title.includes(props.room))
        .map((filterlist) => {
            if (filterlist.waktu_peminjaman == "Sesi 1") {
                color = "#40BF46";
            } else if (filterlist.waktu_peminjaman == "Sesi 2") {
                color = "#ECDF37";
            } else {
                color = "#E89F2C";
            }
            return {
                title: filterlist.title + " - " + filterlist.waktu_peminjaman,
                start: filterlist.start,
                end: filterlist.end,
                nama_peminjam: filterlist.nama_peminjam,
                waktu_peminjaman: filterlist.waktu_peminjaman,
                keterangan: filterlist.keterangan,
                backgroundColor: color,
            };
        });

    function sortA(a, b) {
        if (a.waktu_peminjaman < b.waktu_peminjaman) {
            return -1;
        }
        if (a.waktu_peminjaman > b.waktu_peminjaman) {
            return 1;
        }
        return 0;
    }
    console.log("data", listRuangan);

    return (
        <>
            <div className="bg-white overflow-hidden shadow-sm rounded-b-lg">
                <Calendar
                    selectable
                    showAllEvents
                    popup
                    localizer={localizer}
                    events={listRuangan.sort(sortA)}
                    onSelectEvent={(e) => {
                        setShowModal(e.title);
                        setShowId(e.id);
                        setShowName(e.nama_peminjam);
                        setShowKet(e.keterangan);
                        setShowStart(e.start);
                        setShowSesi(e.waktu_peminjaman);
                    }}
                    views={views}
                    // onSelectSlot="
                    startAccessor="start"
                    timeslots={1}
                    endAccessor="end"
                    className="text-sm"
                    style={{ height: 600, margin: "20px" }}
                    eventPropGetter={(e) => ({
                        style: { backgroundColor: e.backgroundColor },
                    })}
                />
                <ModalEvent
                    onClose={() => setShowModal(false)}
                    showModal={showModal}
                    showId={showId}
                    showName={showName}
                    showKet={showKet}
                    showStart={showStart}
                    showSesi={showSesi}
                />
            </div>
        </>
    );
}
