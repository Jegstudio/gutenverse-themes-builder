import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getDevice } from 'gutenverse-core/helper';
import { u } from 'gutenverse-core-frontend'

class GutenEditorSticky {
    constructor() {
        this.timeScale = 1;
        gsap.registerPlugin(ScrollTrigger);
    }

    loadSticky({
        elementId,
        stVar,
        animationVar,
        stickyShowOn,
        stickyPosition,
        stickyEase = 'none',
        stickyDuration = 0.25,
        topSticky,
        bottomSticky,
        elementType
    }) {
        const deviceType = getDevice();
        const wrapper = elementType === 'gutenverse/section' ? u(`.${elementId}`).parent().first() : u(`.${elementId}`).first();
        const element = u(wrapper).hasClass('guten-section-wrapper') ? u(wrapper).find(':scope > section').first() : wrapper;
        const dummy = u(wrapper).parent().find(`.sticky-dummy-${elementId}`).first();

        // Kill animation before change
        this.killAnimation({ stVar, animationVar, wrapper, dummy });

        if (wrapper) {
            const isFixed = !u(wrapper).hasClass('guten-column') && (u(wrapper).parent().hasClass('wp-block-template-part') || u(wrapper).parent().hasClass('wp-block-group'));

            const scroller = u('.interface-interface-skeleton__content').first() || window;
            const scrollY = scroller.scrollY || 0;
            const scrollX = scroller.scrollX || 0;
            const scrollerHeight = scroller.getBoundingClientRect ? scroller.getBoundingClientRect().height : scroller.innerHeight;

            const elementComputed = window.getComputedStyle(element);
            const elementRect = element.getBoundingClientRect();
            const elementMarginTop = (parseFloat(elementComputed.marginTop) || 0);
            const elementMarginBottom = (parseFloat(elementComputed.marginBottom) || 0);
            const elementMarginLeft = (parseFloat(elementComputed.marginLeft) || 0);
            const elementMarginRight = (parseFloat(elementComputed.marginRight) || 0);
            // const elementVOffset = (parseFloat(elementComputed.marginTop) || 0) + (parseFloat(elementComputed.marginBottom) || 0);
            // const elementHOffset = (parseFloat(elementComputed.marginLeft) || 0) + (parseFloat(elementComputed.marginRight) || 0);
            const elementWidth = elementRect.width;
            const elementHeight = elementRect.height;

            const elementTop = elementRect.top + scrollY;
            const elementLeft = elementRect.left + scrollX;

            const container = u(wrapper).closest('.block-editor-block-list__layout:not(.wp-block-template-part):not(.wp-block-group)').first() || u('.is-root-container').first();
            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top + scrollY;
            const containerBottom = containerRect.top + scrollY + containerRect.height;

            const offsetTopConvert = this.convertDimension(topSticky[deviceType], wrapper);
            const offsetBottomConvert = this.convertDimension(bottomSticky[deviceType], wrapper);
            const offsetTop = (2*offsetTopConvert.point) + offsetTopConvert.unit;
            const offsetBottom = offsetBottomConvert.point + offsetBottomConvert.unit;
            const offsetStart = stickyPosition === 'top' ? elementTop + 'px +' + offsetTop : (containerTop - scrollerHeight) + 'px';
            const offsetEnd = stickyPosition === 'bottom' ? (elementTop + elementHeight - scrollerHeight)  + 'px -' + offsetBottom : containerBottom + 'px';

            const borderScrollTop = elementHeight + (offsetTopConvert.point * 2);
            const borderScrollBottom = elementHeight + (offsetBottomConvert.point * 2);

            const tween = gsap.to(wrapper, { 
                yPercent: stickyPosition === 'top' ? -100 : 100, 
                y: stickyPosition === 'top' ? `-${borderScrollTop}px` : `${borderScrollBottom}px`, 
                duration: Number(stickyDuration), 
                ease: stickyEase 
            });

            window[animationVar] = gsap.timeline();
            window[animationVar].add(tween);
            window[animationVar].pause();

            const pinParams = {
                wrapper,
                isFixed,
                element,
                elementId,
                elementRect,
                elementLeft,
                elementWidth,
                elementHeight,
                elementMarginTop,
                elementMarginBottom,
                elementMarginLeft,
                elementMarginRight,
                stickyPosition,
                offsetTop,
                offsetBottom,
                offsetTopConvert,
                offsetBottomConvert,
                stickyDuration,
                stickyShowOn
            };

            const stParams = {
                id: `stickySection${elementId}`,
                start: offsetStart,
                end: offsetEnd,
                scroller,
                onLeave: () => this.stopPinning(pinParams),
                onLeaveBack: () => this.stopPinning(pinParams),
            };

            if (stickyPosition === 'top') {
                if (stickyShowOn === 'up') {
                    stParams.onUpdate = (self) => {
                        let tweenTo = 0;
                        const progress = (self.end - self.start) * self.progress;
                        const progressLeft = (self.end - self.start) * (1 - self.progress);

                        if (progress <= 0) {
                            this.timeScale = 100;
                            this.stopPinning(pinParams);
                            return;
                        }

                        this.startPinning({...pinParams, progress: progressLeft});

                        if (self.direction === 1) {
                            if (progress > borderScrollTop) {
                                tweenTo = stickyDuration;
                                this.timeScale = 1;
                            } else {
                                this.timeScale = 100;
                                tweenTo = stickyDuration * ((progress / 2) / borderScrollTop);
                            }
                        } else {
                            tweenTo = 0;
                            this.timeScale = 1;
                        }

                        window[animationVar].timeScale(this.timeScale);
                        window[animationVar].tweenTo(tweenTo);
                    };
                } else if (stickyShowOn === 'down') {
                    stParams.onUpdate = (self) => {
                        let tweenTo = 0;
                        const progress = (self.end - self.start) * self.progress;
                        const progressLeft = (self.end - self.start) * (1 - self.progress);

                        this.startPinning({ ...pinParams, progress: progressLeft });

                        if (self.direction === 1) {
                            tweenTo = 0;
                            this.timeScale = 1;
                        } else {
                            if (progress > borderScrollTop) {
                                tweenTo = stickyDuration;
                                this.timeScale = 1;
                            } else {
                                this.timeScale = 100;
                                tweenTo = stickyDuration * ((progress / 2) / borderScrollTop);
                            }
                        }

                        window[animationVar].timeScale(this.timeScale);
                        window[animationVar].tweenTo(tweenTo);
                    };
                } else {
                    stParams.onUpdate = (self) => {
                        const progressLeft = (self.end - self.start) * (1 - self.progress);
                        this.startPinning({...pinParams, progress: progressLeft});
                    };
                }
            } else {
                if (stickyShowOn === 'up') {
                    stParams.onUpdate = (self) => {
                        let tweenTo = 0;
                        const progress = (self.end - self.start) * self.progress;
                        const progressLeft = (self.end - self.start) * (1 - self.progress);

                        this.startPinning({ ...pinParams, progress });

                        if (self.direction === 1) {
                            if (progressLeft > borderScrollBottom) {
                                tweenTo = stickyDuration;
                                this.timeScale = 1;
                            } else {
                                this.timeScale = 100;
                                tweenTo = stickyDuration * ((progressLeft / 2) / borderScrollBottom);
                            }
                        } else {
                            tweenTo = 0;
                            this.timeScale = 1;
                        }

                        window[animationVar].timeScale(this.timeScale);
                        window[animationVar].tweenTo(tweenTo);
                    };
                } else if (stickyShowOn === 'down') {
                    stParams.onUpdate = (self) => {
                        let tweenTo = 0;
                        const progress = (self.end - self.start) * self.progress;
                        const progressLeft = (self.end - self.start) * (1 - self.progress);

                        if (progressLeft <= 0) {
                            this.timeScale = 100;
                            this.stopPinning(pinParams);
                            return;
                        }

                        this.startPinning({ ...pinParams, progress });

                        if (self.direction === 1) {
                            tweenTo = 0;
                            this.timeScale = 1;
                        } else {
                            if (progressLeft > borderScrollBottom) {
                                tweenTo = stickyDuration;
                                this.timeScale = 1;
                            } else {
                                this.timeScale = 100;
                                tweenTo = stickyDuration * ((progressLeft / 2) / borderScrollBottom);
                            }
                        }

                        window[animationVar].timeScale(this.timeScale);
                        window[animationVar].tweenTo(tweenTo);
                    };
                } else {
                    stParams.onUpdate = (self) => {
                        const progress = (self.end - self.start) * self.progress;
                        this.startPinning({...pinParams, progress});
                    };
                }
            }

            window[stVar] = ScrollTrigger.create(stParams);
        }
    }

