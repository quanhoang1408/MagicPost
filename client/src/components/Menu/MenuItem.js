import classNames from "classnames/bind";
import styles from './Menu.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', { [`${data.className}`]: data.className });

    return (
        <Button 
            className={classes} 
            leftIcon={data.icon}
            href={data.href}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;