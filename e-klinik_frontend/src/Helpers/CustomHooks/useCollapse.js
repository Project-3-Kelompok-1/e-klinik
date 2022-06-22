import React, { useState } from "react";
const useCollapse = () => {
    const [collapse, setCollapse] = useState(false)
    const handleCollapse = () => {
        setCollapse(!collapse)
    }
    return [
        collapse,
        handleCollapse
    ]
}
export default useCollapse