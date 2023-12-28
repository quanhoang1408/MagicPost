import * as httpRequest from "../utils/httpRequest";

export const createOrder = async (order) => {
    try {
        const res = await httpRequest.post('orders/create', order);
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const getStationOrder = async () => {
    try {
        const res = await httpRequest.get('orders/');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const getOfficeOrder = async () => {
    try {
        const res = await httpRequest.get('orders/');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const getOrdersCreated = async () => {
    try {
        const res = await httpRequest.get('orders/get/created');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const deliver = async (id, success) => {
    try {
        const res = await httpRequest.put(`orders/delivers/${id}`, {success});
        return res;
    }
    catch (error) {
        console.log(error)
    }
}

export const forward = async (id, dest_id, is_to_station) => {
    try {
        const res = await httpRequest.put(`orders/forward/${id}`, {dest_id, is_to_station});
        return res;
    }
    catch (error) {
        console.log(error)
    }
}

export const confirmArrival = async (id) => {
    try {
        const res = await httpRequest.put(`orders/confirmArrival/${id}`);
        return res;
    }
    catch (error) {
        console.log(error)
    }
}

export const getLogs = async (id) => {
    try {
        const res = await httpRequest.get(`orders/logs/${id}`)
        return res
    }
    catch (error) {
        console.log(error)
    }
}