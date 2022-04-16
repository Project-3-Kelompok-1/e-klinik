import { Toolbar } from "@mui/material";
import React, { useState } from "react";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import JadwalPraktekNav from "../../../components/Navigations/JadwalPraktekNav";
import { Paper } from "@mui/material";
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler, DayView, Appointments,
    WeekView, AppointmentTooltip, Toolbar as ToolbarSchedule, DateNavigator, TodayButton
} from '@devexpress/dx-react-scheduler-material-ui'

const schedulerData = [
    { startDate: '2022-04-16T08:00', endDate: '2022-04-16T09:00', title: 'Masuk kuliah' },
    { startDate: '2022-04-16T13:00', endDate: '2022-04-16T14:00', title: 'Ngerjain proyek' },
    { startDate: '2022-04-17T13:00', endDate: '2022-04-16T14:00', title: 'Ngerjain proyek' },
]
const JadwalPraktek = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    return (
        <Dashboard
            halaman="Jadwal Praktek"
        >
            <Toolbar />
            <JadwalPraktekNav />
            <Paper>
                <Scheduler
                    data={schedulerData}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={e => setCurrentDate(e)}
                    />
                    <WeekView
                        startDayHour={8}
                        endDayHour={16}
                        excludedDays={[0, 6]}
                    />
                    <ToolbarSchedule />
                    <DateNavigator />
                    <TodayButton 
                        component="span"
                    />
                    <Appointments />
                    <AppointmentTooltip />
                </Scheduler>
            </Paper>
        </Dashboard>
    )
}
export default JadwalPraktek;