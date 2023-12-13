import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './EmployeeForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';

const cx = classNames.bind(styles);

function EmployeeForm({ employee, employeeRole }) {
    const [name, setName] = useState(employee !== undefined ? employee.name : '');
    const [birthday, setBirthday] = useState(employee !== undefined ? employee.birthday.split('/').reverse().join('-') : '');
    const [gender, setGender] = useState(employee !== undefined ? employee.gender : '');
    const [mobile, setMobile] = useState(employee !== undefined ? employee.mobile : '');
    const [role, setRole] = useState(employee !== undefined ? employee.role : employeeRole);
    const [workPlace, setWorkPlace] = useState(employee !== undefined ? employee.workPlace : '');
    const [address, setAddress] = useState(employee !== undefined ? employee.address : '');
    const [email, setEmail] = useState(employee !== undefined ? employee.email : '');
    const [password, setPassword] = useState(employee !== undefined ? employee.password : '');
    const [joiningDate, setJoiningDate] = useState(employee !== undefined ? employee.joiningDate.split('/').reverse().join('-') : '');

    const handleSave = () => {
        
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Thông tin nhân viên</h2>

                <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                <div className={cx('grid-col-2')}>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Tên:
                            </div>
                            <div className={cx('label')}>
                                Chức vụ:
                            </div>
                            <div className={cx('label')}>
                                Giới tính:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={name}
                                placeholder='Tên nhân viên' 
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={role}
                                placeholder='Chức vụ' 
                                readOnly
                            />
                            <div className={cx('radio-wrapper')}>
                                <input 
                                    className={cx('input-radio')}
                                    id='employee-form-gender-male'
                                    type='radio' 
                                    checked={gender.toLowerCase() === 'nam'}
                                    onChange={() => {setGender('nam')}}
                                />
                                <label className={cx('label')} for='employee-form-gender-male'>
                                    Nam
                                </label>
                                <input 
                                    className={cx('input-radio')}
                                    id='employee-form-gender-female'
                                    type='radio' 
                                    checked={gender.toLowerCase() === 'nữ'}
                                    onChange={() => {setGender('nữ')}}
                                />
                                <label className={cx('label')} for='employee-form-gender-female'>
                                    Nữ
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Ngày sinh:
                            </div>
                            <div className={cx('label')}>
                                Ngày tham gia:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='date' 
                                value={birthday}
                                onChange={(e) => {setBirthday(e.target.value)}}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='date' 
                                value={joiningDate}
                                onChange={(e) => {setJoiningDate(e.target.value)}}
                            />
                        </div>
                    </div>
                </div>

                <h4 className={cx('info-header')}>Thông tin liên hệ</h4>
                <div className={cx('grid-col-2')}>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Số điện thoại:
                            </div>
                            <div className={cx('label')}>
                                Email:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='number' 
                                value={mobile}
                                placeholder='Số điện thoại' 
                                onChange={(e) => setMobile(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='email' 
                                value={email}
                                placeholder='Email' 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Địa chỉ:
                            </div>
                            <div className={cx('label')}>
                                Cơ quan:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={address}
                                placeholder='Địa chỉ' 
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={workPlace}
                                placeholder='Nơi làm việc' 
                                onChange={(e) => setWorkPlace(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <h4 className={cx('info-header')}>Thông tin tài khoản</h4>
                <div className={cx('grid-col-2')}>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Email:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='email' 
                                value={email}
                                placeholder='Email' 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Mật khẩu:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={password}
                                placeholder='Mật khẩu' 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <Button 
                    className={cx('submit-btn')} 
                    primary
                    onClick={handleSave}
                >
                    Save
                </Button>
                
            </div>
        </div>
    );
}

export default EmployeeForm;