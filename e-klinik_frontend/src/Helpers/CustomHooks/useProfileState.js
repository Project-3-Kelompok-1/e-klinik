import React, { useState } from "react";
const useProfileState = () => {
    const [state, setState] = useState({
        nik: '',
        nama_depan: '',
        nama_belakang: '',
        jenis_kelamin: '',
        usia: 0,
        tampat_lahir: '',
        tgl_lahir: new Date(),
        alamat_rumah: ''
    })
    return [
        state,
        setState
    ]
}
export default useProfileState