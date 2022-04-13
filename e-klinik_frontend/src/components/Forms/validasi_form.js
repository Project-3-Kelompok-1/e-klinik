export const validasiTambahDokter = (errorResponse, setValidationMessage, setFotoDokter) => {
    const errors = errorResponse?.errors;
    if (errors?.nama_depan?.Required) {
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                nama_depan: 'Nama depan tidak boleh kosong !!!'
            }
        })
    }
    if (errors?.nama_depan?.Max) {
        const max = errors?.nama_depan?.Max[0];
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                nama_depan: `Panjang karakter maksimal ${max}`
            }
        })
    }
    if (errors?.nama_belakang?.Max) {
        const max = errors?.nama_belakang?.Max[0];
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                nama_belakang: `Panjang karakter maksimal ${max}`
            }
        })
    }
    if (errors?.jenis_kelamin?.Required) {
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                jenis_kelamin: 'Jenis kelamin tidak boleh kosong !!!'
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
    if (errors?.no_hp?.Max) {
        const max = errors.no_hp.Max[0];
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                no_hp: `Panjang karakter maksimal ${max}`
            }
        })
    }
    if (errors?.tgl_lahir?.Required) {
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                tgl_lahir: "Tanggal lahir tidak boleh kosong !!!"
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
export const validasiFormDokter = (errorResponse, setValidationMessage, setFotoDokter) => {
    const errors = errorResponse?.errors;
    if (errors?.nama_depan?.Required) {
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                nama_depan: 'Nama depan tidak boleh kosong !!!'
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
    if (errors?.tempat_lahir?.Max) {
        const max = errors?.tempat_lahir?.Max[0];
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                tempat_lahir: `Panjang karakter maksimal ${max}`
            }
        })
    }
    if (errors?.jenis_kelamin?.Required) {
        setValidationMessage((prevState) => {
            return {
                ...prevState,
                jenis_kelamin: 'Jenis kelamin tidak boleh kosong !!!'
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
                tgl_lahir: "Tanggal lahir tidak boleh kosong !!!"
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