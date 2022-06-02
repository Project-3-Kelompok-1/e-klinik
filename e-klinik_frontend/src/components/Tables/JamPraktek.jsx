import { Alert, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
const createData = (hari, tanggal, mulai, selesai, status) => {
    return { hari, tanggal, mulai, selesai, status }
}
const rows = [
    createData("Senin", "15-05-2022", "08:00", "16:00", "Jam Kerja"),
    createData("Senin", "15-05-2022", "08:00", "16:00", "Jam Kerja"),
    createData("Senin", "15-05-2022", "08:00", "16:00", "Libur"),
    createData("Senin", "15-05-2022", "08:00", "16:00", "Jam Kerja"),
    createData("Senin", "15-05-2022", "08:00", "16:00", "Istirahat"),

]
const JamPraktek = () => {
    console.log(rows);
    return (
        <TableContainer
            component={Paper}
        >
            <Table
                sx={{ width: '100%' }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Hari</TableCell>
                        <TableCell align="right">Tanggal</TableCell>
                        <TableCell align="right">Mulai</TableCell>
                        <TableCell align="right">Selesai</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.hari}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                            >
                                {row.hari}
                            </TableCell>
                            <TableCell
                                align="right"
                            >
                                {row.tanggal}
                            </TableCell>
                            <TableCell
                                align="right"
                            >
                                {row.mulai}
                            </TableCell>
                            <TableCell
                                align="right"
                            >
                                {row.selesai}
                            </TableCell>
                            <TableCell
                                align="right"
                            >
                                <Chip
                                    label={row.status}
                                    color={row.status === 'Jam Kerja' ? "primary" : row.status === "Istirahat" ? "warning" : "error"}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default JamPraktek