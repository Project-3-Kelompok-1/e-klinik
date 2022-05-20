import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DOMAIN_SERVER } from "../../config";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})
const HapusDokter = ({ open, handleClose, selectDokter, fetchData, user, closePopover }) => {
    const url = DOMAIN_SERVER + `/api/dokter/hapus/${selectDokter.id}`;
    const navigate = useNavigate();
    const hapusDokter = (event) => {
        event.preventDefault();
        fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            })
        }).then(response => {
            handleClose();
            fetchData();
            closePopover();
        }).catch(err => {
            console.log("ERROR!!!");
            handleClose();
        })
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Apakah anda yakin?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Apakah anda yakin ingin menghapus data dokter {selectDokter.nama_depan}?.
                        Proses ini tidak dapat dibatalkan
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        component="span"
                        color="inherit"
                        onClick={handleClose}
                    >
                        Batalkan
                    </Button>
                    <Button
                        component="span"
                        color="error"
                        variant="contained"
                        onClick={hapusDokter}
                    >
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default HapusDokter;