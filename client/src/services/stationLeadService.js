import * as httpRequest from '~/utils/httpRequest';

export const getAllStationLeads = async () => {
    try {
        const res = await httpRequest.get('users/station-leads');
        return res;
    } catch (error) {
        console.log(error)
    }
}