import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from '../Sidebar.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ className, title, to, icon, rightIcon, children, ...otherProps }) {
    return (
        <>
            {!!to ? (
                <NavLink to={to} className={(nav) => cx(className, {active: nav.isActive})}>
                    <span className={cx('icon')}>{icon}</span>
                    <span className={cx('menu-title')}>{title}</span>
                </NavLink>
            ) : (
                <>
                    <div className={cx(className)} {...otherProps}>
                        <span className={cx('icon')}>{icon}</span>
                        <span className={cx('menu-title')}>{title}</span>
                        {/* <span className={cx('icon','right-icon')}>{rightIcon}</span> */}
                    </div>
                    {children}
                </>
            )}
        </>
    );
}

export default MenuItem;