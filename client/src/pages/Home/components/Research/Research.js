import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import styles from './Research.module.scss';

import ResearchOrder from './ResearchOrder';
import ResearchLocation from './ResearchLocation';
import { DocumentSearch, LocationSearch } from '~/components/Icon';

const cx = classNames.bind(styles);

function Research() {
    const navRef = useRef();
    const [children, setChildren] = useState(<ResearchOrder />);

    const handleNavClick = (e) => {
        const navList = navRef.current.childNodes;
        const navItem = e.currentTarget;

        navList.forEach(item => {
            if (item.classList.contains(cx('active'))) {
                item.classList.remove(cx('active'));
            }
        });

        if (!navItem.classList.contains(cx('active'))) {
                navItem.classList.add(cx('active'));
            }
        
        switch(navItem.id) {
            case 'nav-research-order':
                setChildren(<ResearchOrder />);
                break;
            case 'nav-research-location':
                setChildren(<ResearchLocation />);
                break;
            default:
                setChildren(<ResearchOrder />);
                break;
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <nav className={cx('header')}>
                    <ul ref={navRef} className={cx('nav-list')}>
                        <li id='nav-research-order' className={cx('nav-item', 'active')} onClick={(e) => handleNavClick(e)}>
                            <DocumentSearch className={cx('nav-icon')} />
                            Tra cứu bưu gửi
                        </li>
                        <li id='nav-research-location' className={cx('nav-item')} onClick={(e) => handleNavClick(e)}>
                            <LocationSearch className={cx('nav-icon')} />
                            Tìm kiếm bưu cục
                        </li>
                    </ul>
                </nav>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Research;