import classNames from 'classnames/bind';
import { useEffect ,useState } from 'react';
import styles from './ProfileForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Image from '~/components/Image';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);


function ProfileForm({ data, handleCloseModal }) {\
    const [name, setName] = useState(data !== undefined ? data.name : '');
    const [sex, setSex] = useState(data !== undefined ? data.sex : '');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState(data !== undefined ? data.phone_number : '');
    
    useEffect(() => {
        if(data !== undefined) {
            if(data.sex === 'M') {
                setGender('Nam');
            } else {
                setGender('Nữ');
            }
        }
    }, [data]);
      
    const handleSave = () => {
        if(gender === 'Nam') {
            setSex('M');
        }else {
            setSex('F');
        }
        userService.updateUserById(data._id, name, sex, mobile)
            .then(data => {
                if(data.success === true) {
                    alert ('Cập nhật thông tin thành công');
                    window.location.reload();
                }
            })
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Thông tin cá nhân</h2>
                
                <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                <div className={cx('grid-col-2-8')}>
                    <div className={cx('info-label')}>
                        <div className={cx('label')}>
                            Tên:
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
                        <div className={cx('radio-wrapper')}>
                            <input 
                                className={cx('input-radio')}
                                id='profile-form-gender-male'
                                type='radio' 
                                checked={gender.toLowerCase() === 'nam'}
                                onChange={() => {
                                    setGender('Nam')
                                }}
                            />
                            <label className={cx('label')} htmlFor='profile-form-gender-male'>
                                Nam
                            </label>
                            <input 
                                className={cx('input-radio')}
                                id='profile-form-gender-female'
                                type='radio' 
                                checked={gender.toLowerCase() === 'nữ'}
                                onChange={() => {
                                    setGender('Nữ')
                                }}
                            />
                            <label className={cx('label')} htmlFor='profile-form-gender-female'>
                                Nữ
                            </label>
                        </div>
                    </div>
                </div>

                <h4 className={cx('info-header')}>Thông tin liên hệ</h4>
                <div className={cx('grid-col-2-8')}>
                    <div className={cx('info-label')}>
                        <div className={cx('label')}>
                            Số điện thoại:
                        </div>
                    </div>
                    <div className={cx('info-detail')}>
                        <Input 
                            className={cx('input-wrapper')}
                            type='text' 
                            value={mobile}
                            placeholder='Số điện thoại' 
                            onChange={(e) => setMobile(e.target.value)}
                        />
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

export default ProfileForm;