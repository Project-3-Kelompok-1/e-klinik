import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useContext } from "react";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";
const ChangeAppointmentStatus = ({
    status,
    selectedAppoitment,
    handleShowAlert,
    fetchAppoitment,
    ...restProps
}) => {
    const { user } = useContext(UserContext)
    const handleUpdate = (e) => {
        e.preventDefault()
        const params = {
            method: 'PATCH',
            body: JSON.stringify({ status }),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            })
        }
        restProps.onClose()
        fetch(DOMAIN_SERVER + '/api/appointment/update_status/' + selectedAppoitment?.id, params)
            .then(response => response.json())
            .then(data => {
                if (data?.status !== 'success') {
                    throw data?.message
                }
                handleShowAlert(data?.status, data?.message)
                fetchAppoitment()
            })
            .catch(error => {
                handleShowAlert("error", error)
            })
    }
    return (
        <Dialog {...restProps}>
            <DialogTitle>
                {'Apakah anda yakin?'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Apakah anda yakin ingin mengubah status appointment ini menjadi {status} ?.
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
                    color="warning"
                    variant="contained"
                    onClick={handleUpdate}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ChangeAppointmentStatus