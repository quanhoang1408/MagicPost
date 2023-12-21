import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import styles from './EmployeeForm.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Popper from '~/components/Popper';

import * as stationLeadService from '~/services/stationLeadService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ToastContext } from '~/components/Toast/Toast';

const cx = classNames.bind(styles);

const OFFICES = [
    {
        id: 1,
        name: 'Điểm giao dịch A',
        office_lead: {
            leaderId: 1,
            name: 'Nguyễn Văn B',
        },
        phone_number: '0987654321',
        email: 'A@gmail.com',
        create_date: '06/04/2003',
        address: '234 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội',
    },
]

const STATIONS = [
    {
        id: 1,
        name: 'Điểm tập kết A',
        station_lead: {
            leaderId: 1,
            name: 'Nguyễn Văn B',
        },
        phone_number: '0987654321',
        email: 'A@gmail.com',
        create_date: '06/04/2003',
        address: '234 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội',
    },
]

function EmployeeForm({ employee, employeeRole }) {
    const [name, setName] = useState(employee !== undefined ? employee.name : '');
    // const [birthday, setBirthday] = useState(employee !== undefined ? employee.birthday.split('/').reverse().join('-') : '');
    const [gender, setGender] = useState(employee !== undefined ? employee.gender : '');
    const [sex, setSex] = useState('');
    const [mobile, setMobile] = useState(employee !== undefined ? employee.mobile : '');
    const [role, setRole] = useState(employeeRole);
    const [role_name, setRole_name] = useState(employee !== undefined ? employee.role_name : '');
    const [workPlace, setWorkPlace] = useState(employee !== undefined ? employee.work_place_name : 'Chọn nơi làm việc');
    const [workPlaces, setWorkPlaces] = useState([]);
    // const [address, setAddress] = useState(employee !== undefined ? employee.address : '');
    const [email, setEmail] = useState(employee !== undefined ? employee.email : '');
    const [password, setPassword] = useState(employee !== undefined ? employee.password : '');
    // const [joiningDate, setJoiningDate] = useState(employee !== undefined ? employee.joiningDate.split('/').reverse().join('-') : '');
    const [isActive, setIsActive] = useState(false);

    const toast = useContext(ToastContext)

    useEffect(() => {
        switch (role) {
            case 'Trưởng điểm tập kết':
                setRole_name('station_lead');
                break;
            case 'Trưởng điểm giao dịch':
                setRole_name('office_lead');
                break;
            case 'Nhân viên điểm tập kết':
                setRole_name('station_staff');
                break;
            case 'Nhân viên điểm giao dịch':
                setRole_name('office_staff');
                break;
            default:
                break;
        }
    }, [role]);

    useEffect(() => {
        switch (role_name) {
            case 'station_lead':
                setWorkPlaces(STATIONS);
                break;
            case 'office_lead':
                setWorkPlaces(OFFICES);
                break;
            case 'station_staff':
                setWorkPlaces(STATIONS);
                break;
            case 'office_staff':
                setWorkPlaces(OFFICES);
                break;
            default:
                break;
        }
    }, [role_name]);

    const handleSelectItem = (id) => {
        setWorkPlace(workPlaces.find(item => item.id === id).name);
    }

    const handleSave = () => {
        if(employee === undefined) {
            //add station lead
            if(role === 'Trưởng điểm tập kết'){
                stationLeadService.addStationLead(email, password, name, role_name, workPlace, sex, mobile)
                    .then(data => {
                        console.log(data);
                        if (data.success === true) {
                            toast.showSuccessToast("Thêm trưởng điểm tập kết thành công");
                            window.location.reload();
                        }
                        else {
                            toast.showErrorToast(data.message);
                        }
                })
            }

            //add
        }else{
            //update
        }
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
                            
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            <div className={cx('label')}>
                                Giới tính:
                            </div>
                            {/* <div className={cx('label')}>
                                Ngày sinh:
                            </div> */}
                            {/* <div className={cx('label')}>
                                Ngày gia nhập:
                            </div> */}
                        </div>
                        <div className={cx('info-detail')}>
                            <div className={cx('radio-wrapper')}>
                                <input 
                                    className={cx('input-radio')}
                                    id='employee-form-gender-male'
                                    type='radio' 
                                    checked={gender.toLowerCase() === 'nam'}
                                    onChange={() => {
                                        setGender('nam')
                                        setSex('M')
                                    }}
                                />
                                <label className={cx('label')} htmlFor='employee-form-gender-male'>
                                    Nam
                                </label>
                                <input 
                                    className={cx('input-radio')}
                                    id='employee-form-gender-female'
                                    type='radio' 
                                    checked={gender.toLowerCase() === 'nữ'}
                                    onChange={() => {
                                        setGender('nữ')
                                        setSex('F')
                                    }}
                                />
                                <label className={cx('label')} htmlFor='employee-form-gender-female'>
                                    Nữ
                                </label>
                            </div>
                            {/* <Input 
                                className={cx('input-wrapper')}
                                type='date' 
                                value={birthday}
                                onChange={(e) => {setBirthday(e.target.value)}}
                            /> */}
                            {/* <Input 
                                className={cx('input-wrapper')}
                                type='date' 
                                value={joiningDate}
                                onChange={(e) => {setJoiningDate(e.target.value)}}
                            /> */}
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
                            {/* <div className={cx('label')}>
                                Email:
                            </div> */}
                        </div>
                        <div className={cx('info-detail')}>
                            <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={mobile}
                                placeholder='Số điện thoại' 
                                onChange={(e) => setMobile(e.target.value)}
                            />
                            {/* <Input 
                                className={cx('input-wrapper')}
                                type='email' 
                                value={email}
                                placeholder='Email' 
                                onChange={(e) => setEmail(e.target.value)}
                            /> */}
                        </div>
                    </div>
                    <div className={cx('grid-col-2-8')}>
                        <div className={cx('info-label')}>
                            {/* <div className={cx('label')}>
                                Địa chỉ:
                            </div> */}
                            <div className={cx('label')}>
                                Cơ quan:
                            </div>
                        </div>
                        <div className={cx('info-detail')}>
                            {/* <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={address}
                                placeholder='Địa chỉ' 
                                onChange={(e) => setAddress(e.target.value)}
                            /> */}
                            {/* <Input 
                                className={cx('input-wrapper')}
                                type='text' 
                                value={workPlace}
                                placeholder='Nơi làm việc' 
                                onChange={(e) => setWorkPlace(e.target.value)}
                            /> */}
                            <div 
                                className={cx('input-wrapper', 'select-wrapper')}
                                onClick={() => setIsActive(!isActive)}
                            >
                                <div className={cx('select-input')}>{workPlace}</div>
                                <FontAwesomeIcon 
                                    className={cx('select-icon')} 
                                    icon={isActive ? faChevronUp : faChevronDown} 
                                />
                                <Popper 
                                    className={cx('select-popper', 
                                        { active: isActive ? 'active' : '', })
                                    }
                                >
                                    <ul>
                                        {workPlaces.map((item, index) => (
                                            <li 
                                                className={cx('select-item')}
                                                key={index}
                                                onClick={() => handleSelectItem(item.id)} 
                                            >
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </Popper>
                            </div>
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