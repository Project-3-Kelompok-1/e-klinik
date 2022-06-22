import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { tanggalLahir } from "../../Helpers/TimeSplits";

const TabelPasienFragment = ({ row, setSelectedPasien, handleClickOpen, handleClickDelete }) => {
    const [collapse, setCollapse] = useState(false)
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        component="span"
                        onClick={() => { setCollapse(!collapse) }}
                    >
                        {collapse ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {row.nik}
                </TableCell>
                <TableCell align="right">
                    {`${row.nama_depan} ${row?.nama_belakang}`}
                </TableCell>
                <TableCell align="right">
                    {row.usia}
                </TableCell>
                <TableCell align="right">
                    {row.jenis_kelamin}
                </TableCell>
                <TableCell align="right">
                    {row.id_user == 0 && (
                        <Box
                            sx={{ display: 'flex', gap: '0.1rem', justifyContent: 'flex-end' }}
                        >
                            <Button
                                component="span"
                                color="error"
                                variant="contained"
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => {
                                    handleClickDelete(() => {
                                        setSelectedPasien(row)
                                    })
                                }}
                            >
                                Hapus
                            </Button>
                            <Button
                                component="span"
                                color="warning"
                                variant="contained"
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => {
                                    handleClickOpen(() => {
                                        setSelectedPasien(row)
                                    })
                                }}
                            >
                                Edit
                            </Button>
                        </Box>
                    )}

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={collapse} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detail
                            </Typography>
                            <Table size="small">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Kota kelahiran
                                        </TableCell>
                                        <TableCell>
                                            {row.tempat_lahir}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Tanggal lahir
                                        </TableCell>
                                        <TableCell>
                                            {tanggalLahir(row.tgl_lahir)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Alamat
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                sx={{ width: '700px' }}
                                            >
                                                {row.alamat_rumah}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
export default TabelPasienFragment