import React from 'react';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconMegaMenuSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save'
// import example from './data/example';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconMegaMenuSVG />,
    // example,
    providesContext: {
        'gutenverse/megaMenuIndicator': 'indicator',
        'gutenverse/megaMenuOrientation': 'orientation',
        'gutenverse/megaMenuBreakpoint': 'breakpoint',
    },
    edit,
    save,
    deprecated: [
        {
            attributes,
            save : saveV1
        }
    ]
};
