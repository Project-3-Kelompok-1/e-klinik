import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

const TextEditorForm = (props) => {
    if (props.type === 'multilineTextEditor') {
        return null;
    } return <AppointmentForm.TextEditor {...props} />;
};
export default TextEditorForm