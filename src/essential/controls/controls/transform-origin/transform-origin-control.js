import { useInstanceId } from '@wordpress/compose';
import { ControlHeadingSimple } from 'gutenverse-core/controls';
import isEmpty from 'lodash/isEmpty';
import { compose } from '@wordpress/compose';
import { withParentControl, withDeviceControl } from 'gutenverse-core/hoc';

const TransformOriginControl = ({
    label,
    allowDeviceControl,
    value = allowDeviceControl ? {} : '',
    onValueChange,
    onStyleChange,
    description = '',
}) => {
    const id = useInstanceId(TransformOriginControl, 'inspector-transform-origin-control');

    const onChange = newValue => {
        if (newValue === value && !isEmpty(value)) {
            onValueChange('');
            onStyleChange('');
        } else {
            onValueChange(newValue);
            onStyleChange(newValue);
        }
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-transform-origin'}>
        <ControlHeadingSimple
            id={`${id}-transform-origin`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
        />
        <div className={'control-body'}>
            <div className={'control-transform-origin'}>
                <div className="transform-box">
                    <div className="transform-dot top left" onClick={() => onChange('top left')}>
                        {value === 'top left' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="4" fill="#D9D9D9"/>
                            <path d="M12 24L7 18.7368L7.7 18L12 22.5263L16.3 18L17 18.7368L12 24Z" fill="#3B57F7"/>
                            <path d="M24 12L18.7368 17L18 16.3L22.5263 12L18 7.7L18.7368 7L24 12Z" fill="#3B57F7"/>
                        </svg> : <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#D9D9D9"/>
                        </svg>}
                    </div>
                    <div className="transform-dot top center" onClick={() => onChange('top center')}>
                        {value === 'top center' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="4" fill="#D9D9D9"/>
                            <path d="M12 24L7 18.7368L7.7 18L12 22.5263L16.3 18L17 18.7368L12 24Z" fill="#3B57F7"/>
                            <path d="M0 12L5.26316 7L6 7.7L1.47368 12L6 16.3L5.26316 17L0 12Z" fill="#3B57F7"/>
                            <path d="M24 12L18.7368 17L18 16.3L22.5263 12L18 7.7L18.7368 7L24 12Z" fill="#3B57F7"/>
                        </svg> : <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#D9D9D9"/>
                        </svg>}
                    </div>
                    <div className="transform-dot top right" onClick={() => onChange('top right')}>
                        {value === 'top right' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="4" fill="#D9D9D9"/>
                            <path d="M12 24L7 18.7368L7.7 18L12 22.5263L16.3 18L17 18.7368L12 24Z" fill="#3B57F7"/>
                            <path d="M0 12L5.26316 7L6 7.7L1.47368 12L6 16.3L5.26316 17L0 12Z" fill="#3B57F7"/>
                        </svg> : <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#D9D9D9"/>
                        </svg>}
                    </div>
                    <div className="transform-dot middle left" onClick={() => onChange('center left')}>
                        {value === 'center left' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="4" fill="#D9D9D9"/>
                            <path d="M12 0L17 5.26316L16.3 6L12 1.47368L7.7 6L7 5.26316L12 0Z" fill="#3B57F7"/>
                            <path d="M12 24L7 18.7368L7.7 18L12 22.5263L16.3 18L17 18.7368L12 24Z" fill="#3B57F7"/>
                            <path d="M24 12L18.7368 17L18 16.3L22.5263 12L18 7.7L18.7368 7L24 12Z" fill="#3B57F7"/>
                        </svg> : <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#D9D9D9"/>
                        </svg>}
                    </div>
                    <div className="transform-dot middle center" onClick={() => onChange('center center')}>
                        {value === 'center center' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="4" fill="#D9D9D9"/>
                            <g clipPath="url(#clip0_14637_4345)">
                                <path d="M12 0L17 5.26316L16.3 6L12 1.47368L7.7 6L7 5.26316L12 0Z" fill="#3B57F7"/>
                                <path d="M12 24L7 18.7368L7.7 18L12 22.5263L16.3 18L17 18.7368L12 24Z" fill="#3B57F7"/>
                                <path d="M0 12L5.26316 7L6 7.7L1.47368 12L6 16.3L5.26316 17L0 12Z" fill="#3B57F7"/>
                                <path d="M24 12L18.7368 17L18 16.3L22.5263 12L18 7.7L18.7368 7L24 12Z" fill="#3B57F7"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_14637_4345">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg> : <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#D9D9D9"/>
                        </svg>}
                    </div>
                    <div className="transform-dot middle right" onClick={() => onChange('center right')}>
                        {value === 'center right' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="4" fill="#D9D9D9"/>
                            <path d="M12 0L17 5.26316L16.3 6L12 1.47368L7.7 6L7 5.26316L12 0Z" fill="#3B57F7"/>
                            <path d="M12 24L7 18.7368L7.7 18L12 22.5263L16.3 18L17 18.7368L12 24Z" fill="#3B57F7"/>
                            <path d="M0 12L5.26316 7L6 7.7L1.47368 12L6 16.3L5.26316 17L0 12Z" fill="#3B57F7"/>
                        </svg> : <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#D9D9D9"/>
                        </svg>}
                    </div>
                    <div className="transform-dot bottom left" onClick={() => onChange('bottom left')}>
                        {value === 'bottom left' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="4" fill="#D9D9D9"/>
                            <path d="M12 0L17 5.26316L16.3 6L12 1.47368L7.7 6L7 5.26316L12 0Z" fill="#3B57F7"/>
                            <path d="M24 12L18.7368 17L18 16.3L22.5263 12L18 7.7L18.7368 7L24 12Z" fill="#3B57F7"/>
                        </svg> : <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#D9D9D9"/>
                        </svg>}
                    </div>
                    <div className="transform-dot bottom center" onClick={() => onChange('bottom center')}>
                        {value === 'bottom center' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="13" r="4" fill="#D9D9D9"/>
                            <path d="M12 0L17 5.26316L16.3 6L12 1.47368L7.7 6L7 5.26316L12 0Z" fill="#3B57F7"/>
                            <path d="M0 12L5.26316 7L6 7.7L1.47368 12L6 16.3L5.26316 17L0 12Z" fill="#3B57F7"/>
                            <path d="M24 12L18.7368 17L18 16.3L22.5263 12L18 7.7L18.7368 7L24 12Z" fill="#3B57F7"/>
                        </svg> : <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#D9D9D9"/>
                        </svg>}
                    </div>
                    <div className="transform-dot bottom right" onClick={() => onChange('bottom right')}>
                        {value === 'bottom right' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="4" fill="#D9D9D9"/>
                            <path d="M12 0L17 5.26316L16.3 6L12 1.47368L7.7 6L7 5.26316L12 0Z" fill="#3B57F7"/>
                            <path d="M0 12L5.26316 7L6 7.7L1.47368 12L6 16.3L5.26316 17L0 12Z" fill="#3B57F7"/>
                        </svg> : <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#D9D9D9"/>
                        </svg>}
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(TransformOriginControl);