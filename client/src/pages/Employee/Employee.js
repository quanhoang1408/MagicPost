import { useContext, useEffect, useState } from "react";
import { ToastContext } from '~/components/Toast/Toast';

function Employee() {
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
        // console.log('[employee]', url);
    }, []);
    
    return (
        <h2>Employee page</h2>
    );
}

export default Employee;