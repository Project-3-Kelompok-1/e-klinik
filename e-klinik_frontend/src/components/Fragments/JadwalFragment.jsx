import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button, Chip, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useState } from "react";
const hoursAndMinutes = (time) => {
    const arrTime = time.split(":")
    return `${arrTime[0]}:${arrTime[1]}`
}
const JadwalFragment = (props) => {
    const { row, handleOpenBooking } = props
    const [open, setOpen] = useState(false)
    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        component="span"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                >
                    {row.hari}
                </TableCell>
                <TableCell
                    align="right"
                >
                    {row.tgl}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Jadwal Harian
                            </Typography>
                            <Table size="small" aria-label="jadwal">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Mulai</TableCell>
                                        <TableCell align="right">Selesai</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Book</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items.map((item) => (
                                        <TableRow key={item.title}>
                                            <TableCell component="th" scope="row">
                                                {hoursAndMinutes(item.jam_mulai)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {hoursAndMinutes(item.jam_selesai)}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={item.status}
                                                    size="small"
                                                    color={item.status === "kerja" ? "primary" : item.status === "istirahat" ? "warning" : "error"}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                {item.status === "kerja" && (
                                                    <Button
                                                        component="span"
                                                        size="small"
                                                        sx={{ textTransform: 'capitalize' }}
                                                        onClick={handleOpenBooking}
                                                    >
                                                        Booking
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}
export default JadwalFragment