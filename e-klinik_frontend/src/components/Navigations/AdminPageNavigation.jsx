import { AddCircleOutline, Search } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import LeftNavigation from "./LeftNavigation";
const AdminPageNavigation = ({ handleShowForm, halaman, link, pageData, search, ...restProps }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '1rem 2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}
        >
            <LeftNavigation halaman={halaman} link={link} />

            <Box
                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
            >
                {search && (
                    <FormControl
                        sx={{
                            width: '25ch'
                        }}
                        variant="outlined"
                        size="small"
                    >
                        <InputLabel htmlFor="cari">Cari</InputLabel>
                        <OutlinedInput
                            id="cari"
                            autoComplete="off"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton component="span">
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Cari"
                            {...restProps}
                        >
                        </OutlinedInput>
                    </FormControl>
                )}
                <Button
                    variant="contained"
                    component="span"
                    endIcon={<AddCircleOutline />}
                    sx={{
                        textTransform: 'capitalize',
                        gap: '0.5rem'
                    }}
                    onClick={handleShowForm}
                >
                    Tambah {pageData}
                </Button>
            </Box>

        </Box>
    )
}
export default AdminPageNavigation