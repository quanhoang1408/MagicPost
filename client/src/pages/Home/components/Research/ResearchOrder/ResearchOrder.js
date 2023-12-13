import classNames from "classnames/bind";
import styles from './ResearchOrder.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { SearchIcon } from '~/components/Icon';
import images from "~/assets/images";

const cx = classNames.bind(styles);

function ResearchOrder() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('content-section')}>
                    <h3 className={cx('content-header')}>Mã bưu gửi</h3>
                    <p>(Tra nhiều bill bằng cách thêm dấu phẩy giữa các bill <br /> VD: EB125966888VN, EI125556888VN)</p>
                    <Input className={cx('input')} placeholder='Nhập mã bưu gửi' />
                    <Button className={cx('search-button')} primary leftIcon={<SearchIcon />}>
                        Tra cứu
                    </Button>
    
                    <p className={cx('note')}>Ghi chú: Tra cứu tối đa 100 bưu gửi</p>
                </div>
                <div className={cx('content-section')}>
                    <img className={cx('image')} src={images.researchOrder} alt='research-order' />
                </div>
            </div>
        </div>
    );
}

export default ResearchOrder;