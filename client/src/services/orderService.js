import * as httpRequest from "../utils/httpRequest";

export const createOrder = async (order) => {
    try {
        const res = await httpRequest.post('orders/create', order);
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const getOfficeOrderOutCustomer = async () => {
    try {
        const res = await httpRequest.get('orders/');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const getOfficeOrderOutStation = async () => {
    try {
        const res = await httpRequest.get('orders/');
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