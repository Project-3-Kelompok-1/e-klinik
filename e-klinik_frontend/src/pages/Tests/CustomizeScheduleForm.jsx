import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { appointments } from "./demo-data/appointment";
import { AppointmentForm, Appointments, DayView, Scheduler } from "@devexpress/dx-react-scheduler-material-ui";
import { EditingState, IntegratedEditing, ViewState } from "@devexpress/dx-react-scheduler";
import { Box } from "@mui/material";
const TextEditor = (props) => {
    if (props.type === 'multilineTextEditor') {
        return null
    }
    return <AppointmentForm.TextEditor {...props} />
}
const BooleanEditor = (props) => {
    console.log("Boolean Editor Type " + props.type)
    return null
}
const BasicLayoutComponent = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ customField: nextValue })
    }
    return (
        <AppointmentForm.BasicLayout

            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Box>
                    <AppointmentForm.Label
                        text="Custom Field"
                        type="titleLabel"
                    />
                    <AppointmentForm.TextEditor
                        placeholder="Custom Field"
                        value={appointmentData.customField}
                        onValueChange={onCustomFieldChange}
                    />
                </Box>
            </Box>
        </AppointmentForm.BasicLayout>
    )
}
const CustomizeScheduleForm = () => {
    const [data, setData] = useState(appointments);
    const [currentDate, setCurrentDate] = useState('2018-06-27');
    return (
        <>
            <Paper>
                <Scheduler
                    data={data}
                >
                    <ViewState
                        currentDate={currentDate}
                    />
                    <EditingState />
                    <IntegratedEditing />
                    <DayView
                        startDayHour={9}
                        endDayHour={15}
                    />
                    <Appointments />
                    {/* <EditingState /> */}
                    {/* <IntegratedEditing /> */}
                    <AppointmentForm
                        basicLayoutComponent={BasicLayoutComponent}
                        textEditorComponent={TextEditor}
                        // booleanEditorComponent={BooleanEditor}
                    />
                </Scheduler>
            </Paper>
        </>
    )
}
export default CustomizeScheduleForm