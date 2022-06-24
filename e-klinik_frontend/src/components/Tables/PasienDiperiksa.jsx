import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../Helpers/Context";
import useTablePagination from "../../Helpers/CustomHooks/useTablePagination";
const PasienDiperiksa = ({ appointment, setSelectedAppointment, loading, handleClickDiagnosis, handleClickDelete, handleClickStatus }) => {
    const { user } = useContext(UserContext)
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
                            {user?.role === 'dokter' && (
                                <TableCell align="right">
                                    Aksi
                                </TableCell>
                            )}

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
                                    {user?.role === 'dokter' && (
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', justifyContent: 'flex-end' }}>
                                                <Button
                                                    size="small"
                                                    component="span"
                                                    variant="contained"
                                                    sx={{ textTransform: 'capitalize' }}
                                                    color="error"
                                                    onClick={() => {
                                                        handleClickDelete(() => {
                                                            setSelectedAppointment(row)
                                                        })
                                                    }}
                                                >
                                                    Hapus
                                                </Button>
                                                <Button
                                                    size="small"
                                                    component="span"
                                                    variant="contained"
                                                    sx={{ textTransform: 'capitalize' }}
                                                    color="warning"
                                                    onClick={() => {
                                                        handleClickDiagnosis(() => {
                                                            setSelectedAppointment(row)
                                                        })
                                                    }}
                                                >
                                                    Diagnosis
                                                </Button>
                                                <Button
                                                    size="small"
                                                    component="span"
                                                    variant="contained"
                                                    sx={{ textTransform: 'capitalize' }}
                                                    color="info"
                                                >
                                                    Selesai
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    )}
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
export default PasienDiperiksa