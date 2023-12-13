import classNames from "classnames/bind";
import { useContext, useState } from "react";
import styles from './Signup.module.scss';

import Button from '~/components/Button';
import Input from "~/components/Input";
import { ModalContext } from "~/pages/Authentication/Authentication";

const cx = classNames.bind(styles);

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(ModalContext);

    const handleSignup = () => {
        // userSignup();
    }

    const handleLogin = (e) => {
        e.preventDefault();
        context.handleModalValue('login');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Đăng ký</h2>

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
                    type='password'
                    value={password}
                    placeholder='Mật khẩu' 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    className={cx('submit-btn')} 
                    primary
                    onClick={handleSignup}
                >
                    Đăng ký
                </Button>
            </div>
            
            <footer className={cx('footer-wrapper')}>
                <div className={cx('policy-confirm')}>
                    <p>
                        Bằng việc tiếp tục, bạn đồng ý với 
                        <a className={cx('policy-link')} href="/"> Điều khoản dịch vụ </a>
                        và xác nhận răng bạn đã đọc 
                        <a className={cx('policy-link')} href="/"> Chính sách riêng tư</a>.
                    </p>
                </div>

                <div className={cx('footer')}>
                    Đã có tài khoản? 
                    <a 
                        className={cx('auth-link')} 
                        href="/login"
                        onClick={(e) => handleLogin(e)}
                    >
                        Đăng nhập
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Signup;