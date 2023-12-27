import { useState, useEffect, createContext, useContext } from "react";
import classNames from "classnames/bind";
import styles from './Header.module.scss';
import { Link } from "react-router-dom";
import config from '~/config';

import images from '~/assets/images';
import Button from "~/components/Button";
import Image from '~/components/Image';
import Menu from '~/components/Menu';
import { UserIcon, LogOutIcon } from "~/components/Icon";
import { authUserContext } from '~/App';
import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

function Header() {
    const [role, setRole] = useState('');
    const authUser = useContext(authUserContext);
    
    const MENU_ITEMS = [
        {
            icon: <UserIcon />,
            title: 'Xem hồ sơ',
            // to: '/:nickname',
            to: '/profile',
        },
        {
            icon: <LogOutIcon />,
            title: 'Đăng xuất',
            // link: '/logout',
            to: config.routes.home,
            className: 'separate',
        }
    ];

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch(menuItem.to) {
            case config.routes.home:
                authService.logout();
                // window.location.assign(config.routes.home);
                break;
            // case '/:nickname':
                // window.location.href = `/:${authUser.data.nickname}`;
                // break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (authUser && authUser.role) {
            if (authUser.role === 'boss') {
                setRole('Lãnh đạo');
            } else if (authUser.role === 'station_lead') {
                setRole('Trưởng điểm tập kết');
            } else if (authUser.role === 'office_lead') {
                setRole('Trưởng điểm giao dịch');
            } else if (authUser.role === 'station_staff') {
                setRole('Nhân viên tập kết');
            } else if (authUser.role === 'office_staff') {
                setRole('Nhân viên giao dịch');
            }
        }
    }, [role, authUser]);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* <div className={cx('logo-wrapper')}>
                </div> */}
                <Link to={config.routes.manage} className={cx('logo-link')}>
                    <img src={images.logo} alt='Magic Post' />
                </Link>

                <div className={cx('action')}>
                    {authUser ? (
                        <>
                            <div className={cx('user-info')}>
                                <p className={cx('user-name')}>{authUser.name}</p>
                                <p className={cx('user-role')}>{role}</p>
                            </div>
                            <Menu
                                className={cx('header-menu-list')}
                                items={MENU_ITEMS}
                                placement='bottom-end'
                                offset={[12, 16]}
                                onChange={handleMenuChange}
                                menuPopper={cx('header-menu-popper')}
                            >
                                <Image 
                                    className={cx('user-avatar')} 
                                    src='' 
                                    alt='User' 
                                />
                            </Menu>
                        </>
                    ) : (
                        <Button 
                            className={cx('login-btn')}
                            to={config.routes.authentication} 
                            primary
                        >
                            Đăng nhập
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;