const createFormPasien = (form) => {
    const formData = {
        nik: form.nik,
        nama_depan: form.nama_depan,
        nama_belakang: form.nama_belakang,
        alamat_rumah: form.alamat_rumah,
        jenis_kelamin: form.jenis_kelamin,
        usia: form.usia,
        tempat_lahir: form.tempat_lahir
    }
    const tgl = new Date(form.tgl_lahir)
    formData.tgl_lahir = `${tgl.getFullYear()}-${("0" + (tgl.getMonth() + 1)).slice(-2)}-${tgl.getDate()}`
    return formData
}
export default createFormPasien