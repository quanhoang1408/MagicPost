import { useContext, useEffect, useState } from "react";

import { ToastContext } from "~/components/Toast/Toast";
import Button from '~/components/Button';

function Home() {
    const toast = useContext(ToastContext);
    const [user, setUser] = useState();

    useEffect(() => {
        setUser('hoang anh');
    }, []);

    useEffect(() => {
        toast.showSuccessToast('Thêm thành công')
    }, [user]);

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