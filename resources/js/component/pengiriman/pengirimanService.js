import api from "../../axios";

export const fetchPengiriman = () => {
    return api.get("/pengiriman");
};

export const createPengiriman = (data) => {
    return api.post("/pengiriman", data);
};

export const updatePengiriman = (id, data) => {
    return api.put(`/pengiriman/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deletePengiriman = (id) => {
    return api.delete(`/pengiriman/${id}`);
};

export const getPengirimanById = (id) => {
    return api.get(`/pengiriman/${id}`);
};
