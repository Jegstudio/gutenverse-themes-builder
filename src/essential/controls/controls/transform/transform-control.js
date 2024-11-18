import { useInstanceId } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SwitchControl, NumberControl, SelectControl, SizeControl, RangeControl, ControlHeadingSimple, ProLock } from 'gutenverse-core/controls';
import { IconChevronDownSVG, IconDimensionXSVG, IconDimensionYSVG, IconDimensionZSVG } from 'gutenverse-core/icons';
import { TransformOriginControl } from '../../../controls/index';
import { classnames } from 'gutenverse-core/components';
import isEmpty from 'lodash/isEmpty';
import { RotateCcw } from 'gutenverse-core/components';

const AccordionItem = ({ title, children, data, clearData, pro }) => {
    const [opened, setOpened] = useState(false);

    const {
        upgradeProUrl,
    } = window['GutenverseConfig'];
    
    const handleOpened = () => {
        if(pro){
            window.open(upgradeProUrl);
        }else{
            setOpened(!opened)
        }
    }
    return <div className={classnames('accordion-item', {
        opened: opened
    })}>
        <div className="accordion-header">
            <div className="chevron" onClick={() => handleOpened()}><IconChevronDownSVG /></div>
            <h2 onClick={() => handleOpened()}>{title}</h2>
            {pro && <ProLock
                title={title}
            />}
            {data && <div className="clear" onClick={clearData}><RotateCcw size={12} /></div>}
        </div>
        {(opened && !pro) && <div className="accordion-body">
            {children}
        </div>}
    </div>;
};

