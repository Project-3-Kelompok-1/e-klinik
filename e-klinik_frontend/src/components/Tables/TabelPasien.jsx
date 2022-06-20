import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React from "react";
import useTablePagination from "../../Helpers/CustomHooks/useTablePagination";
import TabelPasienFragment from "../Fragments/TabelPasienFragment";
const createData = (nik, nama_lengkap, usia, jenis_kelamin, tempat_lahir, tgl_lahir, alamat_rumah) => {
    return {
        nik,
        nama_lengkap,
        usia,
        jenis_kelamin,
        tempat_lahir,
        tgl_lahir,
        alamat_rumah
    }
}
const rows = [
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),
    createData("1234567890123456", "Mar'i Adhari", 21, "Laki-laki", "Cirebon", "14-03-2001", "Kutagara Utara"),

]
const TabelPasien = () => {
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
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TabelPasienFragment key={row} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                nextIconButtonProps={{ component: "span" }}
                backIconButtonProps={{ component: "span" }}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}
export default TabelPasien