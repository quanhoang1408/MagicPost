import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';

import Header from './Header';
import { createContext, useState } from 'react';

const cx = classNames.bind(styles);

export const HeaderContext = createContext();

function HeaderOnly({ children }) {
    const [navItemValue, setNavItemValue] = useState('nav_home');

    const handleNavItemValue = (value) => {
        setNavItemValue(value || 'nav_home');
    }

    const value = {
        navItemValue,
        handleNavItemValue,
    };

    return (
        <div className={cx('wrapper')}>
            <HeaderContext.Provider value={value}>
                <Header />
                <main className={cx('container')}>
                    {children}
                </main>
            </HeaderContext.Provider>
        </div>
    );
}

export default HeaderOnly;