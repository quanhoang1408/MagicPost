import * as httpRequest from '~/utils/httpRequest';

export const getAllStationLeads = async () => {
    try {
        const res = await httpRequest.get('users/station-leads');
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const addStationLead = async (email, password, name, role, work_place, sex, phone_number ) => {
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

export const updateStationLead = async (id, name, sex, phone_number) => {
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

export const deleteStationLead = async (id) => {
    try {
        const res = await httpRequest.del(`users/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error)
    }
}