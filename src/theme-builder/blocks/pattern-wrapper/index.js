import edit from './edit';
import save from './save';
import metadata from './block.json';
import { PatternWrapperIcon } from '../block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <PatternWrapperIcon />,
    edit,
    save,
};
