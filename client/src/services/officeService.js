import * as httpRequest from '~/utils/httpRequest';

export const getAllOffice = async () => {
    try {
        const res = await httpRequest.get('offices');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const getOfficeHasNoLead = async () => {
    try {
        const res = await httpRequest.get('offices/get/hasnolead');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const getOfficeById = async (id) => {
    try {
        const res = await httpRequest.get(`offices/${id}`);
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const deleteOffice = async (id) => {
    try {
        const res = await httpRequest.del(`offices/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const addOffice = async (name, address, phone_number, station) => {
    try {
        const res = await httpRequest.post('offices/add',{
            "name": name,
            "address": address,
            "phone_number": phone_number,
            "station": station
        } );
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const updateOffice = async (id, name, address, phone_number, station) => {
    try {
        const res = await httpRequest.put(`offices/update/${id}`, {
            name,
            address,
            phone_number,
            station
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}