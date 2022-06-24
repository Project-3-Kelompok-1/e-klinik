import { DesktopTimePicker, LocalizationProvider, MobileTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import React from "react";
const TimePicker = ({ fullScreen, ...restProps }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {!fullScreen ? (
                <DesktopTimePicker
                    {...restProps}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
            ) : (
                <MobileTimePicker
                    {...restProps}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
            )}
        </LocalizationProvider>
    )
}
export default TimePicker