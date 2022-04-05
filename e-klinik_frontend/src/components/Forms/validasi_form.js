export const validasiTambahDokter = (errorResponse, setValidationMessage, setFotoDokter) => {
    const errors = errorResponse?.errors;
    if (errors?.nama_depan?.Required) {
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                nama_depan: 'Nama depan harus diisi !!!'
            }
        })
    }
    if (errors?.nama_depan?.Max) {
        const max = errors?.nama_depan?.Max[0];
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                nama_depan: `Nama depan maksimal ${max} huruf`
            }
        })
    }
    if (errors?.nama_belakang?.Max) {
        const max = errors?.nama_belakang?.Max[0];
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                nama_belakang: `Nama belakang maksimal ${max} huruf`
            }
        })
    }
    if (errors?.jenis_kelamin?.Required) {
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                jenis_kelamin: 'Jenis kelamin harus diisi !!!'
            }
        })
    }
    if (errors?.jenis_kelamin?.Max) {
        const max = errors?.jenis_kelamin?.Max[0];
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                jenis_kelamin: 'Jenis kelamin tidak valid !!!'
            }
        })
    }
    if (errors?.tgl_lahir?.Required) {
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                tgl_lahir: "Tanggal lahir harus diisi !!!"
            }
        })
    }
    if (errors?.tgl_lahir?.Date) {
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                tgl_lahir: "Format tanggal lahir tidak sesuai"
            }
        })
    }
    if (errors?.foto_dokter?.Image) {
        setFotoDokter(null);
        const formatTypes = 'png, jpg, jpeg, gif, atau svg'
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                foto_dokter: `Pilih file dengan format gambar ${formatTypes}`
            }
        })
    }
}