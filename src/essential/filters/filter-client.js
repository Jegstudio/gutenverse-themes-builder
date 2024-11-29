import { addGutenverseFilter } from "./theFilter";
import { applyFilters } from '@wordpress/hooks';

class GutenversePROLiteFilter {
    constructor() {
        const {
            plugins
        } = window['GutenverseConfig'];
        const checkInstall = plugins['gutenverse-pro'] ? true : false;
        if(applyFilters('gutenverse.essential.control', !checkInstall)){
            addGutenverseFilter();
        }
    }
}
new GutenversePROLiteFilter();
export default GutenversePROLiteFilter;