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
export const deleteUsers = (id) => {
    return api.delete(`/user/${id}`);
};
