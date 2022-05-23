import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui"

const BasicLayoutForm = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ customField: nextValue });
    };
    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        />
    )
}
export default BasicLayoutForm