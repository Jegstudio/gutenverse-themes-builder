import { useInstanceId } from '@wordpress/compose';

const ButtonControl = (props) => {
    const {
        label,
        onClick
    } = props;

    const id = useInstanceId(ButtonControl, 'inspector-alert-control');

    return <div id={id} className="gutenverse-control-wrapper gutenverse-control-button">
        <div className={'control-body'}>
            <div className={'control-button'}>
                <input className={'button'} type={'button'} value={label} onClick={onClick} />
            </div>
        </div>
    </div>;
};

export default ButtonControl;
