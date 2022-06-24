import { DOMAIN_SERVER } from "../config"

const user = JSON.parse(localStorage.getItem('user'))
const getRole = (token) => {
    fetch(DOMAIN_SERVER + '/api/user', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    })
        .then(response => response.json())
        .then(data => {
            return data.role === user.role
        })
        .catch(error => {
            alert("Access denied")
            return false
        })
}

export const isPasien = async () => {
    const params = {
        headers: new Headers({
            'Authorization': `Bearer ${user.token}`
        })
    }
    let response = await fetch(DOMAIN_SERVER + '/api/user', params)
    response = await response.json()
    return response.role === 'pasien'
}
export const isResepsionis = async () => {
    const params = {
        headers: new Headers({
            'Authorization': `Bearer ${user.token}`
        })
    }
    let response = await fetch(DOMAIN_SERVER + '/api/user', params)
    response = await response.json()
    return response.role === 'resepsionis'
}
export const isDokter = async () => {
    const params = {
        headers: new Headers({
            'Authorization': `Bearer ${user.token}`
        })
    }
    let response = await fetch(DOMAIN_SERVER + '/api/user', params)
    response = await response.json()
    return response.role === 'dokter'
}