import { useContext, useEffect, useState } from "react";
import { authUserContext } from '~/App';
import { ToastContext } from '~/components/Toast/Toast';

function Employee() {
    const [isLoaded, setIsLoad] = useState(false);
    const authUser = useContext(authUserContext);
    const toast = useContext(ToastContext);

    useEffect(() => {
        if (authUser && !isLoaded) {
            toast.showSuccessToast('Đăng nhập thành công');
            setIsLoad(true);
            console.log('[employee]', authUser);
        }
    }, [authUser]);
    
    return (
        <h2>Employee page</h2>
    );
}

export default Employee;