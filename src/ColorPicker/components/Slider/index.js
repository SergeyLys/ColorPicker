import React, {useState, useEffect, createRef} from 'react';
import {Dialog} from '..'
import './Slider.css';

export const Slider = (props) => {
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
        <div className='container' ref={container}>
            <button
                className='button'
                style={{backgroundColor: props.color}}
                onClick={() => toggle(!isOpen)}
            />

            {isOpen && (
                <div className='sliderHolder'>
                    slider
                </div>
            )}
        </div>
    )
};