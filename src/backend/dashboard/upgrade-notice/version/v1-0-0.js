
import { __ } from '@wordpress/i18n';

export const ContentV100 = () => {
    const { gtbAssetURL: assetURL } = window['GutenverseDashboard'];

    return <>
        <h2 className="update-title">{__( 'Start Building with Gutenverse Theme Builder', 'gutenverse-themes-builder' )}</h2>
        <ol>
            <li>{__( 'Create Your Own Block Theme.', 'gutenverse-themes-builder' )}</li>        
            <p className="update-desc">{__( 'Now you can create your own block theme and share it with others.', 'gutenverse-themes-builder' )}</p>

            <li>{__( 'Build with Gutenverse.', 'gutenverse-themes-builder' )}</li>        
            <p className="update-desc">{__( 'You can use the Gutenverse plugin as your building block to build your own themes.', 'gutenverse-themes-builder' )}</p>

            <li>{__( 'Customize to Your Heart Content.', 'gutenverse-themes-builder' )}</li>        
            <p className="update-desc">{__( 'You can customize your theme any way you want. Add global styles, fonts, patterns, custom styles, custom scripts, etc.', 'gutenverse-themes-builder' )}</p>
        </ol></>;
};
