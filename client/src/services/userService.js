import * as httpRequest from '~/utils/httpRequest';

export const getUserById = async () => {
    try {
        const res = await httpRequest.get('users/id');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const updateUserById = async (id, name, sex, phone_number) => {
    try {
        const res = await httpRequest.put(`users/update/${id}`, {name, sex, phone_number});
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const changePassword = async (id, password) => {
    try {
        const res = await httpRequest.put(`users/change-password/${id}`, {password});
        return res;
    } catch(error) {
        console.log(error)
    }
}