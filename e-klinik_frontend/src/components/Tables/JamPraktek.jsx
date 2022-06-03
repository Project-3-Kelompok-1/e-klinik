import { Alert, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DOMAIN_SERVER } from "../../config";
const createData = (hari, tanggal, mulai, selesai, status) => {
    return { hari, tanggal, mulai, selesai, status }
}
const url = {
    jadwal_seminggu: DOMAIN_SERVER + '/api/jadwal-praktek/seminggu'
}
const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
const JamPraktek = () => {
    const [listJadwal, setListJadwal] = useState([])
    const fetchJadwal = async () => {
        setListJadwal([])
        let response = await fetch(url.jadwal_seminggu)
        let result = await response.json()
        result = result?.jadwal_praktek
        Object.keys(result).forEach(tgl_praktek => {
            Object.keys(result[tgl_praktek]).forEach(jam_mulai => {
                Object.keys(result[tgl_praktek][jam_mulai]).forEach(jam_selesai => {
                    Object.keys(result[tgl_praktek][jam_mulai][jam_selesai]).forEach(status => {
                        const hari = new Date(tgl_praktek).getDay()
                        if (hari !== 0) {
                            const jadwalCollection = result[tgl_praktek][jam_mulai][jam_selesai][status]
                            let item = {}
                            item.title = jadwalCollection[0].title
                            item.tgl = tgl_praktek
                            item.jam_mulai = jam_mulai
                            item.jam_selesai = jam_selesai
                            item.hari = days[hari]
                            // item.startDate = new Date(`${tgl_praktek} ${jam_mulai}`)
                            // item.endDate = new Date(`${tgl_praktek} ${jam_selesai}`)
                            item.status = status.toLocaleLowerCase();
                            item.memberDokter = []
                            item.id_jadwal = []
                            jadwalCollection.forEach(itemJadwal => {
                                if (!item.id) {
                                    item.id = itemJadwal.id
                                }
                                item.memberDokter.push(itemJadwal.dokter)
                                item.id_jadwal.push(itemJadwal.id)
                            })
                            setListJadwal(oldArray => [...oldArray, item])
                        }

                    })
                })
            })
        })
    }
    useEffect(() => {
        fetchJadwal()
    }, [])
    useEffect(() => {
        console.log(listJadwal);
    }, [listJadwal])
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
                    {listJadwal.map((row) => (
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
                                {row.tgl}
                            </TableCell>
                            <TableCell
                                align="right"
                            >
                                {row.jam_mulai}
                            </TableCell>
                            <TableCell
                                align="right"
                            >
                                {row.jam_selesai}
                            </TableCell>
                            <TableCell
                                align="right"
                            >
                                <Chip
                                    label={row.status}
                                    color={row.status === 'kerja' ? "primary" : row.status === "istirahat" ? "warning" : "error"}
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