import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';
import styles from './Image.module.scss';

import images from '../../assets/images';

const cx = classNames.bind(styles);

function Image({ src, alt, className, fallBack: customFallback = images.noImage, ...otherProps }, ref) {
    const [fallBack, setFallBack] = useState();

    const handleError = () => {
        setFallBack(customFallback);
    }

    return (
        <img 
            className={cx('wrapper', className)}
            ref={ref}
            src={fallBack || src}
            alt={alt}
            {...otherProps}
            onError={handleError}
        />
    );
}

export default forwardRef(Image);