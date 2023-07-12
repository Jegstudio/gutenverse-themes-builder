
import { useEffect, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';

const ColorControl = (props) => {
    const [toggleView, setToggleView] = useState(false);
    const wrapperRef = useRef();
    const colorRef = useRef();

    const onToggleView = () => {
        setToggleView(!toggleView);
    };

    const {
        id,
        title = 'Text Title',
        description,
        value = '',
        placeholder,
        onChange,
    } = props;

    useEffect(() => {
        function handleClickOutside(event) {
            if ((wrapperRef.current && !wrapperRef.current.contains(event.target)) &&
                (colorRef.current && !colorRef.current.contains(event.target))) {
                setToggleView(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <>
            <div className="input-wrapper" ref={wrapperRef}>
                <label name={id}>{title}</label>
                <div className="input-inner">
                    <div className="input-container color">
                        <div className="color-background" ref={colorRef} style={{
                            backgroundColor: value
                        }} onClick={() => onToggleView()} />
                        <input
                            id={id}
                            type="text"
                            className="control-input-text"
                            placeholder={placeholder}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                        />
                        {toggleView && <ChromePicker
                            disableAlpha={true}
                            color={value}
                            onChange={color => {
                                onChange(color.hex);
                            }}
                            onChangeComplete={(color) => {
                                onChange(color.hex);
                            }}
                        />}
                    </div>
                    {description && <span>{description}</span>}
                </div>
            </div>

        </>
    );
};

export default ColorControl;