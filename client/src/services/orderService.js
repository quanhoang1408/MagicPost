import * as httpRequest from "../utils/httpRequest";

export const createOrder = async (order) => {
    try {
        const res = await httpRequest.post('orders/create', order);
        return res;
    } catch (error) {
        console.log(error)
    }
}