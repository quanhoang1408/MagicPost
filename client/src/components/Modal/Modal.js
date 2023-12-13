import classNames from "classnames/bind";
import styles from './Modal.module.scss';

import { CloseButtonIcon } from '../Icon';

const cx = classNames.bind(styles);

function Modal({ className, children, onClose }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', className)}>
                {onClose &&
                    <div className={cx('close')} onClick={onClose}>
                        <CloseButtonIcon className={cx('close-icon')} />
                    </div>
                }

                <main className={cx('body')}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Modal;