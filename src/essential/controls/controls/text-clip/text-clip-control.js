import { useInstanceId } from '@wordpress/compose';
import { Button } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { CheckboxControl, ImageControl, SelectControl, SizeControl, GradientControl, AngleControl, ControlHeadingSimple } from 'gutenverse-core/controls';

const TextClipControl = (props) => {
    const {
        value = {},
        onValueChange,
        onStyleChange,
        label,
        description,
        proLabel,
        allowDeviceControl
    } = props;
    const id = useInstanceId(TextClipControl, 'inspector-text-clip-control');
    const changeType = type => {
        if (value.type === type) {
            delete value.type;
            onValueChange({ ...value });
            onStyleChange({ ...value });
        } else {
            onValueChange({ ...value, type });
            onStyleChange({ ...value, type });
        }
    };

    return <div id={id}>
        <div id={`${id}-text-clip-buttons`} className="gutenverse-control-wrapper gutenverse-control-text-clip-buttons">
            <ControlHeadingSimple
                label={label}
                description={description}
                proLabel={proLabel}
                id={`${id}-range`}
                allowDeviceControl={allowDeviceControl}
            />
            <div className={'control-body'}>
                <Button
                    className={`button-page${value.type === 'image' ? ' checked' : ''}`}
                    onClick={() => changeType('image')}
                >
                    {__('Image', 'gutenverse-pro')}
                </Button>
                <Button
                    className={`button-scroll${value.type === 'gradient' ? ' checked' : ''}`}
                    onClick={() => changeType('gradient')}
                >
                    {__('Gradient', 'gutenverse-pro')}
                </Button>
            </div>
        </div>
        {value.type === 'image' && <>
            <ImageControl
                label={__('Image', 'gutenverse-pro')}
                value={value.image}
                onValueChange={image => onValueChange({ ...value, image })}
                onStyleChange={image => onStyleChange({ ...value, image })}
            />
            <SelectControl
                label={__('Background Position', 'gutenverse-pro')}
                value={value.position}
                onValueChange={position => onValueChange({ ...value, position })}
                onStyleChange={position => onStyleChange({ ...value, position })}
                options={[
                    {
                        label: __('Default', 'gutenverse-pro'),
                        value: 'default'
                    },
                    {
                        label: __('Center center', 'gutenverse-pro'),
                        value: 'center center'
                    },
                    {
                        label: __('Center Left', 'gutenverse-pro'),
                        value: 'center left'
                    },
                    {
                        label: __('Center Right', 'gutenverse-pro'),
                        value: 'center right'
                    },
                    {
                        label: __('Top Center', 'gutenverse-pro'),
                        value: 'top center'
                    },
                    {
                        label: __('Top Left', 'gutenverse-pro'),
                        value: 'top left'
                    },
                    {
                        label: __('Top Right', 'gutenverse-pro'),
                        value: 'top right'
                    },
                    {
                        label: __('Bottom Center', 'gutenverse-pro'),
                        value: 'bottom center'
                    },
                    {
                        label: __('Bottom Left', 'gutenverse-pro'),
                        value: 'bottom left'
                    },
                    {
                        label: __('Bottom Right', 'gutenverse-pro'),
                        value: 'bottom right'
                    },
                    {
                        label: __('Custom', 'gutenverse-pro'),
                        value: 'custom'
                    },
                ]}
            />
            {value.position === 'custom' &&
                <>
                    <SizeControl
                        label={__('X Position', 'gutenverse-pro')}
                        value={value.xposition}
                        onValueChange={xposition => onValueChange({ ...value, xposition })}
                        onStyleChange={xposition => onStyleChange({ ...value, xposition })}
                    />
                    <SizeControl
                        label={__('Y Position', 'gutenverse-pro')}
                        value={value.yposition}
                        onValueChange={yposition => onValueChange({ ...value, yposition })}
                        onStyleChange={yposition => onStyleChange({ ...value, yposition })}
                    />
                </>}
            <SelectControl
                label={__('Repeat', 'gutenverse-pro')}
                value={value.repeat}
                onValueChange={repeat => onValueChange({ ...value, repeat })}
                onStyleChange={repeat => onStyleChange({ ...value, repeat })}
                options={[
                    {
                        label: __('Default', 'gutenverse-pro'),
                        value: 'default'
                    },
                    {
                        label: __('No repeat', 'gutenverse-pro'),
                        value: 'no-repeat'
                    },
                    {
                        label: __('Repeat', 'gutenverse-pro'),
                        value: 'repeat'
                    },
                    {
                        label: __('Repeat-x', 'gutenverse-pro'),
                        value: 'repeat-x'
                    },
                    {
                        label: __('Repeat-y', 'gutenverse-pro'),
                        value: 'repeat-y'
                    },
                ]}
            />
            <SelectControl
                label={__('Size', 'gutenverse-pro')}
                value={value.size}
                onValueChange={size => onValueChange({ ...value, size })}
                onStyleChange={size => onStyleChange({ ...value, size })}
                options={[
                    {
                        label: __('Default', 'gutenverse-pro'),
                        value: 'default'
                    },
                    {
                        label: __('Auto', 'gutenverse-pro'),
                        value: 'auto'
                    },
                    {
                        label: __('Cover', 'gutenverse-pro'),
                        value: 'cover'
                    },
                    {
                        label: __('Contain', 'gutenverse-pro'),
                        value: 'contain'
                    },
                    {
                        label: __('Custom', 'gutenverse-pro'),
                        value: 'custom'
                    },
                ]}
            />
            {value.size === 'custom' &&
                <>
                    <SizeControl
                        label={__('Width', 'gutenverse-pro')}
                        value={value.width}
                        onValueChange={width => onValueChange({ ...value, width })}
                        onStyleChange={width => onStyleChange({ ...value, width })}
                        units={{
                            px: {
                                text: 'px',
                                min: 1,
                                max: 200,
                                step: 1,
                                unit: 'px',
                            },
                            em: {
                                text: 'em',
                                min: 0.1,
                                max: 10,
                                step: 0.1,
                                unit: 'em',
                            },
                            ['%']: {
                                text: '%',
                                min: 1,
                                max: 100,
                                step: 1,
                                unit: '%',
                            },
                            vh: {
                                text: 'vh',
                                min: 0.1,
                                max: 10,
                                step: 0.1,
                                unit: 'vh',
                            },
                        }}
                    />
                </>
            }
            <SelectControl
                label={__('Blend Mode', 'gutenverse-pro')}
                value={value.blendMode}
                onValueChange={blendMode => onValueChange({ ...value, blendMode })}
                onStyleChange={blendMode => onStyleChange({ ...value, blendMode })}
                allowDeviceControl={false}
                options={[
                    {
                        label: __('Normal', 'gutenverse-pro'),
                        value: 'normal'
                    },
                    {
                        label: __('Multiply', 'gutenverse-pro'),
                        value: 'multiply'
                    },
                    {
                        label: __('Screen', 'gutenverse-pro'),
                        value: 'screen'
                    },
                    {
                        label: __('Overlay', 'gutenverse-pro'),
                        value: 'overlay'
                    },
                    {
                        label: __('Darken', 'gutenverse-pro'),
                        value: 'darken'
                    },
                    {
                        label: __('Lighten', 'gutenverse-pro'),
                        value: 'lighten'
                    },
                    {
                        label: __('Color Dodge', 'gutenverse-pro'),
                        value: 'color-dodge'
                    },
                    {
                        label: __('Color Burn', 'gutenverse-pro'),
                        value: 'color-burn'
                    },
                    {
                        label: __('Hard Light', 'gutenverse-pro'),
                        value: 'hard-light'
                    },
                    {
                        label: __('Soft Light', 'gutenverse-pro'),
                        value: 'soft-light'
                    },
                    {
                        label: __('Difference', 'gutenverse-pro'),
                        value: 'difference'
                    },
                    {
                        label: __('Exclusion', 'gutenverse-pro'),
                        value: 'exclusion'
                    },
                    {
                        label: __('Hue', 'gutenverse-pro'),
                        value: 'hue'

                    },
                    {
                        label: __('Saturation', 'gutenverse-pro'),
                        value: 'saturation'
                    },
                    {
                        label: __('Color', 'gutenverse-pro'),
                        value: 'color'
                    },
                    {
                        label: __('Luminosity', 'gutenverse-pro'),
                        value: 'luminosity'
                    },
                ]}
            />
            <CheckboxControl
                label={__('Fixed Background', 'gutenverse-pro')}
                value={value.fixed}
                onValueChange={fixed => onValueChange({ ...value, fixed })}
                onStyleChange={fixed => onStyleChange({ ...value, fixed })}
            />
        </>}
        {value.type === 'gradient' && <>
            <GradientControl
                label={__('Gradient Color', 'gutenverse-pro')}
                description={__('Drag a circle outside the box to remove it. \nYou can\'t remove if there are only two left.', 'gutenverse-pro')}
                value={value.gradientColor}
                onValueChange={gradientColor => onValueChange({ ...value, gradientColor })}
                onStyleChange={gradientColor => onStyleChange({ ...value, gradientColor })}
            />
            <div className={'gradient-type'} style={{display: 'flex', justifyContent:'space-between'}}>
                <div>
                    <SelectControl
                        label={__('Gradient Type', 'gutenverse-pro')}
                        value={value.gradientType}
                        onValueChange={gradientType => onValueChange({ ...value, gradientType })}
                        onStyleChange={gradientType => onStyleChange({ ...value, gradientType })}
                        options={[
                            {
                                label: __('Linear', 'gutenverse-pro'),
                                value: 'linear'
                            },
                            {
                                label: __('Radial', 'gutenverse-pro'),
                                value: 'radial'
                            },
                        ]}
                    />
                </div>
                <div style={{width: '100px'}}>
                    {value.gradientType !== undefined && value.gradientType === 'linear' && <AngleControl
                        label={__('Angle', 'gutenverse-pro')}
                        value={value.gradientAngle}
                        onValueChange={gradientAngle => onValueChange({ ...value, gradientAngle })}
                        onStyleChange={gradientAngle => onStyleChange({ ...value, gradientAngle })}
                    />
                    }
                    {value.gradientType !== undefined && value.gradientType === 'radial' && <SelectControl
                        label={__('Radial Position', 'gutenverse-pro')}
                        value={value.gradientRadial}
                        onValueChange={gradientRadial => onValueChange({ ...value, gradientRadial })}
                        onStyleChange={gradientRadial => onStyleChange({ ...value, gradientRadial })}
                        options={[
                            {
                                label: __('Center Center', 'gutenverse-pro'),
                                value: 'center center'
                            },
                            {
                                label: __('Center Left', 'gutenverse-pro'),
                                value: 'center left'
                            },
                            {
                                label: __('Center Right', 'gutenverse-pro'),
                                value: 'center right'
                            },
                            {
                                label: __('Top Center', 'gutenverse-pro'),
                                value: 'top center'
                            },
                            {
                                label: __('Top Left', 'gutenverse-pro'),
                                value: 'top left'
                            },
                            {
                                label: __('Top Right', 'gutenverse-pro'),
                                value: 'top right'
                            },
                            {
                                label: __('Bottom Center', 'gutenverse-pro'),
                                value: 'bottom center'
                            },
                            {
                                label: __('Bottom Left', 'gutenverse-pro'),
                                value: 'bottom left'
                            },
                            {
                                label: __('Bottom Right', 'gutenverse-pro'),
                                value: 'bottom right'
                            },
                        ]}
                    />}
                </div>
            </div>
        </>}
    </div>;
};

export default TextClipControl;