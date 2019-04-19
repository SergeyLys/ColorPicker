import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import styles from './styles.module.css';
import {RangeInput} from "./components";

// stolen from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

export const Slider = (props) => {
    const [currentValue, setValue] = useState(null);
    const [red, setRed] = useState(null);
    const [green, setGreen] = useState(null);
    const [blue, setBlue] = useState(null);

    const handleSliderChange = (event, channel) => {
        switch (channel) {
            case 'red': setRed(event.target.value);
                break;
            case 'green': setGreen(event.target.value);
                break;
            case 'blue': setBlue(event.target.value);
                break;
            default: return;
        }

        const hex = rgbToHex(
            255 - (channel === 'red' ? event.target.value : red),
            255 - (channel === 'green' ? event.target.value : green),
            255 - (channel === 'blue' ? event.target.value : blue)
        );
        setValue(hex);
    };

    const setColorFromHex = (color) => {
        const {r, g, b} = hexToRgb(color);
        setRed(255 - r);
        setGreen(255 - g);
        setBlue(255 - b);
        setValue(color);
    };

    const handleCancel = () => {
        setColorFromHex(props.color);
        props.toggle();
    };

    const handleApply = () => {
        props.setColor(currentValue);
        props.toggle();
    };

    useEffect(() => {
        setColorFromHex(props.color);
    }, [props.color]);

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                style={{backgroundColor: currentValue || props.color}}
                onClick={props.toggle}
            />

            {props.isOpen && (
                <div className={styles.sliderHolder}>
                    <div className={styles.slider}>
                        R
                        <RangeInput
                            colorFrom='#ff0000'
                            colorTo='#000000'
                            value={red}
                            onChange={(e) => handleSliderChange(e, 'red')}
                        />
                    </div>
                    <div className={styles.slider}>
                        G
                        <RangeInput
                            colorFrom='#00ff00'
                            colorTo='#000000'
                            value={green}
                            onChange={(e) => handleSliderChange(e, 'green')}
                        />
                    </div>
                    <div className={styles.slider}>
                        B
                        <RangeInput
                            colorFrom='#0000ff'
                            colorTo='#000000'
                            value={blue}
                            onChange={(e) => handleSliderChange(e, 'blue')}
                        />
                    </div>

                    <div className={styles.controls}>
                        <button className={styles.control} onClick={handleCancel}>Cancel</button>
                        <button className={styles.control} onClick={handleApply}>OK</button>
                    </div>
                </div>
            )}
        </div>
    )
};

Slider.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    color: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired
};