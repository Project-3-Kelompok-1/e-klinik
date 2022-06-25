import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
const Booking = ({ ...restProps }) => {
    return (
        <Dialog
            {...restProps}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button component="span" onClick={restProps.onClose}>Disagree</Button>
                <Button component="span">Agree</Button>
            </DialogActions>
        </Dialog>
    )
}
export default Booking