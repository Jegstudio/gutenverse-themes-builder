import { u } from 'gutenverse-core-frontend';
import { getRgbaValue } from 'gutenverse-pro-frontend';
import { getDevice } from 'gutenverse-pro-frontend';

class GutenverseBackgroundEffect{
    init(element){
        let dataId;
        let wrapper;
        if (element.parentNode.classList.contains('section-wrapper')){
            dataId = u(element).closest('.section-wrapper').data('id');
            wrapper = 'section';
        } else if (element.classList.contains('guten-column')) {
            dataId = u(element).find('.guten-column-wrapper').data('id');
            wrapper = 'column';
        } else {
            dataId = u(element).find('.guten-inner-wrap').data('id');
            wrapper = 'flexible'
        }
        const attr = dataId && u(document.body).find(`div[data-var="backgroundEffectAttr${dataId}"]`).data('value');
        const attrParsed = attr && JSON.parse(attr);

        if(attrParsed){
            const {type} = attrParsed.backgroundEffect;
            const isBackgroundEffect = (type !== 'none');
            if(isBackgroundEffect){
                this.__showBackgroundEffect(attrParsed, element, dataId, wrapper);
            }
        }
    }

    __showBackgroundEffect = (attrParsed, element, dataId, wrapper) => {
        const { backgroundEffect } = attrParsed;
        let visibility = {
            visibility: 'hidden',
            opacity: 0,
            scale: 0,
            playState: 'paused',
            transition: 'none',
        };
        const {
            type,
            backgroundEffectSize,
            effectColor,
            effectSpeed,
            backgroundEffectLoadOn,
            effectQuantity = 3,
            leftOrientation,
            topOrientation
        } = backgroundEffect;

        const device = getDevice();
        const deviceSize = backgroundEffectSize ? backgroundEffectSize[device]?.point : '';
        const top = topOrientation ? Number(topOrientation[device]?.point) : 50;
        const left = leftOrientation ? Number(leftOrientation[device]?.point) : 50;

        let container;
        switch (wrapper) {
            case 'section':
                container = document.querySelector(`.guten-${dataId}> .guten-background-effect`)
                break;
            case 'column':
                container = document.querySelector(`.guten-${dataId}> .guten-column-wrapper> .guten-background-effect`)
                break;
            case 'flexible':
                container = document.querySelector(`.guten-${dataId}> .guten-inner-wrap> .guten-background-effect`)
                break;
        }
        const removeDiv = container?.querySelectorAll(`.child-effect`);
        //remove div to reset effect quantity
        removeDiv?.forEach(function(child) {
            child.remove();
        });
        //add new child according to new quantity
        for(let i = 1; i <= effectQuantity; i++){
            const divElement = document.createElement('div');
            const innerElement = container?.querySelector('.inner-background-container');
            divElement?.classList.add(`guten-${dataId}-effect`);
            divElement?.classList.add('child-effect');
            innerElement?.appendChild(divElement);
        }

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

        const handleMouseOver = () => {
            visibility = {
                visibility: 'visible',
                opacity: 1,
                scale: 1,
                playState: 'running',
                transition: 'transform 0.5s, opacity 0.5s, visibility 0.5s',
            };
            this.__handleStyle(visibility, dataId, effectSpeed, rgbaColor, type, effectQuantity, deviceSize, top, left);
        };
        const handleMouseOut = () => {
            visibility = { ...visibility, visibility: 'hidden', opacity: 0, scale: 0, playState: 'paused' };
            this.__handleStyle(visibility, dataId, effectSpeed, rgbaColor, type, effectQuantity, deviceSize, top, left);
        };

        const handleViewPort = () => {
            const elementRect = element?.getBoundingClientRect();
            const distanceFromBottom = window.innerHeight - elementRect.top;

            if (distanceFromBottom >= window.innerHeight * 0.1) {
                visibility = {
                    visibility: 'visible',
                    opacity: 1,
                    scale: 1,
                    playState: 'running',
                    transition: 'transform 0.5s, opacity 0.5s, visibility 0.5s',
                };
            } else {
                visibility = { ...visibility, visibility: 'hidden', opacity: 0, scale: 0, playState: 'paused' };
            }
            this.__handleStyle(visibility, dataId, effectSpeed, rgbaColor, type, effectQuantity, deviceSize, top, left);
        };

        if (backgroundEffectLoadOn === 'hover') {
            element?.addEventListener('mouseover', handleMouseOver);
            element?.addEventListener('mouseout', handleMouseOut);
        }else if (backgroundEffectLoadOn === 'viewport'){
            window?.addEventListener('scroll', handleViewPort);
        }else {
            element?.removeEventListener('mouseover', handleMouseOver);
            element?.removeEventListener('mouseout', handleMouseOut);
            window?.removeEventListener('scroll', handleViewPort);

            visibility = {
                visibility: 'visible',
                opacity: 1,
                scale: 1,
                playState: 'running',
                transition: 'transform 0.5s, opacity 0.5s, visibility 0.5s',
            };
            this.__handleStyle(visibility, dataId, effectSpeed, rgbaColor, type, effectQuantity, deviceSize, top, left);
        }

        visibility = backgroundEffectLoadOn === 'hover' || backgroundEffectLoadOn === 'viewport' ?
            { visibility: 'hidden', opacity: 0, scale: 0, playState: 'paused', transition: 'none' } : 
            { visibility: 'visible', opacity: 1, scale: 1, playState: 'running', transition: 'transform 0.5s, opacity 0.5s, visibility 0.5s' };
        this.__handleStyle(visibility, dataId, effectSpeed, rgbaColor, type, effectQuantity, deviceSize, top, left);

    };

