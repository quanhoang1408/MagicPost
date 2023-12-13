import * as httpRequest from '~/utils/httpRequest';

export const getUserById = async () => {
    try {
        const res = await httpRequest.get('users/id');
        return res;
    } catch (error) {
        console.log(error)
    }
}