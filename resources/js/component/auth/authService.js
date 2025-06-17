import api from "../../axios";

export const fetchUsers = () => {
    return api.get("/user");
};

export const createUsers = (data) => {
    return api.post("/user", data);
};

export const updateUsers = (id, data) => {
    return api.put(`/user/${id}`, data);
};
export const dedleteUsers = (id) => {
    return api.get(`/user/${id}`);
};
