import classNames from "classnames/bind";
import { useContext, useEffect, useRef } from "react";
import styles from './Home.module.scss';

import { HeaderContext } from "~/layouts/HeaderOnly/HeaderOnly";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPaperPlane, faPhone } from "@fortawesome/free-solid-svg-icons";
import Slider from "./components/Slider";
import Research from "./components/Research";
import Introduction from "./components/Introduction";
import Contact from "./components/Contact";

const cx = classNames.bind(styles);

function Home() {
    const contentRef = useRef();
    const context = useContext(HeaderContext);

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const contentList = contentRef.current.childNodes;
        contentList.forEach(content => {
            const contentTop = content.offsetTop;
            const contentHeight = content.offsetHeight;

            if (contentTop + contentHeight * 0.25 <= window.scrollY + windowHeight * 0.5 &&
                window.scrollY + windowHeight * 0.5 <= contentTop + contentHeight * 0.75) {
                switch(content.id) {
                    case 'home':
                        context.handleNavItemValue('nav_home');
                        break;
                    case 'introduction':
                        context.handleNavItemValue('nav_introduction');
                        break;
                    case 'research':
                        context.handleNavItemValue('nav_research');
                        break;
                    case 'contact':
                        context.handleNavItemValue('nav_contact');
                        break;
                    default:
                        context.handleNavItemValue('nav_home');
                        break;
                }
            }
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div ref={contentRef} className={cx('content')}>
                    <div id='home' className={cx('content-section', 'content-1')}>
                        <Slider />
                    </div>
                    <div id='introduction' className={cx('content-section', 'content-3')}>
                        <Introduction />
                    </div>
                    <div id='research' className={cx('content-section', 'content-2')}>
                        <Research />
                    </div>
                    <div id='contact' className={cx('content-section', 'content-4')}>
                        <Contact />
                    </div>
                </div>
            </div>
            <footer className={cx('footer')}>
                <div className={cx('footer-section')}>
                    <h3 className={cx('footer-header')}>Tổng công ty cổ phần bưu chính Magic Post</h3>
                    <p className={cx('footer-content')}>
                        Magic Post là doanh nghiệp hàng đầu cung cấp dịch vụ chuyển phát nhanh hàng hoá, bưu kiện trong nước, quốc tế tại Việt Nam.
                    </p>
                    <p className={cx('footer-content')}>
                        <FontAwesomeIcon className={cx('footer-icon')} icon={faPaperPlane} />
                        Giấy chứng nhận Đăng ký Kinh doanh số: 0104093672 do Phòng ĐKKD Thành phố Hà Nội Cấp lần đầu ngày 03/07/2009
                    </p>
                    <p className={cx('footer-content')}>
                        <FontAwesomeIcon className={cx('footer-icon')} icon={faPaperPlane} />
                        <a href='/' className={cx('footer-link')}>Giấy phép bưu chính</a>
                    </p>
                    <p className={cx('footer-content')}>
                        <FontAwesomeIcon className={cx('footer-icon')} icon={faPaperPlane} />
                        <a href='/' className={cx('footer-link')}>Văn bản xác nhận thông báo hoạt động Bưu chính</a>
                    </p>
                </div>
                <div className={cx('footer-section')}>
                    <h3 className={cx('footer-header')}>Thông tin liên hệ</h3>
                    <p className={cx('footer-content')}>
                        <FontAwesomeIcon className={cx('footer-icon')} icon={faLocationDot} />
                        VP giao dịch: Toà nhà Magic Post, 144 Xuân Thủy, Cầu Giấy, Hà Nội
                    </p>
                    <p className={cx('footer-content')}>
                        <FontAwesomeIcon className={cx('footer-icon')} icon={faEnvelope} />
                        <a href='/' className={cx('footer-link')}>cskh@magicpost.com.vn</a>
                    </p>
                    <p className={cx('footer-content')}>
                        <FontAwesomeIcon className={cx('footer-icon')} icon={faPhone} />
                        <a href='/' className={cx('footer-link', 'hotline')}>19008095</a>
                    </p>
                </div>
                <div className={cx('footer-copyright')}>
                    <p className={cx('copyright-content')}>©MagicPost 2023. All rights reserved</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;