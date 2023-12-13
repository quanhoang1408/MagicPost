import classNames from "classnames/bind";
import styles from './Introduction.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Introduction() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('header')}>Giới thiệu</h3>

                <div className={cx('content')}>
                    <div className={cx('content-section')}>
                        <p className={cx('content-info')}>
                            Magic Post là doanh nghiệp hàng đầu cung cấp dịch vụ chuyển phát hàng hoá, bưu kiện trong nước và quốc tế tại Việt Nam. 
                            Với mạng lưới rộng khắp 63 tỉnh thành trong nước. 
                            Bưu chính Magic cam kết cung cấp mọi giải phảp vận chuyển tối ưu nhất cho khách hàng với phương châm “NHANH, AN TOÀN, HIỆU QUẢ”.
                        </p>
                        <p className={cx('content-info')}>
                            Dịch vụ của Magic Post không chỉ nổi bật với tốc độ nhanh chóng mà còn chú trọng đến chất lượng và sự chăm sóc khách hàng. 
                            Khách hàng sẽ được hỗ trợ từ đội ngũ nhân viên chuyên nghiệp, giúp họ dễ dàng theo dõi quá trình vận chuyển và có thể tin tưởng vào việc hàng hóa của mình sẽ được chuyển giao một cách an toàn và đúng thời hạn.
                        </p>
                    </div>
                    <div className={cx('content-section')}>
                        <img className={cx('image')} src={images.introduction} alt='introduction' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction;