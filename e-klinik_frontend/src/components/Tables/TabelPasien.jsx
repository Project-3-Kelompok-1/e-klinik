import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import useTablePagination from "../../Helpers/CustomHooks/useTablePagination";
import TabelPasienFragment from "../Fragments/TabelPasienFragment";

const TabelPasien = ({ pasien, setSelectedPasien, handleClickOpen, handleClickDelete, handleClickRegistration, loading }) => {
    const [
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    ] = useTablePagination()

    return (
        <Box sx={{ margin: '1rem 2rem' }}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                NIK
                            </TableCell>
                            <TableCell align="right">
                                Nama Lengkap
                            </TableCell>
                            <TableCell align="right">
                                Usia
                            </TableCell>
                            <TableCell align="right">
                                Jenis Kelamin
                            </TableCell>
                            <TableCell align="right">
                                Aksi
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}>
                                <TableCell rowSpan={4} colSpan={6} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {pasien?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                                <TabelPasienFragment
                                    key={i}
                                    row={row}
                                    setSelectedPasien={setSelectedPasien}
                                    handleClickOpen={handleClickOpen}
                                    handleClickDelete={handleClickDelete}
                                    handleClickRegistration={handleClickRegistration}
                                />
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                nextIconButtonProps={{ component: "span" }}
                backIconButtonProps={{ component: "span" }}
                count={pasien?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}
export default TabelPasien