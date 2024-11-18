import { useEffect, useCallback } from '@wordpress/element';
import { getDeviceType, getRgbaValue } from 'gutenverse-core/editor-helper';
import { useState } from '@wordpress/element';
import isEmpty from 'lodash/isEmpty';

export const backgroundEffectHoc = (result, { BlockElement, props }) => {
    const { attributes, addStyle, removeStyle, elementRef} = props;
    const { backgroundEffect = {}, elementId } = attributes;
    const isBackgroundEffect = backgroundEffect?.type !== 'none' && !isEmpty(backgroundEffect);
    if (!backgroundEffect) return <BlockElement {...props} />;

    const [visibility, setVisibility] = useState({
        visibility: 'hidden',
        opacity: 0,
        scale: 0,
        playState: 'paused',
        transition: 'none',
    });

    const {
        type,
        backgroundEffectSize,
        backgroundEffectLoadOn,
        effectColor,
        effectSpeed,
        effectQuantity = 3,
        leftOrientation,
        topOrientation
    } = backgroundEffect;

    const editorContainer = document.querySelector('.interface-interface-skeleton__content');

    const handleViewPort = useCallback(() => {
        const elementRect = elementRef?.getBoundingClientRect();
        const distanceFromBottom = window.innerHeight - elementRect.top;

        if (distanceFromBottom >= window.innerHeight * 0.1) {
            setVisibility({
                visibility: 'visible',
                opacity: 1,
                scale: 1,
                playState: 'running',
                transition: 'transform 0.5s, opacity 0.5s, visibility 0.5s',
            });
        } else {
            setVisibility({ ...visibility, visibility: 'hidden', opacity: 0, scale: 0, playState: 'paused' });
        }
    }, [visibility]);

    const handleMouseOver = useCallback(() => {
        setVisibility({
            visibility: 'visible',
            opacity: 1,
            scale: 1,
            playState: 'running',
            transition: 'transform 0.5s, opacity 0.5s, visibility 0.5s',
        });
    }, []);

    const handleStyle = (delayAnimation, animationTiming) =>{
        const device = getDeviceType();
        const deviceSize = backgroundEffectSize ? backgroundEffectSize[device]?.point : '';
        const top = topOrientation ? Number(topOrientation[device]?.point) : 50;
        const left = leftOrientation ? Number(leftOrientation[device]?.point) : 50;

        let rgbaColor;
        if (effectColor?.type === 'variable') {
            rgbaColor = getRgbaValue(effectColor?.id);
            rgbaColor.a = 0.2;
        } else {
            rgbaColor = effectColor ? effectColor : {
                r:0,
                g:188,
                b:255,
                a:0.2
            };
        }

        const animationSpeed = (effectSpeed?.point === '' || !effectSpeed) ? 2 : effectSpeed?.point;
        const playAnimation = backgroundEffectLoadOn === 'hover' || backgroundEffectLoadOn === 'viewport' ? visibility.playState : 'running';
        const scaleAnimation = backgroundEffectLoadOn === 'hover' || backgroundEffectLoadOn === 'viewport' ? visibility.scale : 1;
        const opacityAnimation = backgroundEffectLoadOn === 'hover' || backgroundEffectLoadOn === 'viewport' ? visibility.opacity : 1;
        const visibilityAnimation = backgroundEffectLoadOn === 'hover' || backgroundEffectLoadOn === 'viewport' ? visibility.visibility : 'visible';
        const transitionAnimation = backgroundEffectLoadOn === 'hover' || backgroundEffectLoadOn === 'viewport' ? visibility.transition : 'none';

        addStyle(`${elementId}-background-effect-ripple`,
            `.${elementId} .guten-background-effect .inner-background-container {
                        top: ${top}%;
                        left: ${left}%;
                    }
                    .${elementId} .guten-background-effect .inner-background-container .${elementId}-effect {
                        animation: ripple-${elementId} ${animationSpeed}s ${animationTiming} infinite;
                        background-color: rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${rgbaColor.a});
                        animation-play-state: ${playAnimation};
                        transform: scale(${scaleAnimation}) translate(-50%, -50%);
                        opacity: ${opacityAnimation};
                        visibility: ${visibilityAnimation};
                        transition: ${transitionAnimation};
                    }
                    @keyframes ripple-${elementId} {
                        0% {
                            width: 0px;
                            height: 0px;
                            opacity: 1;
                        }
                        100% {
                            width: ${deviceSize === '' ? 600 : deviceSize}px;
                            height: ${deviceSize === '' ? 600 : deviceSize}px;
                            opacity: 0;
                        }
                    }
                    
                    @-webkit-keyframes ripple-${elementId} {
                        0% {
                            width: 10px;
                            height: 10px;
                            opacity: 1;
                        }
                        80% {
                            width: ${deviceSize === '' ? 600 : deviceSize}px;
                            height: ${deviceSize === '' ? 600 : deviceSize}px;
                            opacity: 0;
                        }
                        100% {
                            width: 0px;
                            height: 0px;
                            opacity: 0;
                        }
                    }
                    .${elementId} .guten-background-effect .${elementId}-effect:nth-child(1) {
                        animation-delay: 0s !important;
                    }
                     
                    .${elementId} .guten-background-effect .${elementId}-effect:nth-child(2) {
                        animation-delay: ${delayAnimation * 1 }s !important;
                    }
                     
                    .${elementId} .guten-background-effect .${elementId}-effect:nth-child(3) {
                        animation-delay: ${delayAnimation * 2 }s !important;
                    }
                     
                    .${elementId} .guten-background-effect .${elementId}-effect:nth-child(4) {
                        animation-delay: ${delayAnimation * 3 }s !important;
                    }
                     
                    .${elementId} .guten-background-effect .${elementId}-effect:nth-child(5) {
                        animation-delay: ${delayAnimation * 4 }s !important;
                    }`
        );
    };

    const handleMouseOut = useCallback(() => {
        setVisibility({ ...visibility, visibility: 'hidden', opacity: 0, scale: 0, playState: 'paused' });
    }, [visibility]);

    useEffect(() => {
        const initialVisibility = backgroundEffectLoadOn === 'hover' || backgroundEffectLoadOn === 'viewport' || isEmpty(backgroundEffectLoadOn) || backgroundEffectLoadOn === undefined
            ? { visibility: 'hidden', opacity: 0, scale: 0, playState: 'paused', transition: 'none' }
            : { visibility: 'visible', opacity: 1, scale: 1, playState: 'running', transition: 'transform 0.5s, opacity 0.5s, visibility 0.5s' };

        setVisibility(initialVisibility);
    }, [backgroundEffectLoadOn]);

    const showBackgroundEffect = () => {

        const animationSpeed = (effectSpeed?.point === '' || !effectSpeed) ? 2 : effectSpeed?.point;
        let delayAnimation;

        switch (type) {
            case 'ripple':
                delayAnimation = animationSpeed / effectQuantity;
                handleStyle(delayAnimation, 'linear');
                break;

            case 'blink':
                delayAnimation = (animationSpeed / 4) / effectQuantity;
                handleStyle(delayAnimation, 'cubic-bezier(0,-0.13,0,1.04)');
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        if ( isBackgroundEffect ) {
            const container = elementRef?.querySelector('.guten-background-effect');
            const removeDiv = container?.querySelectorAll('.child-effect');

            //remove div to reset effect quantity
            removeDiv?.forEach(function(child) {
                child.remove();
            });
            //add new child according to new quantity
            for(let i = 1; i <= effectQuantity; i++){
                const divElement = document.createElement('div');
                const innerElement = container?.querySelector('.inner-background-container');
                divElement?.classList.add(`${elementId}-effect`);
                divElement?.classList.add('child-effect');
                innerElement?.appendChild(divElement);
            }

            if (isBackgroundEffect) showBackgroundEffect();

            if (backgroundEffectLoadOn === 'hover') {
                elementRef?.addEventListener('mouseover', handleMouseOver);
                elementRef?.addEventListener('mouseout', handleMouseOut);

                return () => {
                    elementRef?.removeEventListener('mouseover', handleMouseOver);
                    elementRef?.removeEventListener('mouseout', handleMouseOut);
                };
            }

            if (backgroundEffectLoadOn === 'viewport') {
                editorContainer?.addEventListener('scroll', handleViewPort);

                return () => {
                    editorContainer?.removeEventListener('scroll', handleViewPort);
                };
            }

            return () => {
                elementRef?.removeEventListener('mouseover', handleMouseOver);
                elementRef?.removeEventListener('mouseout', handleMouseOut);
                editorContainer?.removeEventListener('scroll', handleViewPort);
                removeStyle(`${elementId}-background-effect-ripple`);
                removeStyle(`${elementId}-background-effect-blink`);
            };
        }
    }, [effectQuantity, topOrientation, leftOrientation, visibility, backgroundEffectLoadOn, backgroundEffectSize, type,  effectColor, effectSpeed, handleMouseOver, handleMouseOut, handleViewPort]);

    return <BlockElement {...props} />;
};