    __addAnimation(rule){
        let styleElement = document.createElement('style');
        // Modern browsers
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = rule;
        } else {
            // Other browsers
            styleElement.appendChild(document.createTextNode(rule));
        }
        // Append the style element to the head
        document.head.appendChild(styleElement);
    }

    __handleStyle(visibility, dataId, effectSpeed, rgbaColor, type, effectQuantity, deviceSize, top, left){
        const blink = type==='blink';
        const animationSpeed = effectSpeed?.point === '' || !effectSpeed? 1.5 : effectSpeed?.point;
        const animationTiming = blink ? 'cubic-bezier(0,-0.13,0,1.04)' : 'linear';
        const delayAnimation = blink ? (animationSpeed / 4) / effectQuantity : animationSpeed / effectQuantity;

        const psuedoStyle = `
            .guten-${dataId} .guten-background-effect .inner-background-container {
                top: ${top}%;
                left: ${left}%;
            }
            .guten-${dataId} .guten-background-effect .inner-background-container .guten-${dataId}-effect {
                animation: ripple-${dataId} ${animationSpeed}s ${animationTiming} infinite;
                background-color: rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${rgbaColor.a});
                animation-play-state: ${visibility?.playState};
                transform: scale(${visibility?.scale}) translate(-50%, -50%);
                opacity: ${visibility?.opacity};
                visibility: ${visibility?.visibility};
                transition: ${visibility?.transition};
            }
            @keyframes ripple-${dataId} {
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

            .guten-${dataId}-effect:nth-child(1) {
                animation-delay: 0s !important;
            }
            
            .guten-${dataId}-effect:nth-child(2) {
                animation-delay: ${delayAnimation * 1 }s !important;
            }
            
            .guten-${dataId}-effect:nth-child(3) {
                animation-delay: ${delayAnimation * 2 }s !important;
            }
            
            .guten-${dataId}-effect:nth-child(4) {
                animation-delay: ${delayAnimation * 3 }s !important;
            }
            
            .guten-${dataId}-effect:nth-child(5) {
                animation-delay: ${delayAnimation * 4 }s !important;
            }
        `;
        
        this.__addAnimation(psuedoStyle);
    }
}
export default GutenverseBackgroundEffect;