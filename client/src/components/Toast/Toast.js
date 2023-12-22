import classNames from "classnames/bind";
import { createContext, useEffect, useRef, useState } from "react";
import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

export const ToastContext = createContext();

function Toast({ children }) {
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const mainRef = useRef();

    const toast = ({
        type,
        title,
        message,
    }) => {
        const main = mainRef.current;
        
        if (main) {
            const toast = document.createElement('div');
            if (toast) {
                // Auto remove toast
                const autoRemoveId = setTimeout(() => {
                    main.removeChild(toast);
                }, 4000);

                // Remove toast when click
                toast.onclick = (e) => {
                    if (e.target.classList.contains(cx('close'))) {
                        main.removeChild(toast);
                        clearTimeout(autoRemoveId);
                    }
                }

                toast.classList.add(cx('container'));
                toast.classList.add(cx(type));
                toast.innerHTML = `
                    <div class=${cx('icon')}></div>
                    <div class=${cx('content')}>
                        <h4 class=${cx('title')}>${title}</h4>
                        <p class=${cx('message')}>${message}</p>
                    </div>
                    <div class=${cx('close')}></div>
                `;

                main.appendChild(toast);

                setType('');
                setTitle('');
                setMessage('');
            }
        }
    } 

    const showSuccessToast = (myMessage = '') => {
        setType('success');
        setTitle('Thành công');
        setMessage(myMessage);
        // console.log('success');
    }

    const showErrorToast = (myMessage = '') => {
        setType('error');
        setTitle('Lỗi');
        setMessage(myMessage);
        // console.log('error');
    }

    useEffect(() => {
        if (type !== '' && title !== '' && message !== '') {
            toast({ type, title, message });
        }
    }, [type, title, message]);

    const value = {
        showSuccessToast,
        showErrorToast,
    }

    return (
        <ToastContext.Provider value={value}>
            <div className={cx('wrapper')} ref={mainRef}></div>
            {children}
        </ToastContext.Provider>
    );
}

export default Toast;