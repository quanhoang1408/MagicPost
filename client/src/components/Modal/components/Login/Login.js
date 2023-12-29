import classNames from "classnames/bind";
import { useContext, useState } from "react";
import styles from './Login.module.scss';
import axios from "axios";
import Button from '~/components/Button';
import Input from '~/components/Input';
import { EyeOpen, EyeClose } from "~/components/Icon";
import { ModalContext } from "~/pages/Authentication/Authentication";
import { ToastContext } from "~/components/Toast/Toast";
import config from '~/config';

import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(ModalContext);
    const toast = useContext(ToastContext);

    const validate = ()=> {
        if(email === ""){
            toast.showErrorToast("Vui lòng nhập email");
            return false;
        }
        if(password === ""){
            toast.showErrorToast("Vui lòng nhập mật khẩu");
            return false;
        }
        return true;
    }
    // Handle login
    const userLogin = () => {
        // axios.post('http://localhost:8081/login', {email, password})
        // .then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
        authService
            .login(email, password)
            .then(data => {
                if (!data) {
                    toast.showErrorToast("Đăng nhập thất bại! Vui lòng kiểm tra tài khoản, mật khẩu");
                    return;
                }
                console.log(data);
                if (data.success === true) {
                    // toast.showSuccessToast(data.message);
                    // console.log(data)
                    if(data.user.role === "boss"){
                        window.history.pushState({ prevUrl: window.location.href }, null, config.routes.boss);
                        window.location.assign(config.routes.boss);
                    }else if(data.user.role === "station_lead" || data.user.role === "office_lead"){
                        window.history.pushState({ prevUrl: window.location.href }, null, config.routes.leader);
                        window.location.assign(config.routes.leader);
                    }else{
                        window.history.pushState({ prevUrl: window.location.href }, null, config.routes.employee);
                        window.location.assign(config.routes.employee);
                    }
                    
                } else {
                    toast.showErrorToast(data.message);
                    console.log(data);
                }
                
            })
            .catch(error => console.log(error));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            userLogin();
        }
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
                {/* <a className={cx('link', 'footer-link')} href='/login/phone-or-email/forget-password'>Quên mật khẩu?</a> */}
                <Button 
                    className={cx('submit-btn')} 
                    primary
                    onClick={(e) => handleLogin(e)}
                >
                    Đăng nhập
                </Button>
                
            </div>
            
            {/* <footer className={cx('footer-wrapper')}>
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
            </footer> */}
        </div>
    );
}

export default Login;