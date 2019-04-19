import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const Menu = ({toggle, isOpen, colors, setColor}) => {
    const handleSelectColor = (color) => {
        toggle();
        setColor(color);
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                onClick={toggle}
            >
                >
            </button>

            {colors && colors.length && isOpen && (
                <div className={styles.menuHolder}>
                    {colors.map((color) => {
                        return (
                            <p
                                key={color.value}
                                className={styles.colorRow}
                                onClick={() => handleSelectColor(color.value)}
                            >
                                {color.name} <span className={styles.color} style={{backgroundColor: color.value}} />
                            </p>
                        )
                    })}
                </div>
            )}
        </div>
    )
};

Menu.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.object),
    setColor: PropTypes.func.isRequired
};