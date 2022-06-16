import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, Collapse, IconButton, Paper, TableCell, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
const RiwayatPendaftaranFragment = ({ row }) => {
    const [collapse, setCollapse] = useState(false)
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
                    {row.jadwal_praktek}
                </TableCell>
                <TableCell align="right">
                    {row.waktu_mulai}
                </TableCell>
                <TableCell align="right">
                    {row.waktu_selesai}
                </TableCell>
                <TableCell align="right">
                    {row.status}
                </TableCell>
                <TableCell align="right">
                    <Button
                        component="span"
                        color="error"
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