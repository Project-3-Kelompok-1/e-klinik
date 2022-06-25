import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useContext } from "react";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";
const HapusAppointment = ({ selectedAppointment, fetchAppointment, handleShowAlert, ...restProps }) => {
    const { user } = useContext(UserContext)
    const handleDelete = (id) => {
        const url = DOMAIN_SERVER + '/api/appointment/' + id
        const params = {
            method: 'DELETE',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            })
        }
        fetch(url, params)
            .then(response => response.json())
            .then(data => {
                if (data?.status !== 'success') {
                    throw data?.message
                }
                handleShowAlert(data?.status, data?.message)
                fetchAppointment()
            })
            .catch(error => {
                handleShowAlert("error", error)
            })
        restProps.onClose()
    }
    return (
        <Dialog
            {...restProps}
        >
            <DialogTitle>
                {"Apakah anda yakin?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Apakah anda yakin ingin menghapus appointment ini?.
                    Proses ini tidak dapat dibatalkan
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    component="span"
                    color="inherit"
                    onClick={restProps.onClose}
                >
                    Batalkan
                </Button>
                <Button
                    component="span"
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(selectedAppointment?.id)}
                >
                    Hapus
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default HapusAppointment