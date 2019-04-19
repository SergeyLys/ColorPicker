import React from 'react';
import styles from './styles.module.css';

export const RangeInput = ({onChange, colorFrom, colorTo, value}) => {
    return (
        <input
            style={{
                backgroundImage: `linear-gradient(to right, ${colorFrom}, ${colorTo})`
            }}
            className={styles.input}
            type="range"
            min={0}
            max={255}
            value={value}
            onChange={onChange}
        />
    )
};