import { __ } from '@wordpress/i18n';
import { BoxShadowControl, CheckboxControl, ColorControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';

const backgroundEffectControl = (props) => {
    const {
        value= {type: 'none'} ,
        onValueChange,
        onStyleChange,
    } = props;

    return <>
        <SelectControl
            label={__('Load On', 'gutenverse-pro')}
            value={value.backgroundEffectLoadOn}
            options={[
                {label: __('Page Load', 'gutenverse'), value: 'pageLoad'},
                {label: __('Viewport', 'gutenverse'), value: 'viewport', pro: true},
                {label: __('Hover', 'gutenverse'), value: 'hover', pro: true}
            ]}
            onValueChange={backgroundEffectLoadOn => onValueChange({ ...value, backgroundEffectLoadOn })}
            onStyleChange={backgroundEffectLoadOn => onStyleChange({ ...value, backgroundEffectLoadOn })}
        />
        <SelectControl
            label={__('Effect Type', 'gutenverse-pro')}
            value={value.type}
            options={[
                {label: __('None', 'gutenverse'), value: 'none'},
                {label: __('Ripple', 'gutenverse'), value: 'ripple'},
                {label: __('Blink', 'gutenverse'), value: 'blink'},
                // {label: __('Rain', 'gutenverse'), value: 'rain'}
            ]}
            onValueChange={type => onValueChange({ ...value, type })}
            onStyleChange={type => onStyleChange({ ...value, type })}
        />
        <SizeControl
            label={__('Effect Size', 'gutenverse-pro')}
            value={value.backgroundEffectSize}
            onValueChange={backgroundEffectSize => onValueChange({ ...value, backgroundEffectSize })}
            onStyleChange={backgroundEffectSize => onStyleChange({ ...value, backgroundEffectSize })}
            units={{
                ['px']: {
                    text: 'px',
                    min: 100,
                    max: 1500,
                    step: 10,
                    unit: 'px',
                },
            }}
            allowDeviceControl={true}
        />
        <SizeControl
            label={__('Effect Speed', 'gutenverse-pro')}
            value={value.effectSpeed}
            onValueChange={effectSpeed => onValueChange({ ...value, effectSpeed })}
            onStyleChange={effectSpeed => onStyleChange({ ...value, effectSpeed })}
            units={{
                ['s']: {
                    text: 's',
                    min: 0,
                    max: 5,
                    step: 0.5,
                    unit: 's',
                },
            }}
        />
        <ColorControl
            label={__('Effect Color', 'gutenverse-pro')}
            value={value.effectColor}
            onValueChange={effectColor => onValueChange({ ...value, effectColor })}
            onStyleChange={effectColor => onStyleChange({ ...value, effectColor })}
        />
        <RangeControl
            label={__('Numbers of Effect', 'gutenverse-pro')}
            value={value.effectQuantity}
            onValueChange={effectQuantity => onValueChange({ ...value, effectQuantity })}
            onStyleChange={effectQuantity => onStyleChange({ ...value, effectQuantity })}
            min={1}
            max={5}
            step={1}
        />
        <SizeControl
            label={__('Top Orientation', 'gutenverse-pro')}
            value={value.topOrientation}
            onValueChange={topOrientation => onValueChange({ ...value, topOrientation })}
            onStyleChange={topOrientation => onStyleChange({ ...value, topOrientation })}
            units={{
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            }}
            allowDeviceControl={true}
        />
        <SizeControl
            label={__('Left Orientation', 'gutenverse-pro')}
            value={value.leftOrientation}
            onValueChange={leftOrientation => onValueChange({ ...value, leftOrientation })}
            onStyleChange={leftOrientation => onStyleChange({ ...value, leftOrientation })}
            units={{
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            }}
            allowDeviceControl={true}
        />
        <BoxShadowControl
            label={__('Box Shadow', '--gctd--')}
            value={value.boxShadow}
            onValueChange={boxShadow => onValueChange({ ...value, boxShadow })}
            onStyleChange={boxShadow => onStyleChange({ ...value, boxShadow })}
        />
        <CheckboxControl
            label={__('Overflow Hidden', '--gctd--')}
            value={value.hiddenOverflow}
            onValueChange={hiddenOverflow => onValueChange({ ...value, hiddenOverflow })}
            onStyleChange={hiddenOverflow => onStyleChange({ ...value, hiddenOverflow })}
        />
    </>;
};

export default backgroundEffectControl;