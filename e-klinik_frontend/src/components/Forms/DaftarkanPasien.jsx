import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useContext } from "react";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";
const DaftarkanPasien = ({ selectedPasien, fetchPasien, handleShowAlert, ...restProps }) => {
    const { user } = useContext(UserContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        const nik_pasien = selectedPasien?.nik
        const params = {
            'method': 'POST',
            body: JSON.stringify({ nik_pasien }),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            })
        }
        restProps.onClose()
        fetch(DOMAIN_SERVER + '/api/appointment/offline_registration', params)
            .then(response => response.json())
            .then(data => {
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
                Daftarkan Pasien
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Apakah anda yakin ingin mendaftarkan pasien ini?.
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
                    color="info"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Daftarkan
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default DaftarkanPasien