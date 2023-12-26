import { useContext, useEffect, useState } from "react";
import { ToastContext } from '~/components/Toast/Toast';

function Boss() {
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
    
    return (
        <h2>Boss page</h2>
    );
}

export default Boss;