import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalEvent from "@/Components/ModalEvent";

export default function CalendarRuang(auth) {
    const [showModal, setShowModal] = React.useState(false);
    const [showId, setShowId] = React.useState(null);
    const [showName, setShowName] = React.useState(null);
    const [showKet, setShowKet] = React.useState(null);
    const [showStart, setShowStart] = React.useState(null);
    const [showEnd, setShowEnd] = React.useState(null);
    const [showTimeStart, setShowTimeStart] = React.useState(null);
    const [showTimeEnd, setShowTimeEnd] = React.useState(null);

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

    const url = "/api/event";

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

    return (
        <>
            {/* <img
                    className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
                    src={require("storage/public/img/pattern_react.png").default}
                    alt="..."
                /> */}
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <Calendar
                    selectable
                    popup
                    localizer={localizer}
                    events={list}
                    onSelectEvent={(e) => {
                        setShowModal(e.title);
                        setShowId(e.id);
                        setShowName(e.nama_peminjam);
                        setShowKet(e.keterangan);
                        setShowStart(e.start);
                        setShowEnd(e.end);
                        setShowTimeStart(e.waktu_mulai);
                        setShowTimeEnd(e.waktu_selesai);
                    }}
                    views={views}
                    // onSelectSlot="
                    className="text-sm"
                    startAccessor="start"
                    timeslots={1}
                    endAccessor="end"
                    style={{ height: 600, margin: "20px" }}
                />
                <ModalEvent
                    onClose={() => setShowModal(false)}
                    showModal={showModal}
                    showId={showId}
                    showName={showName}
                    showKet={showKet}
                    showStart={showStart}
                    showEnd={showEnd}
                    showTimeStart={showTimeStart}
                    showTimeEnd={showTimeEnd}
                />
            </div>
        </>
    );
}
