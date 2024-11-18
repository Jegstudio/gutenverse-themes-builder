import React from 'react';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconMegaMenuSVG } from '../../../assets/icon/index';
// import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconMegaMenuSVG />,
    // example,
    usesContext: [
        'gutenverse/megaMenuIndicator',
        'gutenverse/megaMenuOrientation',
        'gutenverse/megaMenuBreakpoint'
    ],
    edit,
    save,
};
