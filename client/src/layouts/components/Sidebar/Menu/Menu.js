import { forwardRef } from "react";

function Menu({ className, children }, ref) {
    return (
        <nav ref={ref} className={className}>
            {children}
        </nav>
    );
}

export default forwardRef(Menu)
