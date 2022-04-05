import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"
import { Button } from "@mui/material";
const Calenders = () => {
    return (
        <>
            <FullCalendar
                initialView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                events={[
                    {
                        title: 'Event 1', date: '2022-03-24'
                    }
                ]}
                weekends={false}
                dateClick={(arg) => {
                    alert(arg.dateStr)
                }}
                eventContent={EventContent}
                eventMouseEnter={(info) => {
                    alert(info.event.title);
                }}
            />
        </>
    )
}
const EventContent = (eventInfo) => {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}
export default Calenders;