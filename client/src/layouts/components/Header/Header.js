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
import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

function Header() {
    const [isUser, setIsUser] = useState(true);
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

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* <div className={cx('logo-wrapper')}>
                </div> */}
                <Link to={config.routes.manage} className={cx('logo-link')}>
                    <img src={images.logo} alt='Magic Post' />
                </Link>

                <div className={cx('action')}>
                    {isUser ? (
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