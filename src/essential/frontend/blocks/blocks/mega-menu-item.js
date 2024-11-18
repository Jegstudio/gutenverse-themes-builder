import { getDevice } from 'gutenverse-pro-frontend';
import { Default, u, apiFetch, addQueryArgs } from 'gutenverse-core-frontend';

class GutenverseMegaMenuItem extends Default {
    /* public */
    init() {
        this._elements.map((element) => {
            this._addMenu(element);
            this._setPosition(element);
        });
    }

    /* private */
    _addMenu(element) {
        if (u(element).hasClass('mega-menu-list')) {
            const headingItem = u(element).find('.mega-menu-item-body');
            const indicator = u(element).data('indicator');

            headingItem.each((e) => {
                const menu = u(e).data('menu');

                apiFetch({
                    path: addQueryArgs('/gutenverse-client/v1/menu/render', {
                        menu,
                    }),
                }).then((data) => {
                    u(e).append(data);

                    const menuDropdown = u(element).find('li.menu-item-has-children > a');

                    menuDropdown.each((node) => {
                        u(node).find('i').remove();
                        u(node).append(`<i class='${indicator}'></i>`);
                    });

                    this._addSelectLi(element);
                    this._setAnimation(element);
                });
            });
        }
    }

    _addSelectLi(element) {
        const liMenu = u(element).find('.gutenverse-menu li a');
        const indicator = liMenu.find(':scope > i');

        liMenu.on('mouseover', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const subMenu = u(e.currentTarget).parent().find(':scope > ul.sub-menu').first();

            u(e.currentTarget).closest('ul').find('li').removeClass('active');
            u(e.currentTarget).closest('li').addClass('active');

            if (subMenu) {
                this.playAnimation(u(subMenu));
            }
        });

        indicator.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const liWrapper = u(e.currentTarget).parent().parent();
            const active = liWrapper.hasClass('active');
            const subMenu = liWrapper.find(':scope > ul.sub-menu').first();

            liWrapper.parent().find(':scope > li').removeClass('active');

            if (! active) {
                liWrapper.addClass('active');

                if (subMenu) {
                    this.playAnimation(u(subMenu));
                }
            } else {
                liWrapper.removeClass('active');
            }
        });

        u(element).on('mouseleave', () => {
            liMenu.each((menu) => {
                u(menu).closest('li').removeClass('active');
            });
        });
    }

    _setPosition(element) {
        const dataId = u(element).data('id');
        const posData = u(document.body).find(`div[data-var="megaMenuItemPanelWrap${dataId}"]`)?.data('value');

        if (posData) {
            const {
                panelWrap,
                panelWidthWrap,
                orientation,
                breakpoint,
                subMenuType
            } = JSON.parse(posData);

            const device = getDevice();

            if ((! breakpoint
                || ( breakpoint === 'mobile' && device.toLowerCase() !== 'mobile' )
                || ( breakpoint === 'tablet' && device.toLowerCase() !== 'tablet' && device.toLowerCase() !== 'mobile' ))
                && (subMenuType === 'mega-menu' || (subMenuType === 'list' && orientation === 'vertical'))
            ) {
                let itemRect;
                let wrapperRect;
                let styles = '';
                let wrapper = u(document.body).find(`.${panelWrap}`).first();

                wrapper = u(wrapper).hasClass('guten-section') ? u(wrapper).find(':scope > .guten-container').first() : wrapper;

                wrapperRect = wrapper.getBoundingClientRect();
                itemRect = element.getBoundingClientRect();

                if (orientation === 'horizontal') {
                    styles = `left: ${(0 - itemRect.left) + wrapperRect.left}px; width: ${wrapperRect.width}px;`;
                } else {
                    styles = `top: ${(0 - itemRect.top) + wrapperRect.top}px; min-height: ${wrapperRect.height}px;`;
                }

                u(element).find('.mega-menu-body').attr('style', styles);
            }
        }
    }

    _setAnimation(element) {
        const dataId = u(element).data('id');
        const animationClass = u(document.body).find(`div[data-var="megaMenuItemAnimationClass${dataId}"]`)?.data('value');
        const subMenu = u(element).find('ul.sub-menu');

        if (animationClass) {
            const animationClassObj = JSON.parse(animationClass)
            Object.keys(animationClassObj).filter(r => !!animationClassObj[r]).forEach(className => {
                subMenu.addClass(className);
            });
        }
    }
}

export default GutenverseMegaMenuItem;
