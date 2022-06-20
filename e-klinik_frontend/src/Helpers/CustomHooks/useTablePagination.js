import React, { useState } from "react";
const useTablePagination = () => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const handleChangePage = (e, nextPage) => {
        setPage(nextPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    return [
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    ]
}
export default useTablePagination