import { u, Default } from 'gutenverse-core-frontend';
import { getDevice, deviceStyleValue } from 'gutenverse-pro-frontend';

class GutenverseSticky extends Default {
    init() {
        this.animate();
    }

    animate() {
        this._elements.map((element) => {
            if (u(element).hasClass('guten-section')) {
                new GutenverseStickyAnimate(u(element).parent().first());
            }

            if (u(element).hasClass('guten-column')) {
                new GutenverseStickyAnimate(u(element).first());
            }

            if (u(element).hasClass('guten-form-builder')) {
                let loadFormTimeout = null;

                const loadForm = () => {
                    loadFormTimeout = setTimeout(() => {
                        loadForm();
                    }, 500);

                    if (element.offsetWidth > 0 || element.offsetHeight > 0) {
                        clearTimeout(loadFormTimeout);
                        new GutenverseStickyAnimate(u(element).first());
                    }
                };

                loadForm();
            }
        });
    }
}

class GutenverseStickyAnimate {
    constructor(wrapper) {
        this.timeScale = 1;
        this._stickyElement(wrapper);
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
            point = (point * window.innerHeight) / 100;
        } else if (unit === 'em') {
            point = point * fontSize;
        }

        return {
            point: point,
            unit: 'px',
        };
    }

    detectSticky(wrapper) {
        const deviceType = getDevice();
        const dataId = u(wrapper).data('id');
        const stickyData = dataId && u(wrapper).find(`div[data-var="stickyData${dataId}"]`).data('value');
        const stickyDataParsed = stickyData && JSON.parse(stickyData);
        const deviceEnable = stickyDataParsed ? deviceStyleValue(deviceType, stickyDataParsed['sticky']) : false;

        if (deviceEnable) {
            const promiseGsap = import(/* webpackChunkName: "chunk-gsap" */ 'gsap');
            const promiseScrollTrigger = import(/* webpackChunkName: "chunk-gsap-scroll-trigger" */ 'gsap/ScrollTrigger');

            Promise.all([promiseGsap, promiseScrollTrigger])
                .then((result) => {
                    const { default: gsap } = result[0];
                    const { default: ScrollTrigger } = result[1];

                    gsap.registerPlugin(ScrollTrigger);
                    this.loadSticky(wrapper, stickyDataParsed, dataId, deviceType, gsap, ScrollTrigger);
                });
        }
    }

    loadSticky(wrapper, attr, dataId, deviceType, gsap, ScrollTrigger) {
        const {
            stickyShowOn,
            stickyPosition,
            stickyEase = 'none',
            stickyDuration = 0.25,
            topSticky,
            bottomSticky
        } = attr;

        const elementId = dataId;
        const element = u(wrapper).hasClass('guten-section-wrapper') ? u(wrapper).find(':scope > section').first() : wrapper;
        const windowHeight = window.innerHeight;

        const isFixed = !u(wrapper).hasClass('guten-column') && (u(wrapper).parent().hasClass('wp-block-template-part') || u(wrapper).parent().hasClass('wp-block-group'));

        const elementComputed = window.getComputedStyle(element);
        const elementRect = element.getBoundingClientRect();
        const elementMarginTop = parseFloat(elementComputed.marginTop) || 0;
        const elementMarginBottom = parseFloat(elementComputed.marginBottom) || 0;
        const elementMarginLeft = parseFloat(elementComputed.marginLeft) || 0;
        const elementMarginRight = parseFloat(elementComputed.marginRight) || 0;
        // const elementVOffset = elementMarginTop + elementMarginBottom;
        // const elementHOffset = elementMarginLeft + elementMarginRight;
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;

        const elementTop = elementRect.top + window.scrollY;
        const elementLeft = elementRect.left + window.scrollX;

        const container = u(wrapper).closest('.guten-column-wrapper').length ? u(wrapper).closest('.guten-column-wrapper').first() : u('.wp-site-blocks').first();
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const containerBottom = containerRect.top + window.scrollY + containerRect.height;

        const offsetTopConvert = this.convertDimension(topSticky[deviceType], wrapper);
        const offsetBottomConvert = this.convertDimension(bottomSticky[deviceType], wrapper);

        const offsetTop =  (2 * offsetTopConvert.point) + offsetTopConvert.unit;
        const offsetBottom = offsetBottomConvert.point + offsetBottomConvert.unit;
        const offsetStart = stickyPosition === 'top' ? elementTop + 'px +' + offsetTop : containerTop - windowHeight + 'px';
        const offsetEnd = stickyPosition === 'bottom' ? elementTop + elementHeight - windowHeight + 'px -' + offsetBottom : containerBottom + 'px';

        const borderScrollTop = elementHeight + (offsetTopConvert.point * 2);
        const borderScrollBottom = elementHeight + (offsetBottomConvert.point * 2);

        const tween = gsap.to(wrapper, {
            yPercent: stickyPosition === 'top' ? -100 : 100,
            y: stickyPosition === 'top' ? `-${borderScrollTop}px` : `${borderScrollBottom}px`,
            duration: Number(stickyDuration),
            ease: stickyEase
        });

        const animation = gsap.timeline();
        animation.add(tween);
        animation.pause();

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
            stickyShowOn,
        };

        const stParams = {
            id: `stickySection${elementId}`,
            start: offsetStart,
            end: offsetEnd,
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

                    animation.timeScale(this.timeScale);
                    animation.tweenTo(tweenTo);
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

                    animation.timeScale(this.timeScale);
                    animation.tweenTo(tweenTo);
                };
            } else {
                stParams.onUpdate = (self) => {
                    const progressLeft = (self.end - self.start) * (1 - self.progress);
                    this.startPinning({ ...pinParams, progress: progressLeft });
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

                    animation.timeScale(this.timeScale);
                    animation.tweenTo(tweenTo);
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

                    animation.timeScale(this.timeScale);
                    animation.tweenTo(tweenTo);
                };
            } else {
                stParams.onUpdate = (self) => {
                    const progress = (self.end - self.start) * self.progress;
                    this.startPinning({ ...pinParams, progress });
                };
            }
        }

        ScrollTrigger.create(stParams);
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

        const adminBar = u(document).find('#wpadminbar').first();
        let offsetTopWithBar = offsetTop;

        if (adminBar) {
            offsetTopWithBar = offsetTopConvert?.point + adminBar.getBoundingClientRect().height + 'px';
        }

        wrapper.style.top = offsetTopWithBar;

        if (isFixed) {
            u(wrapper).addClass('fixed');
            wrapper.style.left = `${elementLeft}px`;
            wrapper.style.width = `${elementWidth}px`;
            element.style.margin = 0;

            if (stickyPosition === 'top') {
                wrapper.style.top = (
                    progress > elementHeight + offsetTopConvert.point
                        ? offsetTopWithBar
                        : offsetTopConvert.point - (elementHeight + offsetTopConvert.point - progress) + 'px'
                );
            } else {
                wrapper.style.bottom = (
                    progress > elementHeight + offsetBottomConvert.point
                        ? offsetBottom
                        : offsetBottomConvert.point - (elementHeight + offsetBottomConvert.point - progress) + 'px'
                );
            }

            if (!u(wrapper).parent().find(`.sticky-dummy-${elementId}`).length) {
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

    _stickyElement(wrapper) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.detectSticky(wrapper);
        } else {
            window.addEventListener('load', () => {
                this.detectSticky(wrapper);
            });
        }
    }
}

export default GutenverseSticky;
