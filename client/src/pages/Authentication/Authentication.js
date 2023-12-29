import classNames from "classnames/bind";
import { createContext, useState, useEffect } from "react";
import styles from './Authentication.module.scss';

// // Modal
import Modal from "~/components/Modal";
import Login from "~/components/Modal/components/Login";
import Signup from "~/components/Modal/components/Signup";
import images from '~/assets/images';

const cx = classNames.bind(styles);

export const ModalContext = createContext();

function Authentication() {
    // // Modal
    // const [modalValue, setModalValue] = useState('login');
    // const [children, setChildren] = useState(<Login />)

    // // Handle modal
    // const handleModalValue = (value) => {
    //     setModalValue(value || 'login');
    // }

    // const value = {
    //     modalValue,
    //     handleModalValue,
    // };

    // useEffect(() => {
    //     switch(modalValue) {
    //         case 'login':
    //             setChildren(<Login />);
    //             break;
    //         case 'signup':
    //             setChildren(<Signup />);
    //             break;
    //         default:
    //             setChildren(<Login />)
    //             break;
    //     }
    //     // console.log(modalValue);
    // }, [modalValue]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* <ModalContext.Provider value={value}>
                    {
                        <Modal>
                            {children}
                        </Modal>
                    }
                </ModalContext.Provider> */}
                <div className={cx('image-wrapper')}>
                    <img className={cx('image')} src={images.loginImage} alt='Login_image' />
                </div>
                <div className={cx('login')}>
                    <Login />
                </div>
            </div>
        </div>
    );
}

export default Authentication;