import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import styles from './Employee.module.scss';

import Office from "./Office/";
import Station from "./Station/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { authUserContext } from '~/App';
import { ToastContext } from '~/components/Toast/Toast';

const cx = classNames.bind(styles);

function Employee() {
    const [role, setRole] = useState();

    const authUser = useContext(authUserContext);
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
        // console.log('[employee]', authUser);
    }, []);

    useEffect(() => {
        if (authUser && authUser.role) {
            setRole(authUser.role);
        }
    }, [authUser]);
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-wrapper')}>
                    <ul className={cx('breadcrumb')}>
                        <li className={cx('breadcrumb-item')}>
                            <h3 className={cx('header')}>Trang chủ</h3>
                        </li>
                        <li className={cx('breadcrumb-item')}>
                            <FontAwesomeIcon className={cx('breadcrumb-icon')} icon={faHouse} />
                            Trang chủ
                        </li>
                    </ul>
                </div>
                <div className={cx('content')}>
                    {(role === 'station_lead') ? (
                        <Station />
                    ) : (
                        <Office />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Employee;