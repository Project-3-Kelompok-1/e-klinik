import React, { useState } from "react";
const useAlert = () => {
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')
    const handleShow = (severityType, messageString) => {
        setSeverity(severityType)
        setMessage(messageString)
        setOpen(true)
    }
    const handleHide = () => {
        setMessage('')
        setOpen(false)
    }
    return [
        open,
        severity,
        message,
        handleShow,
        handleHide
    ]
}
export default useAlert