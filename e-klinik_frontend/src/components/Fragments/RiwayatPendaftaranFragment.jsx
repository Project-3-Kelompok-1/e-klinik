import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, Collapse, IconButton, Paper, TableCell, TableRow, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { DOMAIN_SERVER } from "../../config";
import { UserContext } from "../../Helpers/Context";
const RiwayatPendaftaranFragment = ({ row, fetchAppointment, handleShowAlert }) => {
    const [collapse, setCollapse] = useState(false)
    const { user } = useContext(UserContext)
    const handleDelete = (id) => {
        const params = {
            method: 'DELETE',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            })
        }
        fetch(`${DOMAIN_SERVER}/api/appointment/${id}`, params)
            .then(response => response.json())
            .then(data => {
                if (data?.status !== 'success') {
                    throw data?.message
                }
                handleShowAlert('success', data?.message)
                fetchAppointment()
                console.log(data);
            })
            .catch(error => {
                handleShowAlert('error', error)
            })
    }
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        component="span"
                        onClick={() => setCollapse(!collapse)}
                    >
                        {collapse ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {row.waktu_pesan}
                </TableCell>
                <TableCell align="right">
                    {row.tgl_praktek}
                </TableCell>
                <TableCell align="right">
                    {row.jam_mulai}
                </TableCell>
                <TableCell align="right">
                    {row.jam_selesai}
                </TableCell>
                <TableCell align="right">
                    {row.status}
                </TableCell>
                <TableCell align="right">
                    <Button
                        component="span"
                        color="error"
                        onClick={() => { handleDelete(row.id) }}
                    >
                        Hapus
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}
                >
                    <Collapse
                        in={collapse}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Konsultasi keluhan
                            </Typography>
                            <p>
                                {row.konsultasi}
                            </p>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
export default RiwayatPendaftaranFragment