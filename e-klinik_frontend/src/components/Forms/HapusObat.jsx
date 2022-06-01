import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"
import { DOMAIN_SERVER } from "../../config"
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})
let url = DOMAIN_SERVER + '/api/data-obat/delete/';
const HapusObat = ({ showDelete, handleHideDelete, obat, user, fetchData, handleShowAlert }) => {
    const handleDelete = () => {
        fetch(url + obat.id, {
            method: 'DELETE',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    handleShowAlert("success", data.message)
                }
                else {
                    handleShowAlert("error", data.message)
                }
            })
        handleHideDelete();
        fetchData();
    }
    return (
        <Dialog
            open={showDelete}
            onClose={handleHideDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
        >
            <DialogTitle>
                {"Apakah anda yakin?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                >
                    Apakah anda yakin ingin menghapus obat {obat?.nama_obat} ini?.
                    Proses ini tidak dapat dibatalkan.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    component="span"
                    color="inherit"
                    onClick={handleHideDelete}
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
export default HapusObat