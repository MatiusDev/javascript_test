import { getData, createData, updateData, patchData, deleteData } from "./api.js";

const ENDPOINT = "users";

const getUsers = async () => {
    return await getData(ENDPOINT);
};

const getUserByUsername = async (username) => {
    const users = await getUsers();
    return users ? users.filter((user) => user.username === username)[0] : null;
}

const newUser = async (data) => {
    return await createData(ENDPOINT, data);
};

const patchUser = async (id, data) => {
    return await patchData(ENDPOINT, id, data);
};

const updateUser = async (id, data) => {
    return await updateData(ENDPOINT, id, data);
};

const deleteUser = async (id) => {
    return await deleteData(ENDPOINT, id);
};

export { 
    getUsers,
    getUserByUsername,
    newUser,
    updateUser,
    patchUser,
    deleteUser
}