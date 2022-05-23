import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import Person from "@mui/icons-material/Person";
import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Grid/Grid"
import { useEffect } from "react";
const PREFIX = 'Demo'

const classes = {
    icon: `${PREFIX}-icon`,
    textCenter: `${PREFIX}-textCenter`,
    firstRoom: `${PREFIX}-firstRoom`,
    secondRoom: `${PREFIX}-secondRoom`,
    thirdRoom: `${PREFIX}-thirdRoom`,
    header: `${PREFIX}-header`,
    commandButton: `${PREFIX}-commandButton`,
}
const StyledGrid = styled(Grid)(() => ({
    [`&.${classes.textCenter}`]: {
        textAlign: 'center',
    },
}));
const TooltipContent = (({
    children, appointmentData, ...restProps
}) => {
    
    return (
        <AppointmentTooltip.Content
            {...restProps}
            appointmentData={appointmentData}
            className={classes.commandButton}
        >
            <Grid
                container
                alignItems="center"
            >
                <StyledGrid
                    item
                    xs={2}
                    className={classes.textCenter}
                >
                    <Person className={classes.icon} color="action" />
                </StyledGrid>
                <Grid
                    item
                    xs={10}
                >
                    <span>
                        {appointmentData.dokter}
                    </span>
                </Grid>
            </Grid>
        </AppointmentTooltip.Content>
    )
})
export default TooltipContent