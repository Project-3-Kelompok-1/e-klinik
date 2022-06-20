import React, { useState } from "react";
const useDialog = () => {
    const [open, setOpen] = useState(false)
    const handleClickOpen = (callback) => {
        setOpen(true)
        callback()
    }
    const handleClose = (callback) => {
        setOpen(false)
        callback()
    }
    return [
        open,
        handleClickOpen,
        handleClose
    ]
}
export default useDialog