import { useEffect, useState } from '@wordpress/element';
import { isAlignStickyColumn } from 'gutenverse-core/helper';
import { Helmet } from 'gutenverse-core/components';
import { deviceStyleValue } from 'gutenverse-core/styling';
import { select, dispatch } from '@wordpress/data';

export const withAnimationSticky = (result, properties) => {
    const { BlockElement, props } = properties;
    const [ headElement, setHeadElement ] = useState(null);
    const [ windowElement, setWindowElement ] = useState(null);
    const {
        attributes,
        setAttributes,
        context,
        deviceType,
        elementRef
    } = props;

    const {
        elementId,
        sticky = {},
        stickyShowOn,
        stickyPosition,
        stickyEase = 'none',
        stickyDuration = 0.25,
        topSticky,
        bottomSticky,
        sectionVerticalAlign
    } = attributes;

    const globalData = select('gutenverse/data');
    const elementVar = elementId?.replaceAll('-', '');
    const stVar = `stSticky${elementVar}`;
    const animationVar = `gsapStickyAnimation${elementVar}`;
    const loadVar = `loadSticky${elementVar}`;
    const loadTimeoutVar = `loadStickyTimeout${elementVar}`;

    const stickyAttributes = {
        elementId,
        stVar,
        animationVar,
        sticky,
        stickyShowOn,
        stickyPosition,
        stickyEase,
        stickyDuration,
        topSticky,
        bottomSticky,
        sectionVerticalAlign,
        elementType: props.name,
    };

    const enable = deviceType && deviceStyleValue(deviceType, sticky) && (props.name !== 'gutenverse/column' || isAlignStickyColumn(sectionVerticalAlign));

    const windowRef = windowElement;

    const killAnimation = () => {
        if (windowRef) {
            const wrapper = props.name === 'gutenverse/section' ? windowRef.document.querySelector(`.${elementId}`)?.parentElement : windowRef.document.querySelector(`.${elementId}`);
            const dummy = wrapper && wrapper.parentElement.querySelector(`.sticky-dummy-${elementId}`);

            if (windowRef[stVar]) {
                windowRef[stVar].kill(true);
            }

            if (windowRef[animationVar]) {
                windowRef[animationVar].kill(true);
            }

            if (dummy) {
                dummy.remove();
            }

            if (wrapper) {
                wrapper.classList.remove('pinned');

                if (windowRef.gsap) {
                    windowRef.gsap.set(wrapper, { clearProps: true });
                }
            }
        }
    };

    useEffect(() => {
        if (elementRef && elementRef.ownerDocument) {
            setTimeout(() => {
                const windowEl = elementRef.ownerDocument.defaultView || elementRef.ownerDocument.parentWindow;
                const headEl = windowEl.document.getElementsByTagName('head')[0];

                setHeadElement(headEl);
                setWindowElement(windowEl);
            }, 100);
        }
    }, [elementRef]);

    useEffect(() => {
        if (!enable) {
            killAnimation();
            dispatch('gutenverse/data').updateData({
                frontendScriptAdded: true
            });
        }

        if (windowElement && window.GutenverseProJSURL) {
            windowElement.GutenverseFrontendConfig = window.GutenverseProJSURL.wpJsonConfig;
        }

        return () => killAnimation();
    }, [enable, windowElement]);

    useEffect(() => {
        if (props.name === 'gutenverse/column') {
            setAttributes({
                sectionVerticalAlign: context['gutenverse/sectionVerticalAlign'],
            });
        }
    }, [props]);

    return <>
        {enable && window.GutenverseProJSURL && <>
            <Helmet device={deviceType} head={headElement}><script async src={window.GutenverseProJSURL.coreFrontend}></script></Helmet>
            <Helmet device={deviceType} head={headElement}><script async src={window.GutenverseProJSURL.proFrontend}></script></Helmet>
            <Helmet device={deviceType} head={headElement}><script async src={window.GutenverseProJSURL.editorSticky}></script></Helmet>
            <Helmet device={deviceType} head={headElement}>
                <script>
                    {
                        `
                        var ${loadTimeoutVar} = null;
                        var ${loadVar} = function() {
                            ${loadTimeoutVar} = setTimeout(function() {
                                ${loadVar}();
                            }, 1500);

                            if (window.gsticky) {
                                clearTimeout(${loadTimeoutVar});
                                window.gsticky.loadSticky(${JSON.stringify(stickyAttributes)});
                            }
                        }

                        ${loadVar}();
                        `
                    }
                </script>
            </Helmet>
        </>}
        <BlockElement {...props} />
    </>;
};
