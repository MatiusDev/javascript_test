import { getData, createData, updateData, deleteData } from "./api.js";

const ENDPOINT = "events";

const getEvents = async () => {
    return await getData(ENDPOINT);
};

const newEvent = async (data) => {
    return await createData(ENDPOINT, data);
};

const updateEvent = async (id, data) => {
    return await updateData(ENDPOINT, id, data);
};

const deleteEvent = async (id) => {
    return await deleteData(ENDPOINT, id);
};

export { 
    getEvents,
    newEvent,
    updateEvent,
    deleteEvent
}