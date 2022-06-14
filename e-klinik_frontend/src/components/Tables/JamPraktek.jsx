import { Alert, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DOMAIN_SERVER } from "../../config";
import JadwalFragment from "../Fragments/JadwalFragment";
import Booking from "../Layouts/Landing/components/Booking";
const createData = (hari, tanggal, mulai, selesai, status) => {
    return { hari, tanggal, mulai, selesai, status }
}
const url = {
    jadwal_seminggu: DOMAIN_SERVER + '/api/jadwal-praktek/seminggu'
}

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
const JamPraktek = () => {
    const [listJadwal, setListJadwal] = useState([])
    const [openBooking, setOpenBooking] = useState(false)
    const handleOpenBooking = () => {
        setOpenBooking(true)
    }
    const handleCloseBooking = () => {
        setOpenBooking(false)
    }
    const fetchJadwal = async () => {
        setListJadwal([])
        let response = await fetch(url.jadwal_seminggu)
        let result = await response.json()
        result = result?.jadwal_praktek
        Object.keys(result).forEach(tgl_praktek => {
            const hari = new Date(tgl_praktek).getDay()
            let dayGroup = {
                hari: days[hari],
                tgl: tgl_praktek,
                items: []
            }
            Object.keys(result[tgl_praktek]).forEach(jam_mulai => {
                Object.keys(result[tgl_praktek][jam_mulai]).forEach(jam_selesai => {
                    Object.keys(result[tgl_praktek][jam_mulai][jam_selesai]).forEach(status => {
                        if (hari !== 0) {
                            const jadwalCollection = result[tgl_praktek][jam_mulai][jam_selesai][status]
                            let item = {}
                            item.title = jadwalCollection[0].title
                            item.tgl = tgl_praktek
                            item.jam_mulai = jam_mulai
                            item.jam_selesai = jam_selesai
                            item.hari = days[hari]
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
                            dayGroup.items.push(item)
                        }
                    })
                })
            })
            if (dayGroup.items.length > 0) {
                setListJadwal(oldArray => [...oldArray, dayGroup])
            }
        })
    }
    useEffect(() => {
        fetchJadwal()
    }, [])
    useEffect(() => {
        // console.log(listJadwal);
    }, [listJadwal])

    return (
        <>
            <TableContainer
                component={Paper}
            >
                <Table
                    sx={{ width: '100%', userSelect: 'none' }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Hari</TableCell>
                            <TableCell align="right">Tanggal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listJadwal.map((row) => (
                            <JadwalFragment
                                key={row.hari}
                                row={row}
                                handleOpenBooking={handleOpenBooking}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Booking
                open={openBooking}
                onClose={handleCloseBooking}
            />
        </>
    )
}
export default JamPraktek