import React, {useState} from 'react';
import styles from './styles.module.css';
import {RangeInput} from "./components";

// stolen from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

export class Slider extends React.PureComponent {
    constructor(props) {
        super(props);

        const {r, g, b} = hexToRgb(props.color);

        this.state = {
            red: 255 - r,
            green: 255 - g,
            blue: 255 - b,
            currentValue: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.color !== this.props.color) {
            this.setState(() => ({
                currentValue: nextProps.color
            }));
        }
    }

    handleSliderChange = (event, channel) => {
        this.setState(() => ({
            [channel]: event.target.value,
        }), () => {
            const {red, green, blue} = this.state;
            this.setState(() => ({
                currentValue: rgbToHex(255 - red, 255 - green, 255 - blue)
            }));
        });
    };

    handleCancel = () => {
        this.setState(() => ({
            currentValue: this.props.color
        }));
        this.props.toggle();
    };

    handleApply = () => {
        this.props.setColor(this.state.currentValue);
        this.props.toggle();
    };

    render() {
        return (
            <div className={styles.container}>
                <button
                    className={styles.button}
                    style={{backgroundColor: this.state.currentValue}}
                    onClick={this.props.toggle}
                />

                {this.props.isOpen && (
                    <div className={styles.sliderHolder}>
                        <div className={styles.slider}>
                            R
                            <RangeInput
                                colorFrom='#ff0000'
                                colorTo='#000000'
                                value={this.state.red}
                                onChange={(e) => this.handleSliderChange(e, 'red')}
                            />
                        </div>
                        <div className={styles.slider}>
                            G
                            <RangeInput
                                colorFrom='#00ff00'
                                colorTo='#000000'
                                value={this.state.green}
                                onChange={(e) => this.handleSliderChange(e, 'green')}
                            />
                        </div>
                        <div className={styles.slider}>
                            B
                            <RangeInput
                                colorFrom='#0000ff'
                                colorTo='#000000'
                                value={this.state.blue}
                                onChange={(e) => this.handleSliderChange(e, 'blue')}
                            />
                        </div>

                        <div className={styles.controls}>
                            <button className={styles.control} onClick={this.handleCancel}>Cancel</button>
                            <button className={styles.control} onClick={this.handleApply}>OK</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

// export const Slider = (props) => {
//     const {r, g, b} = hexToRgb(props.color);
//     const [currentValue, setValue] = useState(null);
//     const [red, setRed] = useState(255 - r);
//     const [green, setGreen] = useState(255 - g);
//     const [blue, setBlue] = useState(255 - b);
//
//     const handleSliderChange = (event, channel) => {
//         switch (channel) {
//             case 'red': setRed(event.target.value);
//                 break;
//             case 'green': setGreen(event.target.value);
//                 break;
//             case 'blue': setBlue(event.target.value);
//                 break;
//         }
//
//         const hex = rgbToHex(255 - red, 255 - green, 255 - blue);
//         setValue(hex);
//     };
//
//     return (
//         <div className={styles.container}>
//             <button
//                 className={styles.button}
//                 style={{backgroundColor: currentValue || props.color}}
//                 onClick={props.toggle}
//             />
//
//             {props.isOpen && (
//                 <div className={styles.sliderHolder}>
//                     <div className={styles.slider}>
//                         R
//                         <RangeInput
//                             colorFrom='#ff0000'
//                             colorTo='#000000'
//                             value={red}
//                             onChange={(e) => handleSliderChange(e, 'red')}
//                         />
//                     </div>
//                     <div className={styles.slider}>
//                         G
//                         <RangeInput
//                             colorFrom='#00ff00'
//                             colorTo='#000000'
//                             value={green}
//                             onChange={(e) => handleSliderChange(e, 'green')}
//                         />
//                     </div>
//                     <div className={styles.slider}>
//                         B
//                         <RangeInput
//                             colorFrom='#0000ff'
//                             colorTo='#000000'
//                             value={blue}
//                             onChange={(e) => handleSliderChange(e, 'blue')}
//                         />
//                     </div>
//
//                     <div className={styles.controls}>
//                         <button className={styles.control} onClick={() => {
//                             setValue(props.color);
//                             props.toggle();
//                         }}>Cancel</button>
//                         <button className={styles.control} onClick={() => {
//                             props.setColor(currentValue);
//                             props.toggle();
//                         }}>OK</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// };