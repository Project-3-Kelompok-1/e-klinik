import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"
import { DOMAIN_SERVER } from "../../config"
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})
let url = DOMAIN_SERVER + '/api/data-obat/delete/';
const HapusObat = ({ showDelete, handleHideDelete, obat, user, fetchData, handleShowAlert }) => {
    // console.log(obat);
    const createData = (data) => {
        let formData = {id: []}
        data.forEach(item => {
            formData.id.push(item.id)
        });
        return formData
    }
    const handleDelete = () => {
        if (obat.id) {
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
        }
        else {
            const data = createData(obat)
            fetch(url, {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${user.token}`
                })
            }).then(response => response.json())
                .then(data => {
                    // console.log(data);
                    if (data.status === 'success') {
                        handleShowAlert("success", data.message)
                    }
                    else {
                        handleShowAlert("error", data.message)
                    }
                })
        }
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