    killAnimation({ stVar, animationVar, wrapper, dummy }) {
        if (window[stVar]) {
            window[stVar].kill(true);
        }

        if (window[animationVar]) {
            window[animationVar].kill(true);
        }

        if (dummy) {
            dummy.remove();
        }

        if (wrapper) {
            gsap.set(wrapper, {clearProps: true});
            wrapper.classList.remove('pinned');
        }
    }

    startPinning(props) {
        const {
            wrapper,
            isFixed,
            progress,
            element,
            elementId,
            elementLeft,
            elementWidth,
            elementHeight,
            elementMarginTop,
            elementMarginBottom,
            elementMarginLeft,
            elementMarginRight,
            stickyPosition,
            offsetTop,
            offsetBottom,
            offsetTopConvert,
            offsetBottomConvert
        } = props;

        u(wrapper).addClass('pinned');

        if (isFixed) {
            u(wrapper).addClass('fixed');
            wrapper.style.left = `${elementLeft}px`;
            wrapper.style.width = `${elementWidth}px`;
            element.style.margin = 0;

            if (stickyPosition === 'top') {
                wrapper.style.top = (
                    progress > elementHeight + offsetTopConvert.point
                        ? offsetTop
                        : offsetTopConvert.point - (elementHeight + offsetTopConvert.point - progress) + 'px'
                );
            } else {
                wrapper.style.bottom = (
                    progress > elementHeight + offsetBottomConvert.point
                        ? offsetBottom
                        : offsetBottomConvert.point - (elementHeight + offsetBottomConvert.point - progress) + 'px'
                );
            }

            if (! u(wrapper).parent().find(`.sticky-dummy-${elementId}`).length) {
                u(wrapper).after(`
                    <div 
                        class="sticky-dummy-${elementId}"
                        style="display: block; height: ${elementHeight}px; width: ${elementWidth}px; margin: 0px; margin-top: ${elementMarginTop}px; margin-bottom: ${elementMarginBottom}px; margin-left: ${elementMarginLeft}px; margin-right: ${elementMarginRight}px"
                    >
                    </div>
                `);
            }
        }
    }

