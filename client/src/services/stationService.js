import * as httpRequest from '~/utils/httpRequest';

export const getAllStation = async () => {
    try {
        const res = await httpRequest.get('stations');
        return res;
    } catch (error) {
        console.log(error)
    }
}