import * as httpRequest from '~/utils/httpRequest';

export const getAllOffice = async () => {
    try {
        const res = await httpRequest.get('offices');
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