    stopPinning(props) {
        const {
            wrapper,
            isFixed,
            element,
            elementId,
            stickyDuration,
            stickyShowOn
        } = props;

        const resetPin = () => {
            u(element).attr('style', '');
            u(wrapper).attr('style', '');
            u(wrapper).removeClass('pinned');

            if (isFixed) {
                u(wrapper).removeClass('fixed');

                if (u(wrapper).parent().find(`.sticky-dummy-${elementId}`)) {
                    u(wrapper).parent().find(`.sticky-dummy-${elementId}`).remove();
                }
            }
        };

        if (stickyShowOn !== 'both') {
            setTimeout(() => {
                resetPin();
            }, parseFloat(stickyDuration) * (1 / this.timeScale) * 1000);
        } else {
            resetPin();
        }
    }

    convertDimension(value, wrapper) {
        let point = 0;
        let unit = 'px';

        const fontSize = parseInt(window.getComputedStyle(wrapper).fontSize) || 16;

        if (value && value.point) {
            point = Number(value.point) || 0;
        }

        if (value && value.unit) {
            unit = value.unit;
        }

        if (unit === 'vh') {
            point = point * window.innerHeight / 100;
        } else if (unit === 'em') {
            point = point * fontSize;
        }

        return {
            point: point,
            unit: 'px'
        };
    }
}

window.gsticky = new GutenEditorSticky();
