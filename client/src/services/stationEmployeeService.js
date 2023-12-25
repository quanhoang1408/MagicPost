import * as httpRequest from '~/utils/httpRequest';

export const getAllStationEmployees = async () => {
    try {
        const res = await httpRequest.get('users/station-staffs');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const addStationEmployee = async (email, password, name, role, work_place, sex, phone_number ) => {
    try {
        const res = await httpRequest.post('users/add',{
            "email": email,
            "password": password,
            "name": name,
            "role": role,
            "work_place": work_place,
            "sex" : sex, 
            "phone_number": phone_number
        } );
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const updateStationEmployee = async (id, name, sex, phone_number) => {
    try{
        const res = await httpRequest.put(`users/update/${id}`, {
            "name": name,
            "sex": sex,
            "phone_number": phone_number
    });
    return res;
    }catch(error){
        console.log(error)
    }
}

export const deleteStationEmployee = async (id) => {
    try {
        const res = await httpRequest.del(`users/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error)
    }
}