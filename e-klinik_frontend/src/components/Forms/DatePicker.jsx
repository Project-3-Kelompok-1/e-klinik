import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import React from "react";
const DatePicker = ({ fullScreen, label, error, ...restProps }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {!fullScreen ? (
                <React.Fragment>
                    <DesktopDatePicker
                        {...restProps}
                        mask="__/__/____"
                        label={label}
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    fullWidth
                                    required
                                    error={error}
                                />
                            )
                        }}
                        OpenPickerButtonProps={
                            {
                                component: 'span'
                            }
                        }
                        componentsProps={{
                            switchViewButton: {
                                component: 'span'
                            },
                            leftArrowButton: {
                                component: 'span',
                            },
                            rightArrowButton: {
                                component: 'span'
                            }
                        }}
                    />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <MobileDatePicker
                        {...restProps}
                        mask="__/__/____"
                        label={label}
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    fullWidth
                                    required
                                />
                            )
                        }}
                        OpenPickerButtonProps={
                            {
                                component: 'span'
                            }
                        }
                        componentsProps={{
                            switchViewButton: {
                                component: 'span'
                            },
                            leftArrowButton: {
                                component: 'span',
                            },
                            rightArrowButton: {
                                component: 'span'
                            }
                        }}
                    />
                </React.Fragment>
            )}
        </LocalizationProvider>
    )
}
export default DatePicker