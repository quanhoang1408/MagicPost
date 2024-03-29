import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './Sidebar.module.scss';
import config from '~/config';
import { authUserContext } from '~/App';
import Image from '~/components/Image';
import Menu, { MenuItem } from "./Menu";
import { faBox, faFileCirclePlus, faFilePen, faHouse, faLocationDot, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function Sidebar() {
    const [role, setRole] = useState();
    const [subMenu, setSubMenu] = useState([]);
    const [menuItem, setMenuItem] = useState();

    const authUser = useContext(authUserContext);
    const menuRef = useRef();

    // Get role of user
    useEffect(() => {
        if (authUser && authUser.role) {
            setRole(authUser.role);
            // 
            // console.log('[sidebar]', authUser);
        }
    }, [authUser]);
    
    // useEffect(() => {setRole('boss');}, [])

    // Show menu item base on role
    const handleSetMenuItem = (role) => {
        switch(role) {
            case 'boss':
                setMenuItem (
                    <>
                        <MenuItem className={cx('menu-item')} title='Trang chủ' to={config.routes.boss} icon={<FontAwesomeIcon icon={faHouse} />} />
                        <MenuItem 
                            className={cx('menu-item', 'has-sub-menu')} 
                            title='Quản lý điểm' 
                            icon={<FontAwesomeIcon icon={faLocationDot} />} 
                            onClick={(e) => handleToggleSubMenu(e)}
                        >
                            <Menu className={cx('sub-menu')}>
                                <MenuItem className={cx('sub-menu-item')} title='Điểm tập kết' to={config.routes.stationManagement} />
                                <MenuItem className={cx('sub-menu-item')} title='Điểm giao dịch' to={config.routes.officeManagement} />
                            </Menu>
                        </MenuItem>
                        <MenuItem 
                            className={cx('menu-item', 'has-sub-menu')} 
                            title='Quản lý trưởng điểm' 
                            icon={<FontAwesomeIcon icon={faUserGroup} />} 
                            onClick={(e) => handleToggleSubMenu(e)}
                        >
                            <Menu className={cx('sub-menu')}>
                                <MenuItem className={cx('sub-menu-item')} title='Trưởng điểm tập kết' to={config.routes.stationLeaderManagement} />
                                <MenuItem className={cx('sub-menu-item')} title='Trưởng điểm giao dịch' to={config.routes.officeLeaderManagement} />
                            </Menu>
                        </MenuItem>
                        {/* <MenuItem 
                            className={cx('menu-item', 'has-sub-menu')} 
                            title='Thống kê hàng' 
                            icon={<FontAwesomeIcon icon={faBox} />} 
                            onClick={(e) => handleToggleSubMenu(e)}
                        >
                            <Menu className={cx('sub-menu')}>
                                <MenuItem className={cx('sub-menu-item')} title='Hàng nhận' to={config.routes.orderInStatistic} />
                                <MenuItem className={cx('sub-menu-item')} title='Hàng gửi' to={config.routes.orderOutStatistic} />
                            </Menu>
                        </MenuItem> */}
                    </>
                );
                break;
            case 'station_lead':
                setMenuItem (
                    <>
                        <MenuItem className={cx('menu-item')} title='Trang chủ' to={config.routes.leader} icon={<FontAwesomeIcon icon={faHouse} />} />
                        <MenuItem className={cx('menu-item')} title='Quản lý nhân viên' icon={<FontAwesomeIcon icon={faUserGroup} />} to={config.routes.stationEmployeeManagement} />
                        <MenuItem className={cx('menu-item')} title='Quản lý đơn hàng' to={config.routes.stationOrderManagement} icon={<FontAwesomeIcon icon={faFilePen} />} />
                    </>
                );
                break;
            case 'office_lead':
                setMenuItem (
                    <>
                        <MenuItem className={cx('menu-item')} title='Trang chủ' to={config.routes.leader} icon={<FontAwesomeIcon icon={faHouse} />} />
                        <MenuItem className={cx('menu-item')} title='Quản lý nhân viên' icon={<FontAwesomeIcon icon={faUserGroup} />} to={config.routes.officeEmployeeManagement} />
                        <MenuItem 
                            className={cx('menu-item', 'has-sub-menu')} 
                            title='Quản lý đơn hàng' 
                            icon={<FontAwesomeIcon icon={faFilePen} />} 
                            onClick={(e) => handleToggleSubMenu(e)}
                        >
                            <Menu className={cx('sub-menu')}>
                                <MenuItem className={cx('sub-menu-item')} title='Đơn hàng nhận' to={config.routes.officeOrderInManagement} />
                                <MenuItem className={cx('sub-menu-item')} title='Đơn hàng gửi' to={config.routes.officeOrderOutManagement} />
                            </Menu>
                        </MenuItem>
                    </>
                );
                break;
            case 'station_staff':
                setMenuItem (
                    <>
                        <MenuItem className={cx('menu-item')} title='Trang chủ' to={config.routes.employee} icon={<FontAwesomeIcon icon={faHouse} />} />
                        <MenuItem className={cx('menu-item')} title='Quản lý đơn hàng' to={config.routes.stationOrderManagement} icon={<FontAwesomeIcon icon={faFilePen} />} />
                    </>
                );
                break;
            case 'office_staff':
                setMenuItem (
                    <>
                        <MenuItem className={cx('menu-item')} title='Trang chủ' to={config.routes.employee} icon={<FontAwesomeIcon icon={faHouse} />} />
                        <MenuItem className={cx('menu-item')} title='Tạo đơn hàng' to={config.routes.officeCreateOrder} icon={<FontAwesomeIcon icon={faFileCirclePlus} />} />
                        <MenuItem 
                            className={cx('menu-item', 'has-sub-menu')} 
                            title='Quản lý đơn hàng' 
                            icon={<FontAwesomeIcon icon={faFilePen} />} 
                            onClick={(e) => handleToggleSubMenu(e)}
                        >
                            <Menu className={cx('sub-menu')}>
                                <MenuItem className={cx('sub-menu-item')} title='Đơn hàng nhận' to={config.routes.officeOrderInManagement} />
                                <MenuItem className={cx('sub-menu-item')} title='Đơn hàng gửi' to={config.routes.officeOrderOutManagement} />
                            </Menu>
                        </MenuItem>
                    </>
                );
                break;
            default:
                break;
        }
    }
    
    useEffect(() => {
        if (!!role) {
            handleSetMenuItem(role);
        }
    }, [role]);

    // Find all sub menu
    useEffect(() => {
        if (!!menuItem) {
            const menu = menuRef.current;
            const menuList = menu.childNodes;
            
            menuList.forEach(item => {
                if (item.tagName.toLowerCase() === 'nav') {
                    setSubMenu((prev) => ([...prev, item]));
                }
            });
        }
    }, [menuItem]);

    // Active menu item when click on sub menu item
    useEffect(() => {
        if (subMenu.length > 0) {
            subMenu.forEach(menu => {
                const menuList = menu.childNodes;
                const menuItem = menu.previousSibling;

                if (menuItem.classList.contains(cx('active'))) {
                    menuItem.classList.remove(cx('active'));
                }

                for (let i = 0; i < menuList.length; i++) {
                    if (menuList[i].classList.contains(cx('active'))) {
                        if (!menuItem.classList.contains(cx('active'))) {
                            menuItem.classList.add(cx('active'));
                            break;
                        }
                    } 
                }
            });
        }
    });

    // Toggle sub menu when click on menu item
    const handleToggleSubMenu = (e) => {
        const item = e.currentTarget;
        if (!item.classList.contains(cx('toggle-sub-menu'))) {
            item.classList.add(cx('toggle-sub-menu'));
            return;
        } else {
            item.classList.remove(cx('toggle-sub-menu'));
            return;
        }
    }

    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('user-info')}>
                <Image 
                    className={cx('user-avatar')} 
                    src=''
                    alt='user'
                />
                <p className={cx('user-name')}>Nguyễn Hà Hoàng Anh</p>
                <p className={cx('user-role')}>Chủ tịch</p>
            </div> */}
            <Menu ref={menuRef}>
                {menuItem}
            </Menu>
        </div>
    );
}

export default Sidebar;