
import { AlertControl, BoxShadowControl, CheckboxControl, ColorControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { allowRenderBoxShadow, handleBoxShadow, handleColor, handleUnitPoint, deviceStyleValue } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const stickySection = (results, props) => {
    const {
        elementId,
        sticky,
        stickyPosition,
        stickyShowOn,
        topSticky,
        bottomSticky,
        stickyIndex
    } = props;

    const device = getDeviceType();
    const _sticky = deviceStyleValue(device, sticky);

    const setPositioning = (
        enable,
        position,
        top,
        bottom,
        zIndex
    ) => {
        let style;

        if (enable) {
            style = `z-index: ${zIndex};`;

            if (position === 'top') {
                top = top || { point: '0', unit: 'px' };
                style += handleUnitPoint(top, 'top');
            } else if (position === 'bottom') {
                bottom = bottom || { point: '0', unit: 'px' };
                style += handleUnitPoint(bottom, 'bottom');
            }
        }

        return style;
    };

    return [
        {
            id: 'sticky-notice',
            component: AlertControl,
            children: <>
                <span>{__('Sticky may not work perfectly in the editor, but it should function well on the frontend.')}</span>
            </>
        },
        {
            id: 'sticky',
            label: __('Enable Sticky Section', 'gutenverse-pro'),
            component: CheckboxControl,
            allowDeviceControl: true,
            usePreviousDevice: true,
            deviceValues: sticky,
            style: [
                {
                    selector: `.guten-section-wrapper.pinned.section-${elementId}`,
                    allowRender: value => deviceStyleValue(device, value),
                    render: value => setPositioning(value, stickyPosition, topSticky[device], bottomSticky[device], stickyIndex),
                }
            ]
        },
        {
            id: 'stickyPosition',
            label: __('Sticky Position', 'gutenverse-pro'),
            show: _sticky,
            component: SelectControl,
            options: [
                {
                    label: 'Top',
                    value: 'top'
                },
                {
                    label: 'Bottom',
                    value: 'bottom'
                },
            ],
            style: [
                {
                    selector: `.guten-section-wrapper.pinned.section-${elementId}`,
                    updateID: 'sticky-style-0',
                    allowRender: () => _sticky,
                    render: value => setPositioning(_sticky, value, topSticky[device], bottomSticky[device], stickyIndex),
                }
            ]
        },
        {
            id: 'stickyShowOn',
            label: __('Sticky On Scroll', 'gutenverse-pro'),
            description: __('Stick the element on scroll direction', 'gutenverse-pro'),
            show: _sticky,
            component: SelectControl,
            options: [
                {
                    label: 'Both',
                    value: 'both'
                },
                {
                    label: 'Scroll Up',
                    value: 'up'
                },
                {
                    label: 'Scroll Down',
                    value: 'down'
                },
            ],
        },
        {
            id: 'stickyEase',
            label: __('Sticky Ease', 'gutenverse-pro'),
            description: __('Specifies the speed curve of sticky animation.', 'gutenverse-pro'),
            show: _sticky && stickyShowOn !== 'both',
            component: SelectControl,
            options: [
                { label: __('None', 'gutenverse-pro'), value: 'none' },
                { label: __('Power1 In', 'gutenverse-pro'), value: 'power1.in' },
                { label: __('Power1 In Out', 'gutenverse-pro'), value: 'power1.inOut' },
                { label: __('Power1 Out', 'gutenverse-pro'), value: 'power1.out' },
                { label: __('Power2 In', 'gutenverse-pro'), value: 'power2.in' },
                { label: __('Power2 In Out', 'gutenverse-pro'), value: 'power2.inOut' },
                { label: __('Power2 Out', 'gutenverse-pro'), value: 'power2.out' },
                { label: __('Power3 In', 'gutenverse-pro'), value: 'power3.in' },
                { label: __('Power3 In Out', 'gutenverse-pro'), value: 'power3.inOut' },
                { label: __('Power3 Out', 'gutenverse-pro'), value: 'power3.out' },
                { label: __('Power4 In', 'gutenverse-pro'), value: 'power4.in' },
                { label: __('Power4 In Out', 'gutenverse-pro'), value: 'power4.inOut' },
                { label: __('Power4 Out', 'gutenverse-pro'), value: 'power4.out' },
                { label: __('Back In', 'gutenverse-pro'), value: 'back.in(1.7)' },
                { label: __('Back In Out', 'gutenverse-pro'), value: 'back.inOut(1.7)' },
                { label: __('Back Out', 'gutenverse-pro'), value: 'back.out(1.7)' },
                { label: __('Elastic In', 'gutenverse-pro'), value: 'elastic.in(1, 0.3)' },
                { label: __('Elastic In Out', 'gutenverse-pro'), value: 'elastic.inOut(1, 0.3)' },
                { label: __('Elastic Out', 'gutenverse-pro'), value: 'elastic.out(1, 0.3)' },
                { label: __('Bounce In', 'gutenverse-pro'), value: 'bounce.in' },
                { label: __('Bounce In Out', 'gutenverse-pro'), value: 'bounce.inOut' },
                { label: __('Bounce Out', 'gutenverse-pro'), value: 'bounce.out' },
                { label: __('Rough', 'gutenverse-pro'), value: 'rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})' },
                { label: __('Slow', 'gutenverse-pro'), value: 'slow(0.7, 0.7, false)' },
                { label: __('Steps', 'gutenverse-pro'), value: 'steps(12)' },
                { label: __('Circ In', 'gutenverse-pro'), value: 'circ.in' },
                { label: __('Circ In Out', 'gutenverse-pro'), value: 'circ.inOut' },
                { label: __('Circ Out', 'gutenverse-pro'), value: 'circ.out' },
                { label: __('Expo In', 'gutenverse-pro'), value: 'expo.in' },
                { label: __('Expo In Out', 'gutenverse-pro'), value: 'expo.inOut' },
                { label: __('Expo Out', 'gutenverse-pro'), value: 'expo.out' },
                { label: __('Sine In', 'gutenverse-pro'), value: 'sine.in' },
                { label: __('Sine In Out', 'gutenverse-pro'), value: 'sine.inOut' },
                { label: __('Sine Out', 'gutenverse-pro'), value: 'sine.out' },
            ],
        },
        {
            id: 'stickyDuration',
            label: __('Sticky Show/Hide Duration', 'gutenverse-pro'),
            show: _sticky && stickyShowOn !== 'both',
            component: RangeControl,
            min: 0.1,
            max: 2,
            step: 0.05,
        },
        {
            id: 'topSticky',
            show: _sticky && undefined !== stickyPosition && 'top' === stickyPosition,
            label: __('Sticky Top Position', 'gutenverse-pro'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 200,
                    step: 1
                },
                vh: {
                    text: 'vh',
                    min: 0,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 20,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.guten-section-wrapper.pinned.section-${elementId}`,
                    updateID: 'sticky-style-0',
                    allowRender: () => _sticky,
                    render: value => setPositioning(_sticky, stickyPosition, value, bottomSticky[device], stickyIndex),
                }
            ]
        },
        {
            id: 'bottomSticky',
            show: _sticky && undefined !== stickyPosition && 'bottom' === stickyPosition,
            label: __('Sticky Bottom Position', 'gutenverse-pro'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 200,
                    step: 1
                },
                vh: {
                    text: 'vh',
                    min: 0,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 20,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.guten-section-wrapper.pinned.section-${elementId}`,
                    updateID: 'sticky-style-0',
                    allowRender: () => _sticky,
                    render: value => setPositioning(_sticky, stickyPosition, topSticky[device], value, stickyIndex),
                }
            ]
        },
        {
            id: 'stickyIndex',
            label: __('Z Index', 'gutenverse-pro'),
            description: __('An element with greater z-index is always in front of an element with a lower z-index.'),
            show: _sticky,
            component: RangeControl,
            min: 1,
            max: 999,
            step: 1,
            isParseFloat: true,
            style: [
                {
                    selector: `.guten-section-wrapper.pinned.section-${elementId}`,
                    allowRender: () => _sticky,
                    updateID: 'sticky-style-0',
                    render: value => setPositioning(_sticky, stickyPosition, topSticky[device], bottomSticky[device], value),
                }
            ]
        },
        {
            id: 'stickyBackground',
            show: _sticky,
            label: __('Pinned background color', 'gutenverse-pro'),
            component: ColorControl,
            style: [
                {
                    selector: `.section-wrapper.pinned > section.guten-section.${elementId}`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'stickyBoxShadow',
            show: _sticky,
            label: __('Box Shadow', 'gutenverse-pro'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.section-wrapper.pinned > section.guten-section.${elementId}`,
                    allowRender: value => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};