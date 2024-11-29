import { addGutenverseFilter } from "./theFilter";
class GutenversePROLiteFilter {
    constructor() {
        const {
            plugins, license
        } = window['GutenverseConfig'];
        const checkActive = plugins['gutenverse-pro'] ? plugins['gutenverse-pro'].active : false;
        if( !checkActive && !license){
            addGutenverseFilter();
        }
    }
}
new GutenversePROLiteFilter();
export default GutenversePROLiteFilter;