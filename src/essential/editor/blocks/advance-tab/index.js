
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconAdvanceTabSVG } from '../../../assets/icon/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconAdvanceTabSVG/>,
    edit,
    save,
};
