import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import classNames from 'clsx';
import DeleteIcon from "@mui/icons-material/Delete";
const PREFIX = 'Demo';

const classes = {
    icon: `${PREFIX}-icon`,
    textCenter: `${PREFIX}-textCenter`,
    firstRoom: `${PREFIX}-firstRoom`,
    secondRoom: `${PREFIX}-secondRoom`,
    thirdRoom: `${PREFIX}-thirdRoom`,
    header: `${PREFIX}-header`,
    commandButton: `${PREFIX}-commandButton`,
};
const StyledIconButton = styled(IconButton)(() => ({
    [`&.${classes.commandButton}`]: {
        backgroundColor: 'rgba(255,255,255,0.65)',
    },
}));
const TooltipHeader = (({children, appointmentData, ...restProps}) => {
    return (
        <AppointmentTooltip.Header
            // className={classes.header}
            {...restProps}
            appointmentData={appointmentData}
            style={{alignItems: 'center'}}
        >
            <StyledIconButton
                onClick={() => alert(JSON.stringify(appointmentData))}
                className={classes.commandButton}
            >
                <DeleteIcon />
            </StyledIconButton>
        </AppointmentTooltip.Header>
    )
})
export default TooltipHeader