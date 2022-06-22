import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useContext } from "react";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";
const HapusPasien = ({ selectedPasien, fetchPasien, handleShowAlert, ...restProps }) => {
    const { user } = useContext(UserContext)
    const handleDelete = (e) => {
        e.preventDefault()
        const params = {
            method: 'DELETE',
            body: JSON.stringify(selectedPasien),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            })
        }
        restProps.onClose()
        fetch(DOMAIN_SERVER + '/api/pasien', params)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data?.status !== 'success') {
                    throw data?.message
                }
                handleShowAlert(data?.status, data?.message)
                fetchPasien()
            })
            .catch(error => {
                handleShowAlert("error", error)
            })
    }
    return (
        <Dialog
            {...restProps}
        >
            <DialogTitle>
                {'Apakah anda yakin?'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Apakah anda yakin ingin menghapus pasien ini?.
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
                    onClick={handleDelete}
                >
                    Hapus
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default HapusPasien