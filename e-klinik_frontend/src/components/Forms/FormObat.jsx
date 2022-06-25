import { Close } from "@mui/icons-material"
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Slide,
    TextField,
    Toolbar,
    Typography
} from "@mui/material"
import React, { useEffect, useState } from "react";
import { DOMAIN_SERVER } from "../../config";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})
const url = {
    create: DOMAIN_SERVER + '/api/data-obat/create',
    update: DOMAIN_SERVER + '/api/data-obat/update'
}
const FormObat = ({ fullScreen, showForm, handleHideForm, fetchData, user, handleShowAlert, selectedObat }) => {
    const [id, setId] = useState(null);
    const [namaObat, setNamaObat] = useState('');
    const [stokObat, setStokObat] = useState(0);
    const [jenisObat, setJenisObat] = useState('');
    const [tipeObat, setTipeObat] = useState('');
    const [hargaPabrik, setHargaPabrik] = useState(0);
    const [hargaJual, setHargaJual] = useState();
    const [dosisObat, setDosisObat] = useState('');
    useEffect(() => {
        if (stokObat < 0) {
            setStokObat(0);
        }
        if (hargaJual < 0) {
            setHargaJual(0);
        }
        if (hargaPabrik < 0) {
            setHargaPabrik(0);
        }
    }, [stokObat, hargaJual, hargaPabrik])
    const assignData = () => {
        setId(selectedObat.id)
        setNamaObat(selectedObat.nama_obat)
        setStokObat(selectedObat.stok_obat)
        setJenisObat(selectedObat.jenis_obat)
        setTipeObat(selectedObat.tipe_obat)
        setHargaPabrik(selectedObat.harga_pabrik)
        setHargaJual(selectedObat.harga_jual)
        setDosisObat(selectedObat.dosis_obat)
    }
    const resetData = () => {
        setId(null)
        setNamaObat('')
        setStokObat(0)
        setJenisObat('')
        setTipeObat('')
        setHargaPabrik(0)
        setHargaJual(0)
        setDosisObat('')
    }
    useEffect(() => {
        if (selectedObat !== null) {
            assignData()
        }
        else {
            resetData()
        }
    }, [selectedObat])
    const createFormData = () => {
        const formData = new FormData();
        formData.append('nama_obat', namaObat);
        formData.append('dosis_obat', dosisObat);
        formData.append('stok_obat', stokObat);
        formData.append('jenis_obat', jenisObat);
        formData.append('tipe_obat', tipeObat);
        formData.append('harga_jual', hargaJual);
        formData.append('harga_pabrik', hargaPabrik);
        return formData;
    }
    const submitForm = (e) => {
        e.preventDefault();
        const data = createFormData();
        const postData = {
            method: 'POST',
            body: data,
            headers: new Headers({
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data; application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            })
        }
        if (!id) {
            fetch(url.create, postData)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        handleShowAlert("success", data.message)
                    }
                    else {
                        handleShowAlert("error", data.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            fetch(`${url.update}/${id}`, postData)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        handleShowAlert("success", data.message)
                    }
                    else {
                        handleShowAlert("error", data.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

        fetchData();
        handleHideForm();
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={showForm}
            onClose={handleHideForm}
            aria-labelledby="responsive-dialog-title"
            fullWidth
            maxWidth="md"
            TransitionComponent={Transition}
        >
            {fullScreen ? (
                <AppBar
                    sx={{ position: 'relative' }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleHideForm}
                            aria-label="close"
                            component="span"
                        >
                            <Close />
                        </IconButton>
                        <Typography
                            variant="h6"
                        >
                            {"Form tambah data obat"}
                        </Typography>
                    </Toolbar>
                </AppBar>
            ) : (
                <DialogTitle
                    id="responsive-dialog-title"
                >
                    {"Form tambah data obat"}
                </DialogTitle>
            )}
            <DialogContent
                dividers
            >
                <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: '1rem' }}

                >
                    <Grid
                        item
                        md={6}
                        xs={12}

                    >
                        <TextField
                            id="nama_obat"
                            label="Nama obat"
                            variant="standard"
                            fullWidth
                            required
                            helperText="panjang karakter maksimal 255"
                            value={namaObat}
                            onChange={(e) => {
                                setNamaObat(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}

                    >
                        <TextField
                            id="stok_obat"
                            label="Stok obat"
                            variant="standard"
                            fullWidth
                            required
                            type="number"
                            value={stokObat}
                            onChange={(e) => {
                                if (stokObat < 0) {
                                    setStokObat(0);
                                }
                                setStokObat(e.target.value)
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: '1rem' }}
                >
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            id="jenis_obat"
                            label="Jenis obat"
                            variant="standard"
                            fullWidth
                            required
                            helperText="panjang karakter maksimal 255"
                            value={jenisObat}
                            onChange={(e) => {
                                setJenisObat(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            id="tipe_obat"
                            label="Tipe obat"
                            variant="standard"
                            fullWidth
                            helperText="panjang karakter maksimal 255"
                            value={tipeObat}
                            onChange={(e) => {
                                setTipeObat(e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: '1rem' }}
                >
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            id="harga_pabrik"
                            label="Harga pabrik"
                            variant="standard"
                            fullWidth
                            required
                            type="number"
                            value={hargaPabrik}
                            onChange={(e) => {
                                setHargaPabrik(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            id="harga_jual"
                            label="Harga jual"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={hargaJual}
                            onChange={(e) => {
                                setHargaJual(e.target.value)
                            }}
                        />
                    </Grid>

                </Grid>
                <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: '1rem' }}
                >
                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <TextField
                            id="dosis_obat"
                            label="Dosis obat"
                            fullWidth
                            multiline
                            rows={3}
                            value={dosisObat}
                            onChange={(e) => {
                                setDosisObat(e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    component="span"
                    autoFocus
                    variant="text"
                    color="inherit"
                    onClick={handleHideForm}
                >
                    Batal
                </Button>
                {id ? (
                    <Button
                        component="span"
                        variant="contained"
                        color="warning"
                        onClick={submitForm}
                    >
                        Ubah
                    </Button>
                ) : (
                    <Button
                        component="span"
                        variant="contained"
                        onClick={submitForm}
                    >
                        Simpan
                    </Button>
                )}

            </DialogActions>
        </Dialog>
    )
}
export default FormObat