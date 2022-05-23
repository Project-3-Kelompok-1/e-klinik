import { Close } from "@mui/icons-material"
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Toolbar, Typography } from "@mui/material"
const gridForm = { marginBottom: '2rem' }
const FormObat = ({ fullScreen, showForm, handleHideForm }) => {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={showForm}
            onClose={handleHideForm}
            aria-labelledby="responsive-dialog-title"
            fullWidth
            maxWidth="md"
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
                <Button
                    component="span"
                    variant="contained"
                >
                    Simpan
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default FormObat