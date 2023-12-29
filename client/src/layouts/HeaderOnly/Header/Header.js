import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

import images from '~/assets/images';
import Button from '~/components/Button';
import { HeaderContext } from '../HeaderOnly';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);



function Header() {
    const navRef = useRef();
    const context = useContext(HeaderContext);

    const handleLogoClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    // Nav
    useEffect(() => {
        const navList = navRef.current.childNodes;
        navList.forEach(item => {
            if (item.classList.contains(cx('active'))) {
                item.classList.remove(cx('active'));
            }

            if (item.id === context.navItemValue) {
                if (!item.classList.contains(cx('active'))) {
                    item.classList.add(cx('active'));
                }
            }
        });
    }, [context.navItemValue]);

    const toggleNav = () => {
        const nav = navRef.current;
        if (window.innerWidth < 1023) {
            if (nav.style.display === 'block') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
            }
        } else {
            nav.style.display = 'flex';
        }
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <div className={cx('menu-btn')} onClick={toggleNav}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
    
                    <Link to={config.routes.home} className={cx('logo-link')} onClick={handleLogoClick}>
                        <img src={images.logo} alt='Magic Post' />
                    </Link>
                </div>
                
                <nav>
                    <ul ref={navRef} className={cx('nav-list')}>
                        <li id='nav_home' className={cx('nav-item', 'active')} onClick={toggleNav}>
                            <Button className={cx('nav-link')} href='#home'>Trang chủ</Button>
                        </li>
                        <li id='nav_introduction' className={cx('nav-item')} onClick={toggleNav}>
                            <Button className={cx('nav-link')} href='#introduction'>Giới thiệu</Button>
                        </li>
                        <li id='nav_research' className={cx('nav-item')} onClick={toggleNav}>
                            <Button className={cx('nav-link')} href='#research'>Tra cứu</Button>
                        </li>
                        <li id='nav_contact' className={cx('nav-item')} onClick={toggleNav}>
                            <Button className={cx('nav-link')} href='#contact'>Liên hệ</Button>
                        </li>
                    </ul>
                </nav>

                <div className={cx('action')}>
                    <Button 
                        className={cx('login-btn')}
                        to={config.routes.authentication} 
                        primary
                    >
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;