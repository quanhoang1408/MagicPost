import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button ({ 
    to, 
    href, 
    className,
    primary = false, 
    outline = false, 
    text = false,
    secondary = false,
    disable = false, 
    large = false,
    children,
    leftIcon,
    rightIcon,
    onClick, 
    ...otherProps 
}, ref) {
    let Comp = 'button';
    const props = {
        onClick,
        ...otherProps,
    };

    // Remove event listener in disabled button
    if (disable) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function')
                delete props[key];
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        secondary,
        disable,
        large,
    });

    return (
        <Comp ref={ref} className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {children && <span className={cx('title')}>{children}</span>}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default forwardRef(Button);