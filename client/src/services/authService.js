import * as httpRequest from '~/utils/httpRequest';

export const login = async (email, password) => {
    try {
        const res = await httpRequest.post('login', {
            email,
            password
        });
        console.log("hui");
        return res;
    } catch (error) {
        console.log(error)
    }
};

export const logout = async () => {
    try {
        const res = await httpRequest.get('logout');
        return res;
    } catch (error) {
        console.log(error)
    }
}