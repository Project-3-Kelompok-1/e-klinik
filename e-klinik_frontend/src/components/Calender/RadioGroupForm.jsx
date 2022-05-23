import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";
const DateTimeForm = (props) => {
    return <AppointmentForm.DateEditor {...props} excludeTime={true} />
}
const RadioGroupForm = (props) => {
    if (props.type === 'endRepeat') {
        return <AppointmentForm.RadioGroup {...props} dateEditorComponent={DateTimeForm} />
    }
    return <AppointmentForm.RadioGroup {...props} />
}
export default RadioGroupForm