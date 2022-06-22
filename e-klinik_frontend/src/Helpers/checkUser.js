import { DOMAIN_SERVER } from "../config"

const user = JSON.parse(localStorage.getItem('user'))
const getRole = (token) => {
    return fetch(DOMAIN_SERVER + '/api/user', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    })
        .then(response => response.json())
        .then(data => {
            return data.role === user.role
            // if (data.role === user.role) {
            //     return true
            // }
            // else {
            //     return false
            // }
        })
        .catch(error => {
            alert("Access denied")
            return false
        })
}
export const isPasien = () => {
    if (user && user.role === 'pasien') {
        return getRole(user?.token)
    }
    else {
        return false
    }
}
export const isResepsionis = () => {
    if (user && user.role === 'resepsionis') {
        return getRole(user?.token)
    }
    else {
        return false
    }
}