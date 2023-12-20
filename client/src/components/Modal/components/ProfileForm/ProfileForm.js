import classNames from 'classnames/bind';
import { useEffect ,useState } from 'react';
import styles from './ProfileForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function ProfileForm({ data }) {
    const [avatar, setAvatar] = useState(data !== undefined ? data.avatar : '');
    const [name, setName] = useState(data !== undefined ? data.name : '');
    const [gender, setGender] = useState(data !== undefined ? data.gender : '');
    const [mobile, setMobile] = useState(data !== undefined ? data.phone_number : '');
    const [previewAvatar, setPreviewAvatar] = useState();
    
    useEffect(() => {
        return () => {
            previewAvatar && URL.revokeObjectURL(previewAvatar.preview)
        }
    }, [previewAvatar]);
    
    const handlePreviewImage = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setPreviewAvatar(file);
    }
// console.log(previewAvatar === undefined);
    const handleSave = () => {
        
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h2 className={cx('header')}>Thông tin cá nhân</h2>

                <h4 className={cx('info-header')}>Ảnh đại diện</h4>
                <div className={cx('image-wrapper')}>
                    {(previewAvatar === undefined) &&
                        <Image 
                            className={cx('user-image')}
                            src={avatar}
                            alt={name}
                        />
                    }
                    {(previewAvatar !== undefined) &&
                        <Image 
                            className={cx('user-image')}
                            src={previewAvatar.preview}
                            alt={name}
                        />
                    }
                    <input
                        type='file'
                        onChange={(e) => handlePreviewImage(e)}
                    />
                </div>

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