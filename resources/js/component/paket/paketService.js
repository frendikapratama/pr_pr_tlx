// resources/js/paket/paketService.js
import api from "../../axios";

export const fetchPaket = () => {
    return api.get("/paket");
};

export const createPaket = (data) => {
    return api.post("/paket", data);
};

export const updatePaket = (id, data) => {
    return api.put(`/paket/${id}`, data);
};

export const deletePaket = (id) => {
    return api.delete(`/paket/${id}`);
};

export const getPaketById = (id) => {
    return api.get(`/paket/${id}`);
};
