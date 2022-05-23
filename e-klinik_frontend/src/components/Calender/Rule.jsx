import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui"

const Rule = ({ ...restProps }) => {
    return (
        <AppointmentForm.WeeklyRecurrenceSelector 
            {...restProps}
        />
    )
}