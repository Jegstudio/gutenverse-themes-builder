import { u, Default } from 'gutenverse-core-frontend';

class GutenverseMegaMenu extends Default {
    /* public */
    init() {
        this._elements.map((element) => {
            this._addShowHover(element);
            this._addSlideWrapper(element);
            this.__addActiveWhenHaveSameUrl(element);
        });
    }

    /* private */
    _addShowHover(element) {
        const items = u(element).find('.guten-mega-menu-item');
        const pageUrl = window.location.href;
        const thisPage = u(element).find(`a[href="${pageUrl}"]`);
        const thisPageId = thisPage.parent().parent().data('id');

        items.on('mouseover', (e) => {
            const item = u(e.currentTarget);
            const itemBody = item.find(':scope > .mega-menu-body').first();

            item.addClass('hover');
            items.each((itm) => {
                if (e.currentTarget !== itm && thisPageId !== u(itm).data('id')) {
                    u(itm).removeClass('active');
                }
            });

            if (itemBody) {
                this.playAnimation(u(itemBody));
            }
        });

        items.on('mouseleave', (e) => {
            const item = u(e.currentTarget);
            item.removeClass('hover');
        });

        items.each((item, index) => {
            u(item).on('click', (e) => {
                const wrapper = u(e.currentTarget);
                const itemBody = u(e.currentTarget).find(':scope > .mega-menu-body').first();
                const active = u(wrapper).hasClass('active');
                const hover = u(wrapper).hasClass('hover');

                if (itemBody !== e.target && !itemBody.contains(e.target)) {
                    items.each((itm, idx) => {
                        if (idx !== index) {
                            u(itm).removeClass('active');
                        }
                    });

                    if (!active) {
                        wrapper.addClass('active');

                        if (itemBody) {
                            this.playAnimation(u(itemBody));
                        }
                    }
                    if (hover || active) {
                        wrapper.removeClass('hover');
                        wrapper.removeClass('active');
                    }
                }
            });
        });

        u(document).on('click', (e) => {
            if (element !== e.target && !element.contains(e.target)) {
                items.removeClass('active');
            }
        });
    }

    _addSlideWrapper(element) {
        const wrapper = u(element).find('.mega-menu-wrapper');
        const hamburger = u(element).find('.mega-menu-hamburger');
        const close = u(element).find('.mega-menu-close');

        hamburger.on('click', () => {
            wrapper.addClass('active');
        });

        close.on('click', () => {
            wrapper.removeClass('active');
        });
    }
    __addActiveWhenHaveSameUrl(element){
        const pageUrl = window.location.href;
        const thisPage = u(element).find(`a[href="${pageUrl}"]`);
        if(thisPage){
            thisPage.parent().parent().addClass('active');
        }
    }
}

export default GutenverseMegaMenu;
