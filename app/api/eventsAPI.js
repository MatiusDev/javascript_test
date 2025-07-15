import { getData, createData, updateData, deleteData, patchData } from "./api.js";

const ENDPOINT = "events";

const getEvents = async () => {
    return await getData(ENDPOINT);
};

const getEventById = async (id) => {
    return await getData(`${ENDPOINT}/${id}`)
}

const newEvent = async (data) => {
    return await createData(ENDPOINT, data);
};

const patchEvent = async(id, data) => {
    return await patchData(ENDPOINT, id, data);
}

const updateEvent = async (id, data) => {
    return await updateData(ENDPOINT, id, data);
};

const deleteEvent = async (id) => {
    return await deleteData(ENDPOINT, id);
};

export { 
    getEvents,
    getEventById,
    newEvent,
    updateEvent,
    patchEvent,
    deleteEvent
}