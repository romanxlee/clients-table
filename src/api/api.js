import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001'
})

export const getPartners = () => api.get('/partners')

export const updatePartner = (id, data) => api.patch(`/partners/${id}`, data)