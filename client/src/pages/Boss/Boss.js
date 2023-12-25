import { useContext, useEffect, useState } from "react";
import { authUserContext } from '~/App';
import { ToastContext } from '~/components/Toast/Toast';

function Boss() {
    const [isLoaded, setIsLoad] = useState(false);
    const authUser = useContext(authUserContext);
    const toast = useContext(ToastContext);

    useEffect(() => {
        if (authUser && !isLoaded) {
            toast.showSuccessToast('Đăng nhập thành công');
            setIsLoad(true);
            // console.log('[boss]', authUser);
        }
    }, [authUser]);
    
    return (
        <h2>Boss page</h2>
    );
}

export default Boss;