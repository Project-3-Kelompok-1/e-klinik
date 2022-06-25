import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";
import SelectRepeat from "./SelectRepeat";
import RadioGroupForm from "./RadioGroupForm";
const RecurrenceLayoutForm = (props) => {
    return <AppointmentForm.RecurrenceLayout {...props} selectComponent={SelectRepeat} radioGroupComponent={RadioGroupForm} />
}
export default RecurrenceLayoutForm