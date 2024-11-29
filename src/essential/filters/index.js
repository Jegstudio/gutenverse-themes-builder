import apiFetch from '@wordpress/api-fetch';
import { addGutenverseFilter } from './theFilter';

class GutenversePROLiteFilter {
    constructor() {
        const {
            plugins, license, domainURL, api
        } = window['GutenverseConfig'];
        const checkActive = plugins['gutenverse-pro'] ? plugins['gutenverse-pro'].active : false;
        if( ! checkActive || ! license ){
            addGutenverseFilter();
        }else{
            apiFetch({
                path: 'gutenverse-essence/v1/gutenverse-essence-proxy',
                method: 'POST',
                data: {
                    method : 'POST',
                    url : `${api}/wp-json/gutenverse-pro/v1/account/license-validation`,
                    body: {
                        'parameter' : btoa(`${license}&${domainURL}`)
                    }
                }
            }).then((res) => {
            }).catch(() => {
                addGutenverseFilter();
            });
        }
    }

}
new GutenversePROLiteFilter();
export default GutenversePROLiteFilter;