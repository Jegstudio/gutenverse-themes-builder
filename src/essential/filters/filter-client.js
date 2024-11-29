import { addGutenverseFilter } from "./theFilter";
class GutenversePROLiteFilter {
    constructor() {
        const {
            plugins
        } = window['GutenverseConfig'];
        const checkInstall = plugins['gutenverse-pro'] ? true : false;
        if( !checkInstall ){
            addGutenverseFilter();
        }
    }
}
new GutenversePROLiteFilter();
export default GutenversePROLiteFilter;