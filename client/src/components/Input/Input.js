import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ className, inputClassName, type, value, placeholder, children, onChange, ...otherProps }) {
    return (
        <div className={cx('wrapper', className)}>
            <input 
                className={cx('input', inputClassName)} 
                type={type}
                value={value}
                placeholder={placeholder} 
                onChange={onChange}
                {...otherProps}
            />
            {children}
        </div>
    );
}

export default Input;