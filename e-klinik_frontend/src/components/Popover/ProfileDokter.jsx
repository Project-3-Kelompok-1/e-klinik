import React, { useEffect } from "react";
import { Box, Avatar, Typography, Grid, Divider, CardActions, Button } from "@mui/material";
const ProfileDokter = ({ selectDokter, setOpenHapusDokter, setShowFormDokter }) => {
    return (
        <>
            <Box sx={{ width: { xs: 375, md: 675 } }}>
                <Grid container>
                    <Grid item xs={12} md={5} sx={{ backgroundColor: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{
                            minHeight: 220, textAlign: 'center',
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'center', color: 'white',
                            alignItems: 'center', gap: '1rem'
                        }}>
                            <Avatar
                                alt={selectDokter.nama_depan + selectDokter.nama_belakang ? selectDokter.nama_belakang : ''}
                                sx={{ width: 100, height: 100 }}
                                src={selectDokter.foto_dokter ? `http://127.0.0.1:8000/storage/foto_dokter/${selectDokter.foto_dokter}`: ''}
                            />
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {`${selectDokter.nama_depan} ${selectDokter.nama_belakang ? selectDokter.nama_belakang : ''}`}
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid
                        item
                        xs={12} md={7}
                    >
                        <Typography
                            variant="h6"
                            sx={{ textAlign: 'center', marginTop: '0.5rem' }}
                        >
                            Informasi penting
                        </Typography>
                        <Divider
                            sx={{ marginX: 12, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'primary.light' }}
                        />
                        <Box
                            sx={{ margin: '2rem 1rem' }}
                        >
                            <Grid
                                container
                                sx={{ gap: { xs: '0.5rem', md: 0 } }}
                            >
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    md={6}
                                >
                                    <Grid item md={12} xs={5}>
                                        <Typography
                                            component="div"
                                            variant="body1"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            Jenis kelamin
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        sx={{ display: { xs: 'initial', md: 'none' } }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} xs={5}>
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {selectDokter.jenis_kelamin}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    md={6}
                                >
                                    <Grid item md={12} xs={5}>
                                        <Typography
                                            component="div"
                                            variant="body1"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            No Hp
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        sx={{ display: { xs: 'initial', md: 'none' } }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} xs={5}>
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {selectDokter.no_hp}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                sx={{ gap: { xs: '0.5rem', md: 0 }, marginTop: '0.5rem' }}
                            >
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    md={6}
                                >
                                    <Grid item md={12} xs={5}>
                                        <Typography
                                            component="div"
                                            variant="body1"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            Tempat lahir
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        sx={{ display: { xs: 'initial', md: 'none' } }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} xs={5}>
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {selectDokter.tempat_lahir}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    md={6}
                                >
                                    <Grid item md={12} xs={5}>
                                        <Typography
                                            component="div"
                                            variant="body1"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            Tanggal lahir
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        sx={{ display: { xs: 'initial', md: 'none' } }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            :
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} xs={5}>
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {selectDokter.tgl_lahir}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider
                                sx={{ borderBottomWidth: 1, borderBottomColor: 'primary.light', marginY: '0.5rem' }}
                            />
                            {selectDokter.alamat && (
                                <Grid
                                    container
                                >
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography
                                            component="div"
                                            variant="body1"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            Alamat
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {selectDokter.alamat}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                            {selectDokter.alamat && (
                                <Divider
                                    sx={{ borderBottomWidth: 1, borderBottomColor: 'primary.light', marginTop: '0.5rem' }}
                                />
                            )}
                        </Box>
                        <CardActions
                            sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1rem', marginBottom: '0.5rem', marginX: '0.5rem' }}
                        >
                            <Button
                                color="error"
                                variant="contained"
                                component="span"
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => {
                                    setOpenHapusDokter(true);
                                }}
                            >
                                Hapus
                            </Button>
                            <Button
                                color="warning"
                                component="span"
                                variant="contained"
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => {
                                    setShowFormDokter(true);
                                }}
                            >
                                Edit
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default ProfileDokter;