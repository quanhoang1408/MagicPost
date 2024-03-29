import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import styles from './PasswordForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Popper from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ToastContext } from '~/components/Toast/Toast';

import * as userService from '~/services/userService';

const cx = classNames.bind(styles);


function PasswordForm({ employee, handleCloseModal}) {
    const [password, setPassword] = useState();

    const toast = useContext(ToastContext);

    const handleSave = () => {
        userService.changePassword(employee._id, password)
            .then(data => {
                if(data.success === true) {
                    toast.showSuccessToast("Đổi mật khẩu nhân viên thành công");
                }
            }
        )
        handleCloseModal();
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Đổi mật khẩu</h2>

                <div className={cx('grid-col-3-7')}>
                    <div className={cx('info-label')}>
                        <div className={cx('label')}>
                            Mật khẩu mới:
                        </div>
                    </div>
                    <div className={cx('info-detail')}>
                        <Input 
                            className={cx('input-wrapper')}
                            type='text' 
                            value={password}
                            placeholder='Nhập mật khẩu mới' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <Button 
                    className={cx('submit-btn')} 
                    primary
                    onClick={handleSave}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export default PasswordForm;