const transformOption = (props) => {
    const { value, onValueChange, onStyleChange, customOptions, proOptions, label, description, proLabel, idBlock, allowDeviceControl = false  } = props;
    const [switcher, setSwitcher] = useState('normal');
    return <>
        <ControlHeadingSimple
            label={label}
            description={description}
            proLabel={proLabel}
            id={`${idBlock}-range`}
            allowDeviceControl={allowDeviceControl}
        />
        <NumberControl
            label={__('Duration in Seconds', 'gutenverse-pro')}
            description={__('This will set how long the animation will run.', 'gutenverse-pro')}
            value={value.duration}
            min={0}
            max={60}
            step={0.1}
            onValueChange={duration => onValueChange({ ...value, duration })}
            onStyleChange={duration => onStyleChange({ ...value, duration })}
            allowDeviceControl={true}
        />
        <NumberControl
            label={__('Delay in Seconds', 'gutenverse-pro')}
            description={__('This will set how long the animation will wait before running.', 'gutenverse-pro')}
            value={value.delay}
            min={0}
            max={60}
            step={0.1}
            onValueChange={delay => onValueChange({ ...value, delay })}
            onStyleChange={delay => onStyleChange({ ...value, delay })}
            allowDeviceControl={true}
        />
        <SelectControl
            label={__('Easing', 'gutenverse-pro')}
            description={__('Specifies the speed curve of an animation.', 'gutenverse-pro')}
            value={value.ease}
            onValueChange={ease => onValueChange({ ...value, ease })}
            onStyleChange={ease => onStyleChange({ ...value, ease })}
            options={[
                { label: __('None', 'gutenverse-pro'), value: '' },
                { label: __('Ease', 'gutenverse-pro'), value: 'ease' },
                { label: __('Linear', 'gutenverse-pro'), value: 'linear' },
                { label: __('Ease In', 'gutenverse-pro'), value: 'ease-in' },
                { label: __('Ease Out', 'gutenverse-pro'), value: 'ease-out' },
                { label: __('Ease In Out', 'gutenverse-pro'), value: 'ease-in-out' },
            ]}
        />
        <TransformOriginControl
            label={__('Transform Origin', 'gutenverse-pro')}
            description={__('This is the point around which a transformation is applied.', 'gutenverse-pro')}
            value={value.transformOrigin}
            onValueChange={transformOrigin => onValueChange({ ...value, transformOrigin })}
            onStyleChange={transformOrigin => onStyleChange({ ...value, transformOrigin })}
            allowDeviceControl={true}
        />
        {
            customOptions.filter( el => el === 'transformState').length !== 0 && <>
                <div>
                    <h2 style={{
                        marginTop: '20px',
                        marginBottom: '10px',
                        fontWeight: 'normal'
                    }}>{__('Transform State', 'gutenverse-pro')}</h2>
                </div>
                <SwitchControl
                    value={switcher}
                    onValueChange={value => setSwitcher(value)}
                    onStyleChange={value => setSwitcher(value)}
                    options={[
                        {
                            value: 'normal',
                            label: __('Normal', 'gutenverse-pro'),
                        },
                        {
                            value: 'hover',
                            label: __('Hover', 'gutenverse-pro'),
                        },
                    ]}
                />
            </>
        }
        <div>
            <h2 style={{
                marginTop: '10px',
                marginBottom: '10px',
                fontWeight: 'normal'
            }}>{__('Transform Option', 'gutenverse-pro')}</h2>
        </div>
        {switcher === 'normal' && <div className="gutenverse-control-wrapper gutenverse-control-transform">
            <div className="control-body">
                <div className="accordion-wrapper">
                    {
                        customOptions.filter( el => el === 'rotate' ).length !== 0  && <AccordionItem
                            title={__('Rotate', 'gutenverse-pro')}
                            data={!isEmpty(value.rotateZ) || !isEmpty(value.rotateX) || !isEmpty(value.rotateY)}
                            clearData={() => {
                                const { rotateZ, rotateX, rotateY, ...rest } = value;
                                onValueChange({...rest});
                                onStyleChange({...rest});
                            }}
                        >
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionZSVG />
                                            {__('Rotate', 'gutenverse')}
                                        </>
                                    }
                                    value={value.rotateZ}
                                    onValueChange={rotateZ => onValueChange({ ...value, rotateZ })}
                                    onStyleChange={rotateZ => onStyleChange({ ...value, rotateZ })}
                                    allowDeviceControl={true}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Rotate X', 'gutenverse')}
                                        </>
                                    }
                                    value={value.rotateX}
                                    onValueChange={rotateX => onValueChange({ ...value, rotateX })}
                                    onStyleChange={rotateX => onStyleChange({ ...value, rotateX })}
                                    allowDeviceControl={true}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Rotate Y', 'gutenverse')}
                                        </>
                                    }
                                    value={value.rotateY}
                                    onValueChange={rotateY => onValueChange({ ...value, rotateY })}
                                    onStyleChange={rotateY => onStyleChange({ ...value, rotateY })}
                                    allowDeviceControl={true}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                            </>
                        </AccordionItem>
                    }
                    {
                        customOptions.filter(el => el === 'scale').length !== 0 && <AccordionItem
                            title={__('Scale', 'gutenverse-pro')}
                            data={!isEmpty(value.scaleX) || !isEmpty(value.scaleY)}
                            clearData={() => {
                                const { scaleX, scaleY, ...rest } = value;
                                onValueChange({...rest});
                                onStyleChange({...rest});
                            }}
                        >
                            <>
                                <RangeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Scale X', 'gutenverse')}
                                        </>
                                    }
                                    min={-1}
                                    max={2}
                                    step={0.1}
                                    value={value.scaleX}
                                    onValueChange={scaleX => onValueChange({ ...value, scaleX })}
                                    onStyleChange={scaleX => onStyleChange({ ...value, scaleX })}
                                    allowDeviceControl={true}
                                />
                                <RangeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Scale Y', 'gutenverse')}
                                        </>
                                    }
                                    min={-1}
                                    max={2}
                                    step={0.1}
                                    value={value.scaleY}
                                    onValueChange={scaleY => onValueChange({ ...value, scaleY })}
                                    onStyleChange={scaleY => onStyleChange({ ...value, scaleY })}
                                    allowDeviceControl={true}
                                />
                            </>
                        </AccordionItem>
                    }
                    {
                        customOptions.filter(el => el === 'move').length !== 0 && <AccordionItem
                            title={__('Move', 'gutenverse-pro')}
                            data={!isEmpty(value.moveZ) || !isEmpty(value.moveX) || !isEmpty(value.moveY)}
                            clearData={() => {
                                const { moveZ, moveX, moveY, ...rest } = value;
                                onValueChange({...rest});
                                onStyleChange({...rest});
                            }}
                        >
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Move X', 'gutenverse')}
                                        </>
                                    }
                                    value={value.moveX}
                                    allowDeviceControl={true}
                                    onValueChange={moveX => onValueChange({ ...value, moveX })}
                                    onStyleChange={moveX => onStyleChange({ ...value, moveX })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Move Y', 'gutenverse')}
                                        </>
                                    }
                                    value={value.moveY}
                                    allowDeviceControl={true}
                                    onValueChange={moveY => onValueChange({ ...value, moveY })}
                                    onStyleChange={moveY => onStyleChange({ ...value, moveY })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionZSVG />
                                            {__('Move Z', 'gutenverse')}
                                        </>
                                    }
                                    value={value.moveZ}
                                    allowDeviceControl={true}
                                    onValueChange={moveZ => onValueChange({ ...value, moveZ })}
                                    onStyleChange={moveZ => onStyleChange({ ...value, moveZ })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                            </>
                        </AccordionItem>
                    }
                    {
                        customOptions.filter(el => el === 'skew').length !== 0 && <AccordionItem
                            title={__('Skew', 'gutenverse-pro')}
                            data={!isEmpty(value.skewX) || !isEmpty(value.skewY)}
                            clearData={() => {
                                const { skewX, skewY, ...rest } = value;
                                onValueChange({...rest});
                                onStyleChange({...rest});
                            }}
                            pro = {proOptions.includes('skew')}
                        >
                            <>
                                {
                                    proOptions.includes('skew') && <>
                                        <SizeControl
                                            label={
                                                <>
                                                    <IconDimensionXSVG />
                                                    {__('Skew X', 'gutenverse')}
                                                </>
                                            }
                                            value={value.skewX}
                                            onValueChange={skewX => onValueChange({ ...value, skewX })}
                                            onStyleChange={skewX => onStyleChange({ ...value, skewX })}
                                            allowDeviceControl={true}
                                            units={{
                                                deg: {
                                                    text: 'deg',
                                                    min: -180,
                                                    max: 180,
                                                    step: 1,
                                                    unit: 'deg',
                                                },
                                            }}
                                        />
                                        <SizeControl
                                            label={
                                                <>
                                                    <IconDimensionYSVG />
                                                    {__('Skew Y', 'gutenverse')}
                                                </>
                                            }
                                            value={value.skewY}
                                            onValueChange={skewY => onValueChange({ ...value, skewY })}
                                            onStyleChange={skewY => onStyleChange({ ...value, skewY })}
                                            allowDeviceControl={true}
                                            units={{
                                                deg: {
                                                    text: 'deg',
                                                    min: -180,
                                                    max: 180,
                                                    step: 1,
                                                    unit: 'deg',
                                                },
                                            }}
                                        />
                                    </>
                                }
                            </>
                        </AccordionItem>
                    }
                    {
                        customOptions.filter(el => el === 'opacity').length !== 0 && <AccordionItem
                            title={__('Opacity', 'gutenverse-pro')}
                            data={!isEmpty(value.opacity)}
                            clearData={() => {
                                const { opacity, ...rest } = value;
                                onValueChange({...rest});
                                onStyleChange({...rest});
                            }}
                            pro = {proOptions.includes('opacity')}
                        >
                            <>
                                {
                                    proOptions.includes('opacity') && <RangeControl
                                        label={
                                            <>
                                                {__('Opacity', 'gutenverse')}
                                            </>
                                        }
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        value={value.opacity}
                                        onValueChange={opacity => onValueChange({ ...value, opacity })}
                                        onStyleChange={opacity => onStyleChange({ ...value, opacity })}
                                    />
                                }
                            </>
                        </AccordionItem>
                    }
                    {
                        customOptions.filter( el => el === 'perspective').length !== 0 && 
                        <AccordionItem
                            title={__('Perspective', 'gutenverse-pro')}
                            data={!isEmpty(value.perspective)}
                            clearData={() => {
                                const { perspective, ...rest } = value;
                                onValueChange({ ...rest });
                                onStyleChange({ ...rest });
                            }}
                            pro = {proOptions.includes('perspective')}
                        >
                            <>
                                {
                                    proOptions.includes('perspective') && <SizeControl
                                        label={
                                            <>
                                                {__('Perspective', 'gutenverse-pro')}
                                            </>
                                        }
                                        description={__('Transformation that sets the distance between the user and the z plane', 'gutenverse-pro')}
                                        value={value.perspective}
                                        onValueChange={perspective => onValueChange({ ...value, perspective })}
                                        onStyleChange={perspective => onStyleChange({ ...value, perspective })}
                                        allowDeviceControl={true}
                                        units={{
                                            px: {
                                                text: 'px',
                                                min: 1,
                                                max: 2000,
                                                step: 1,
                                                unit: 'px',
                                            },
                                        }}
                                    />
                                }
                            </>
                        </AccordionItem>
                    }
                </div>
            </div>
        </div>
        }
        {switcher === 'hover' && <>
            <div className="gutenverse-control-wrapper gutenverse-control-transform">
                <div className="control-body">
                    <div className="accordion-wrapper">
                        { customOptions.filter( el => el === 'rotate').length !== 0 && <AccordionItem
                            title={__('Rotate', 'gutenverse-pro')}
                            data={!isEmpty(value.rotateZHover) || !isEmpty(value.rotateXHover) || !isEmpty(value.rotateYHover)}
                            clearData={() => {
                                const { rotateZHover, rotateXHover, rotateYHover, ...rest } = value;
                                onValueChange({ ...rest });
                                onStyleChange({ ...rest });
                            }}
                        >
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionZSVG />
                                            {__('Rotate', 'gutenverse-pro')}
                                        </>
                                    }
                                    value={value.rotateZHover}
                                    onValueChange={rotateZHover => onValueChange({ ...value, rotateZHover })}
                                    onStyleChange={rotateZHover => onStyleChange({ ...value, rotateZHover })}
                                    allowDeviceControl={true}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Rotate X', 'gutenverse-pro')}
                                        </>
                                    }
                                    value={value.rotateXHover}
                                    onValueChange={rotateXHover => onValueChange({ ...value, rotateXHover })}
                                    onStyleChange={rotateXHover => onStyleChange({ ...value, rotateXHover })}
                                    allowDeviceControl={true}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Rotate Y', 'gutenverse-pro')}
                                        </>
                                    }
                                    value={value.rotateYHover}
                                    onValueChange={rotateYHover => onValueChange({ ...value, rotateYHover })}
                                    onStyleChange={rotateYHover => onStyleChange({ ...value, rotateYHover })}
                                    allowDeviceControl={true}
                                    units={{
                                        deg: {
                                            text: 'deg',
                                            min: -180,
                                            max: 180,
                                            step: 1,
                                            unit: 'deg',
                                        },
                                    }}
                                />
                            </>
                        </AccordionItem>
                        }
                        { customOptions.filter( el => el === 'scale').length !== 0 && <AccordionItem
                            title={__('Scale', 'gutenverse-pro')}
                            data={!isEmpty(value.scaleXHover) || !isEmpty(value.scaleYHover)}
                            clearData={() => {
                                const { scaleXHover, scaleYHover, ...rest } = value;
                                onValueChange({ ...rest });
                                onStyleChange({ ...rest });
                            }}
                        >
                            <>
                                <RangeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Scale X', 'gutenverse-pro')}
                                        </>
                                    }
                                    min={-1}
                                    max={2}
                                    step={0.1}
                                    value={value.scaleXHover}
                                    onValueChange={scaleXHover => onValueChange({ ...value, scaleXHover })}
                                    onStyleChange={scaleXHover => onStyleChange({ ...value, scaleXHover })}
                                    allowDeviceControl={true}
                                />
                                <RangeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Scale Y', 'gutenverse-pro')}
                                        </>
                                    }
                                    min={-1}
                                    max={2}
                                    step={0.1}
                                    value={value.scaleYHover}
                                    onValueChange={scaleYHover => onValueChange({ ...value, scaleYHover })}
                                    onStyleChange={scaleYHover => onStyleChange({ ...value, scaleYHover })}
                                    allowDeviceControl={true}
                                />
                            </>
                        </AccordionItem>
                        }
                        { customOptions.filter( el => el === 'move').length !== 0 && <AccordionItem
                            title={__('Move', 'gutenverse-pro')}
                            data={!isEmpty(value.moveZHover) || !isEmpty(value.moveXHover) || !isEmpty(value.moveYHover)}
                            clearData={() => {
                                const { moveZHover, moveXHover, moveYHover, ...rest } = value;
                                onValueChange({ ...rest });
                                onStyleChange({ ...rest });
                            }}
                        >
                            <>
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionXSVG />
                                            {__('Move X', 'gutenverse-pro')}
                                        </>
                                    }
                                    allowDeviceControl={true}
                                    value={value.moveXHover}
                                    onValueChange={moveXHover => onValueChange({ ...value, moveXHover })}
                                    onStyleChange={moveXHover => onStyleChange({ ...value, moveXHover })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionYSVG />
                                            {__('Move Y', 'gutenverse-pro')}
                                        </>
                                    }
                                    allowDeviceControl={true}
                                    value={value.moveYHover}
                                    onValueChange={moveYHover => onValueChange({ ...value, moveYHover })}
                                    onStyleChange={moveYHover => onStyleChange({ ...value, moveYHover })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                                <SizeControl
                                    label={
                                        <>
                                            <IconDimensionZSVG />
                                            {__('Move Z', 'gutenverse-pro')}
                                        </>
                                    }
                                    allowDeviceControl={true}
                                    value={value.moveZHover}
                                    onValueChange={moveZHover => onValueChange({ ...value, moveZHover })}
                                    onStyleChange={moveZHover => onStyleChange({ ...value, moveZHover })}
                                    units={{
                                        px: {
                                            text: 'px',
                                            min: -500,
                                            max: 500,
                                            step: 1,
                                            unit: 'px',
                                        },
                                        ['%']: {
                                            text: '%',
                                            min: -200,
                                            max: 200,
                                            step: 1,
                                            unit: '%',
                                        },
                                    }}
                                />
                            </>
                        </AccordionItem>
                        }
                        { customOptions.filter( el => el === 'skew').length !== 0 && <AccordionItem
                            title={__('Skew', 'gutenverse-pro')}
                            data={!isEmpty(value.skewXHover) || !isEmpty(value.skewYHover)}
                            clearData={() => {
                                const { skewXHover, skewYHover, ...rest } = value;
                                onValueChange({ ...rest });
                                onStyleChange({ ...rest });
                            }}
                            pro = {proOptions.includes('skew')}
                        >
                            <>
                                {
                                    proOptions.includes('skew') && <>
                                        <SizeControl
                                            label={
                                                <>
                                                    <IconDimensionXSVG />
                                                    {__('Skew X', 'gutenverse-pro')}
                                                </>
                                            }
                                            value={value.skewXHover}
                                            onValueChange={skewXHover => onValueChange({ ...value, skewXHover })}
                                            onStyleChange={skewXHover => onStyleChange({ ...value, skewXHover })}
                                            allowDeviceControl={true}
                                            units={{
                                                deg: {
                                                    text: 'deg',
                                                    min: -180,
                                                    max: 180,
                                                    step: 1,
                                                    unit: 'deg',
                                                },
                                            }}
                                        />
                                        <SizeControl
                                            label={
                                                <>
                                                    <IconDimensionYSVG />
                                                    {__('Skew Y', 'gutenverse-pro')}
                                                </>
                                            }
                                            value={value.skewYHover}
                                            onValueChange={skewYHover => onValueChange({ ...value, skewYHover })}
                                            onStyleChange={skewYHover => onStyleChange({ ...value, skewYHover })}
                                            allowDeviceControl={true}
                                            units={{
                                                deg: {
                                                    text: 'deg',
                                                    min: -180,
                                                    max: 180,
                                                    step: 1,
                                                    unit: 'deg',
                                                },
                                            }}
                                        />
                                    </>
                                }
                            </>
                        </AccordionItem>
                        }
                        { customOptions.filter( el => el === 'opacity').length !== 0 && <AccordionItem
                            title={__('Opacity', 'gutenverse-pro')}
                            data={!isEmpty(value.opacityHover)}
                            clearData={() => {
                                const { opacityHover, ...rest } = value;
                                onValueChange({ ...rest });
                                onStyleChange({ ...rest });
                            }}
                            pro = {proOptions.includes('opacity')}
                        >
                            <>
                                {
                                    proOptions.includes('opacity') && <RangeControl
                                        label={
                                            <>
                                                {__('Opacity', 'gutenverse-pro')}
                                            </>
                                        }
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        value={value.opacityHover}
                                        onValueChange={opacityHover => onValueChange({ ...value, opacityHover })}
                                        onStyleChange={opacityHover => onStyleChange({ ...value, opacityHover })}
                                    />
                                }
                            </>
                        </AccordionItem>
                        }
                        {
                            customOptions.filter( el => el === 'perspective').length !== 0 && 
                        <AccordionItem
                            title={__('Perspective', 'gutenverse-pro')}
                            data={!isEmpty(value.perspectiveHover)}
                            clearData={() => {
                                const { perspectiveHover, ...rest } = value;
                                onValueChange({ ...rest });
                                onStyleChange({ ...rest });
                            }}
                            pro = {proOptions.includes('perspective')}
                        >
                            <>
                                {
                                    !proOptions.includes('perspective') && <SizeControl
                                        label={
                                            <>
                                                {__('Perspective', 'gutenverse-pro')}
                                            </>
                                        }
                                        description={__('Transformation that sets the distance between the user and the z plane', 'gutenverse-pro')}
                                        value={value.perspectiveHover}
                                        onValueChange={perspectiveHover => onValueChange({ ...value, perspectiveHover })}
                                        onStyleChange={perspectiveHover => onStyleChange({ ...value, perspectiveHover })}
                                        allowDeviceControl={true}
                                        units={{
                                            px: {
                                                text: 'px',
                                                min: 1,
                                                max: 2000,
                                                step: 1,
                                                unit: 'px',
                                            },
                                        }}
                                    />
                                }
                            </>
                        </AccordionItem>
                        }
                    </div>
                </div>
            </div>
        </>}
    </>;
};

const TransformControl = (props) => {
    const {
        value = {},
        onValueChange,
        onStyleChange,
        elementRef,
        customOptions = ['rotate','scale','move','skew','opacity','perspective','transformState'],
        proOptions = [],
        label,
        allowDeviceControl,
        description,
        proLabel,
        id : idBlock
    } = props;
    const id = useInstanceId(TransformControl, 'inspector-transform-control');
    const parameter = {
        id,
        value,
        onValueChange,
        onStyleChange,
        elementRef,
        customOptions,
        proOptions,
        label,
        allowDeviceControl,
        description,
        proLabel,
        idBlock
    };

    return applyFilters(
        'gutenverse.transform.options',
        transformOption(parameter),
        parameter
    );
};

export default TransformControl;