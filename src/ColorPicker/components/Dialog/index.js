import React, {useState, useEffect, createRef, Children, cloneElement} from 'react';

export const Dialog = (props) => {
    const container = createRef();
    const [isOpen, toggle] = useState(false);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    const handleClickOutside = (event) => {
        if (container.current && !container.current.contains(event.target)) {
            toggle(false);
        }
    };

    return (
        <div ref={container}>
            {Children.map(props.children, (child) => (
                cloneElement(child, {
                    isOpen,
                    toggle: toggle(!isOpen),
                })
            ))}
        </div>
    )
};