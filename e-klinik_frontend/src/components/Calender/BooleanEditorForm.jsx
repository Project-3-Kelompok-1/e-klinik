import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";
const BooleanEditorForm = (props) => {
    if (props.label === "All Day") {
        return null
    }
    return <AppointmentForm.BooleanEditor {...props} />
}
export default BooleanEditorForm