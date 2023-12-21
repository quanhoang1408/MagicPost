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

export const getStationHasNoLead = async () => {
    try {
        const res = await httpRequest.get('stations/get/hasnolead');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const addStation = async (name, address, phone_number) => {
    try {
        console.log(name, address, phone_number);
        const res = await httpRequest.post('stations/add',{
            "name": name,
            "address": address,
            "phone_number": phone_number,
        } );
        // console.log(res);
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