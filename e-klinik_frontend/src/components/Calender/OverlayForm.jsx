import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui"

const OverlayForm = ({ ...restProps }) => {
    return (
        <AppointmentForm.Overlay
            {...restProps}
            fullSize={true}
        />
    )
}
export default OverlayForm