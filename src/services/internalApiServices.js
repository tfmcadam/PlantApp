import axios from 'axios';

// main axios call

const http = axios.create({
    baseURL: 'http://localhost:8001/api',
});

// get all plants
export const getAllPlants = async () => {
    const res = await http.get('/plants');
    return res.data;
}

// create new plant
export const createPlant = async (data) => {
    const res = await http.post('/plants', data);
    return res.data;
}

// get plant by id
export const getPlantById = async (id) => {
    const res = await http.get(`/plants/${id}`);
    return res.data
}

// update Plant
export const updatePlant = async (id, data) => {
    const res = await http.put(`/plants/${id}`, data);
    return res.data;
}

// delete Plant
export const deletePlant = async (id) => {
    const res = await http.delete(`/plants/${id}`);
    return res.data;
}