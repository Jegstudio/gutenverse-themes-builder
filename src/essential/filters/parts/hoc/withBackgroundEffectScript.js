import isEmpty from 'lodash/isEmpty';

export const withBackgroundEffectScript = (result, { BlockElement, props }) => {
    const { attributes } = props;
    const { backgroundEffect, elementId } = attributes;
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    let script = null;

    if (isBackgroundEffect) {
        const id = elementId && elementId.split('-')[1];

        script = <div className="guten-data">
            <div data-var={`backgroundEffectAttr${id}`} data-value={JSON.stringify({ backgroundEffect })} />
        </div>;
    }

    return <>
        <BlockElement
            {...props}
        />
        {script}
    </>;
};