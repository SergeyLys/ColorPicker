import React from 'react';
import './Menu.css';

export const Menu = ({toggle, isOpen, color, colors, setColor}) => {
    const handleSelectColor = (color) => {
        toggle();
        setColor(color);
    };

    return (
        <div className='container'>
            <button
                className='button'
                onClick={toggle}
            >
                >
            </button>

            {colors && colors.length && isOpen && (
                <div className='menuHolder'>
                    {colors.map((color) => {
                        return (
                            <p
                                key={color.value}
                                className='colorRow'
                                onClick={() => handleSelectColor(color.value)}
                            >
                                {color.name} <span className='color' style={{backgroundColor: color.value}} />
                            </p>
                        )
                    })}
                </div>
            )}
        </div>
    )
};