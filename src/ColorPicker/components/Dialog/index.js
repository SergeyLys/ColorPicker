import React, {useState, useEffect, createRef, cloneElement} from 'react';
import PropTypes from 'prop-types';

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
            {cloneElement(props.children, {
                isOpen,
                toggle: () => toggle(!isOpen),
            })}
        </div>
    )
};

Dialog.propTypes = {
    children:  PropTypes.element.isRequired
};