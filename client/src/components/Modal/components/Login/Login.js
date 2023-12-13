import classNames from "classnames/bind";
import { useContext, useState } from "react";
import styles from './Login.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { EyeOpen, EyeClose } from "~/components/Icon";
import { ModalContext } from "~/pages/Authentication/Authentication";
import config from '~/config';

import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(ModalContext);

    // Handle login
    const userLogin = () => {
        authService
            .login(email, password)
            .then(data => {
                if (data === undefined) {
                    alert('Email or password is invalid! Please try again');
                } else {
                    if (data.meta && data.meta.token) {
                        localStorage.setItem('user', JSON.stringify(data));
                        window.location.assign(config.routes.boss);
                    }
                }
                
            })
            .catch(error => console.log(error));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        userLogin();
    }

    // Handle modal
    const handleToggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        context.handleModalValue('signup');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Đăng nhập</h2>

                <div className={cx('label')}>
                    Email
                </div>
                <Input 
                    className={cx('input-wrapper')}
                    type='email' 
                    value={email} 
                    placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <div className={cx('label')}>
                    Mật khẩu
                </div>
                <Input
                    className={cx('input-wrapper')}
                    inputClassName={cx('input')} 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    placeholder='Mật khẩu' 
                    onChange={(e) => setPassword(e.target.value)}
                >
                    <button className={cx('password-btn')} onClick={(e) => handleToggleShowPassword(e)}>
                        {showPassword ? <EyeOpen /> : <EyeClose />}
                    </button>
                </Input>
                <a className={cx('link', 'footer-link')} href='/login/phone-or-email/forget-password'>Quên mật khẩu?</a>
                <Button 
                    className={cx('submit-btn')} 
                    primary
                    onClick={(e) => handleLogin(e)}
                >
                    Đăng nhập
                </Button>
                
            </div>
            
            <footer className={cx('footer-wrapper')}>
                <div className={cx('footer')}>
                    Chưa có tài khoản? 
                    <a 
                        className={cx('auth-link')} 
                        href="/signup" 
                        onClick={(e) => handleSignup(e)}
                    >
                        Đăng ký
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Login;