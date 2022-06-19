import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import RiwayatPendaftaranFragment from "../Fragments/RiwayatPendaftaranFragment";
import { UserContext } from '../../Helpers/Context';
import { DOMAIN_SERVER } from "../../config";
const RiwayatPendaftaran = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [appoinments, setAppointments] = useState([])
    const { user } = useContext(UserContext)
    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    const fetchAppointment = () => {
        const params = {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            })
        }
        fetch(DOMAIN_SERVER + '/api/appointment', params)
            .then(response => response.json())
            .then(data => {
                if (data?.status === 'success') {
                    setAppointments(data.appointment)
                }
                else {
                    throw data?.message
                }
            })
            .catch(error => {
                // alert(error.toString())
                console.log(error);
            })
    }

    useEffect(() => {
        fetchAppointment()
    }, [user])
    return (
        <React.Fragment>
            <TableContainer
                component={Paper}
            >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                Waktu pesan
                            </TableCell>
                            <TableCell align="right">
                                Jadwal praktek
                            </TableCell>
                            <TableCell align="right">
                                Mulai
                            </TableCell>
                            <TableCell align="right">
                                Selesai
                            </TableCell>
                            <TableCell align="right">
                                Status
                            </TableCell>
                            <TableCell align="right">
                                Aksi
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appoinments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <RiwayatPendaftaranFragment key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                nextIconButtonProps={{ component: "span" }}
                backIconButtonProps={{ component: "span" }}
                count={appoinments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </React.Fragment>
    )
}
export default RiwayatPendaftaran