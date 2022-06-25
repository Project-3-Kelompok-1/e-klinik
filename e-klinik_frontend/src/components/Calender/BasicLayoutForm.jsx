import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui"

const BasicLayoutForm = ({ onFieldChange, appointmentData, ...restProps }) => {
    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        />
    )
}
export default BasicLayoutForm