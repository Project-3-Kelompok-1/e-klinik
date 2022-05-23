import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
const SelectRepeat = (props) => {
    if (props.className === 'Layout-select') {
        const availableOptions = [
            { text: 'Daily', id: 'daily' },
            { text: 'Weekly', id: 'weekly' }
        ];
        return <AppointmentForm.Select {...props} availableOptions={availableOptions} />
    }
    return <AppointmentForm.Select {...props} />
}
export default SelectRepeat