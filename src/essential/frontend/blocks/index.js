import { u, addFilter } from 'gutenverse-core-frontend';
import GutenverseMegaMenu from '../../../../gutenverse-extend/src/pro/frontend/blocks/blocks/mega-menu';
import GutenverseMegaMenuItem from '../../../../gutenverse-extend/src/pro/frontend/blocks/blocks/mega-menu-item';
import GutenverseSticky from '../../../../gutenverse-extend/src/pro/frontend/blocks/script/sticky';
import GutenverseAdvanceTabs from '../../../../gutenverse-extend/src/pro/frontend/blocks/blocks/advance-tabs';
import GutenverseBackgroundEffect from '../../../../gutenverse-extend/src/pro/frontend/blocks/script/background-effect';

const swiperFrontend = (result, props) => {
    const isTrue = (val) => val === 'true';

    const {
        loop,
        autoplay,
        timeout,
        nav,
        arrow,
        breakpoints
    } = props;

    const settings = {
        loop: isTrue(loop),
        autoplay: isTrue(autoplay) ? {
            delay: parseInt(timeout)
        } : false,
        navigation: isTrue(arrow) ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        } : false,
        pagination: isTrue(nav) ? {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        } : false,
        breakpoints: JSON.parse(breakpoints)
    };

    return settings;
};

const filterLists = [
    {
        name: 'gutenverse.swiper.frontend',
        namespace: 'gutenverse-pro/filter/swiper/frontend',
        result: swiperFrontend
    },
];

class GutenverseFrontendPro {
    constructor() {
        this.stickyScript();
        this.blockScript();
        this.backgroundEffectScript();

        filterLists.map(item => {
            addFilter(item.name, item.namespace, item.result);
        });
    }

    stickyScript() {
        const selected = u('.guten-sticky');
        if (selected) {
            new GutenverseSticky(selected);
        }
    }

    backgroundEffectScript(){
        const backgroundEffect = new GutenverseBackgroundEffect();
        const elements = u('.guten-background-effect-active');

        elements.map(element => {
            backgroundEffect.init(element);
        });
    }

    blockScript() {
        const gutenClasses = {
            ['mega-menu']: GutenverseMegaMenu,
            ['mega-menu-item']: GutenverseMegaMenuItem,
            ['advance-tabs']: GutenverseAdvanceTabs,
        };

        Object.keys(gutenClasses).map((index) => {
            const selected = u(`.guten-${index}`);
            const ClassItem = gutenClasses[index];

            if (selected) {
                new ClassItem(selected);
            }
        });
    }
}

new GutenverseFrontendPro();