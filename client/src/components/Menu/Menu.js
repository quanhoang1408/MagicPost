import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './Menu.module.scss';
import Tippy from "@tippyjs/react/headless";

import Popper from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

function Menu({ 
    className,
    children, 
    items = [],
    placement,
    offset,
    hideOnClick = false,
    onChange = () => {},
    ...otherProps
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <div key={index}>
                    {!!item.to ? (
                        <Link to={item.to}>
                            <MenuItem 
                                data={item}
                                onClick={() => {
                                    if (isParent) 
                                        setHistory(prev => [...prev, item.children]);
                                    else
                                        onChange(item);
                                }}
                            />
                        </Link>
                    ) : (
                        <MenuItem 
                            data={item}
                            onClick={() => {
                                if (isParent) 
                                    setHistory(prev => [...prev, item.children]);
                                else
                                    onChange(item);
                            }}
                        />
                    )}
                </div>
            );
        });
    }
    
    const renderResult = (attrs) => (
        <div
            className={cx('menu-list', className)}
            tabIndex='-1'
            {...attrs}
        >
            <Popper className={cx('menu-popper', { [otherProps.menuPopper]: otherProps.menuPopper })}>
                {history.length > 1 && !!current.title &&
                    <Header 
                        title={current.title} 
                        onBack={handleBack}
                    />
                }
                <div className={cx('menu-body')}>{renderItems()}</div>
            </Popper>
        </div>
    );

    // Back to previous
    const handleBack = () => {
        setHistory(prev => prev.slice(0, prev.length - 1))
    }

    // Reset to first page
    const handleReset = () => {
        setHistory(prev => prev.slice(0, 1));
    }

    return (
        <div>
            <Tippy
                interactive
                zIndex={2}
                placement={placement}
                offset={offset}
                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }], strategy: 'fixed' }}
                hideOnClick={hideOnClick}
                render={renderResult}
                onHide={handleReset}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;