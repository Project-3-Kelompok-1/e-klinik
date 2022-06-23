import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React from "react";
import useTablePagination from "../../Helpers/CustomHooks/useTablePagination";
const PasienMenunggu = ({ appointment, loading, handleClickStatus, setSelectedAppointment }) => {
    const [
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    ] = useTablePagination()
    return (
        <Box sx={{ margin: '1rem 2rem' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                NIK
                            </TableCell>
                            <TableCell>
                                Nama Lengkap
                            </TableCell>
                            <TableCell>
                                Jenis Kelamin
                            </TableCell>
                            <TableCell align="right">
                                Usia
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
                            {appointment?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                                <TableRow key={row.id}>
                                    <TableCell />
                                    <TableCell>
                                        {row.nik}
                                    </TableCell>
                                    <TableCell>
                                        {row.nama_depan} {row.nama_belakang}
                                    </TableCell>
                                    <TableCell>
                                        {row.jenis_kelamin}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.usia}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            component="span"
                                            variant="contained"
                                            sx={{ textTransform: 'capitalize' }}
                                            onClick={() => {
                                                handleClickStatus(() => {
                                                    setSelectedAppointment(row)
                                                })
                                            }}
                                        >
                                            Diperiksa
                                        </Button>
                                    </TableCell>
                                </TableRow>
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
                count={appointment?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}
export default PasienMenunggu