import { Box, Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nama_obat', headerName: 'Nama Obat', width: 130 },
    { field: 'dosis_obat', headerName: 'Dosis Obat', width: 160, sortable: false },
    { field: 'stok_obat', headerName: 'Stok Obat', width: 90, type: 'number' },
    { field: 'jenis_obat', headerName: 'Jenis Obat', width: 130 },
    { field: 'tipe_obat', headerName: 'Tipe Obat', width: 130 },
    { field: 'harga_jual', headerName: 'Harga Jual', width: 130, type: 'number' },
    { field: 'harga_pabrik', headerName: 'Harga Pabrik', width: 130, type: 'number' },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 160,
        renderCell: (params) => (
            <Box
                sx={{ display: 'flex', gap: '0.2rem' }}
            >
                <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    component="span"
                    sx={{ textTransform: 'capitalize' }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    component="span"
                    sx={{ textTransform: 'capitalize' }}
                >
                    Delete
                </Button>
            </Box>
        )
    }
]
const rows = [
    {
        id: 1,
        nama_obat: 'Acetazolamide',
        dosis_obat: `Dewasa: 250-1.000 mg per hari, dibagi menjadi beberapa jadwal konsumsi. Kondisi: Epilepsi`,
        stok_obat: 120,
        jenis_obat: 'Diuretik',
        tipe_obat: 'Tablet',
        harga_jual: 10000,
        harga_pabrik: 9000,
        actions: 1
    },
    {
        id: 2,
        nama_obat: 'Paromomycin',
        dosis_obat: `Untuk mengobati masalah amoebiasis usus (infeksi usus oleh bakteri), dosisnya 25-35 mg/kg/hari dalam 3 dosis terbagi untuk 5-10 hari.`,
        stok_obat: 10,
        jenis_obat: 'Antibiotik',
        tipe_obat: 'Tablet dan sirop',
        harga_jual: 30000,
        harga_pabrik: 27000
    },
    {
        id: 3,
        nama_obat: 'Acetazolamide',
        dosis_obat: `Dewasa: 250-1.000 mg per hari, dibagi menjadi beberapa jadwal konsumsi. Kondisi: Epilepsi`,
        stok_obat: 120,
        jenis_obat: 'Diuretik',
        tipe_obat: 'Tablet',
        harga_jual: 10000,
        harga_pabrik: 9000
    },
    {
        id: 4,
        nama_obat: 'Paromomycin',
        dosis_obat: `Untuk mengobati masalah amoebiasis usus (infeksi usus oleh bakteri), dosisnya 25-35 mg/kg/hari dalam 3 dosis terbagi untuk 5-10 hari.`,
        stok_obat: 10,
        jenis_obat: 'Antibiotik',
        tipe_obat: 'Tablet dan sirop',
        harga_jual: 30000,
        harga_pabrik: 27000
    },
    {
        id: 5,
        nama_obat: 'Acetazolamide',
        dosis_obat: `Dewasa: 250-1.000 mg per hari, dibagi menjadi beberapa jadwal konsumsi. Kondisi: Epilepsi`,
        stok_obat: 120,
        jenis_obat: 'Diuretik',
        tipe_obat: 'Tablet',
        harga_jual: 10000,
        harga_pabrik: 9000
    },
    {
        id: 6,
        nama_obat: 'Paromomycin',
        dosis_obat: `Untuk mengobati masalah amoebiasis usus (infeksi usus oleh bakteri), dosisnya 25-35 mg/kg/hari dalam 3 dosis terbagi untuk 5-10 hari.`,
        stok_obat: 10,
        jenis_obat: 'Antibiotik',
        tipe_obat: 'Tablet dan sirop',
        harga_jual: 30000,
        harga_pabrik: 27000
    },
    {
        id: 7,
        nama_obat: 'Acetazolamide',
        dosis_obat: `Dewasa: 250-1.000 mg per hari, dibagi menjadi beberapa jadwal konsumsi. Kondisi: Epilepsi`,
        stok_obat: 120,
        jenis_obat: 'Diuretik',
        tipe_obat: 'Tablet',
        harga_jual: 10000,
        harga_pabrik: 9000
    },
    {
        id: 8,
        nama_obat: 'Paromomycin',
        dosis_obat: `Untuk mengobati masalah amoebiasis usus (infeksi usus oleh bakteri), dosisnya 25-35 mg/kg/hari dalam 3 dosis terbagi untuk 5-10 hari.`,
        stok_obat: 10,
        jenis_obat: 'Antibiotik',
        tipe_obat: 'Tablet dan sirop',
        harga_jual: 30000,
        harga_pabrik: 27000
    },
    {
        id: 9,
        nama_obat: 'Acetazolamide',
        dosis_obat: `Dewasa: 250-1.000 mg per hari, dibagi menjadi beberapa jadwal konsumsi. Kondisi: Epilepsi`,
        stok_obat: 120,
        jenis_obat: 'Diuretik',
        tipe_obat: 'Tablet',
        harga_jual: 10000,
        harga_pabrik: 9000
    },
    {
        id: 10,
        nama_obat: 'Paromomycin',
        dosis_obat: `Untuk mengobati masalah amoebiasis usus (infeksi usus oleh bakteri), dosisnya 25-35 mg/kg/hari dalam 3 dosis terbagi untuk 5-10 hari.`,
        stok_obat: 10,
        jenis_obat: 'Antibiotik',
        tipe_obat: 'Tablet dan sirop',
        harga_jual: 30000,
        harga_pabrik: 27000
    },
    {
        id: 11,
        nama_obat: 'Acetazolamide',
        dosis_obat: `Dewasa: 250-1.000 mg per hari, dibagi menjadi beberapa jadwal konsumsi. Kondisi: Epilepsi`,
        stok_obat: 120,
        jenis_obat: 'Diuretik',
        tipe_obat: 'Tablet',
        harga_jual: 10000,
        harga_pabrik: 9000
    },
    {
        id: 12,
        nama_obat: 'Paromomycin',
        dosis_obat: `Untuk mengobati masalah amoebiasis usus (infeksi usus oleh bakteri), dosisnya 25-35 mg/kg/hari dalam 3 dosis terbagi untuk 5-10 hari.`,
        stok_obat: 10,
        jenis_obat: 'Antibiotik',
        tipe_obat: 'Tablet dan sirop',
        harga_jual: 30000,
        harga_pabrik: 27000
    },
]
const TabelObat = () => {
    return (
        <Box
            sx={{ height: '100%', margin: '1rem 2rem' }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </Box>
    )
}
export default TabelObat