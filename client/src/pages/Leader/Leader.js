import { useContext, useEffect } from "react";

import { ToastContext } from "~/components/Toast/Toast";
import Button from '~/components/Button';

function Home() {
    const toast = useContext(ToastContext);

    useEffect(() => {
        const url = window.history.state.prevUrl;
        if (url) {
            const urlComponents = url.split('/');
            const prevPage = urlComponents[urlComponents.length - 1];
            if (prevPage === 'authentication') {
                toast.showSuccessToast('Đăng nhập thành công');
            }
        }
        // console.log('[boss]', url);
    }, []);

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