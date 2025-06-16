import api from "../../axios";
export const fetchPaket = () => {
    return api.get("/paket");
};
