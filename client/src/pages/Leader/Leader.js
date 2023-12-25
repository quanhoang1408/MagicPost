import { useContext, useEffect, useState } from "react";

import { authUserContext } from '~/App';
import { ToastContext } from "~/components/Toast/Toast";
import Button from '~/components/Button';

function Home() {
    const [isLoaded, setIsLoad] = useState(false);
    const authUser = useContext(authUserContext);
    const toast = useContext(ToastContext);

    useEffect(() => {
        if (authUser && !isLoaded) {
            toast.showSuccessToast('Đăng nhập thành công');
            setIsLoad(true);
            // console.log('[leader]', authUser);
        }
    }, [authUser]);

    const handleSuccess = () => {
        toast.showSuccessToast('Đăng nhập thành công')
    }

    const handleError = () => {
        toast.showErrorToast('Đăng nhập thất bại')
    }

    return (
        <div>
            <h2>Home page</h2>
            <Button primary onClick={handleSuccess}>success</Button>
            <Button primary onClick={handleError}>error</Button>
        </div>
    );
}

export default Home;