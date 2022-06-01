import { Box, Button, IconButton, Pagination, Typography } from "@mui/material"
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { Toolbar as MuiToolbar } from "@mui/material";
import { Delete } from "@mui/icons-material";
import NoRowsOverlay from "../Overlays/NoRowsOverlays"
const Toolbar = ({ showDeleteIcon, selectedDelete, handleShowDelete }) => {
    return (
        <MuiToolbar
            variant="dense"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <Typography
                variant="h6"
                color="inherit"
                component="div"
            >
                Master data obat
            </Typography>
            {showDeleteIcon && (
                <IconButton
                    component="span"
                    onClick={(e) => {
                        handleShowDelete(selectedDelete)
                    }}
                >
                    <Delete />
                </IconButton>
            )}
        </MuiToolbar>
    );
};
const columns = (handleShowDelete) => {
    return [
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
                        onClick={(e) => {
                            console.log(params);
                            handleShowDelete(params.row);
                        }}
                    >
                        Hapus
                    </Button>
                </Box>
            )
        }
    ]
}
const TabelObat = ({ dataObat, loading, handleShowDelete }) => {
    const [selectedData, setSelectedData] = useState([]);
    const removeSelection = (target) => {
        // setSelectedData(selectedData => selectedData.filter(x => x.id !== item))
        setSelectedData(selectedData.filter(item => item.id !== target))
    }
    const pushSelection = (item) => {
        setSelectedData(selectedData => [...selectedData, item])
    }
    const updateSelectedData = (item) => {
        const search = selectedData.filter(data => data.id === item.id)
        if (search.length < 1) {
            pushSelection(item.row)
        }
        else {
            removeSelection(item.id)
        }
    }
    useEffect(() => {
        console.log(selectedData);
    }, [selectedData])
    const handleSelectedAll = (item, e, details) => {
        if (item.field === '__check__') {
            // console.log(item);
            if (selectedData.length > 0) {
                setSelectedData([])
            }
            else {
                setSelectedData(dataObat)
            }
        }
    }
    return (
        <Box
            sx={{ height: '100%', margin: '1rem 2rem' }}
        >
            <DataGrid
                rows={dataObat}
                columns={columns(handleShowDelete)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                loading={loading}
                components={{
                    LoadingOverlay: LinearProgress,
                    Toolbar,
                    NoRowsOverlay: NoRowsOverlay
                }}
                componentsProps={{
                    toolbar: { showDeleteIcon: selectedData.length > 0, selectedDelete: selectedData, handleShowDelete: handleShowDelete }
                }}
                onCellClick={(item, e, details) => {
                    // console.log(item)
                    updateSelectedData(item)
                }}
                onColumnHeaderClick={handleSelectedAll}
            />
        </Box>
    )
}
export default TabelObat