import * as httpRequest from '~/utils/httpRequest';

export const getAllStation = async () => {
    try {
        const res = await httpRequest.get('stations');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const getStationById = async (id) => {
    try {
        const res = await httpRequest.get(`stations/${id}`);
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const updateStation = async (id, name, address, phone_number) => {
    try {
        const res = await httpRequest.put(`stations/update/${id}`, {
            name,
            address,
            phone_number
        });
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const deleteStation = async (id) => {
    try {
        const res = await httpRequest.del(`stations/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error)
    }
}