import ContentWrapper from './content-wrapper';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { __ } from '@wordpress/i18n';
import { presetReadme } from '../data/preset-readme';
import { useState, useEffect } from '@wordpress/element';
import { getThemeData, updateOtherData } from '../../../data/api-fetch';

const ReadmeEditor = () => {
    const [readmeContent, setReadmeContent] = useState(presetReadme);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getThemeData(null, response => {
            if (response?.other?.readme) {
                setReadmeContent(response?.other?.readme);
            }
        });
    }, []);

    const saveReadme = () => {
        setLoading(true);
        updateOtherData({
            key: 'readme',
            data: readmeContent,
        }, () => {
            setLoading(false);
        });
    };

    return (
        <ContentWrapper
            title={__('Readme Editor', 'gutenverse-themes-builder')}
            description={__('Edit your current active theme readme content here. This will be built as readme.txt file in your exported theme.', 'gutenverse-themes-builder')}
        >
            <p>{__('You can keep or replace the text wrapped by "{{" and "}}" (e.g: {{title}} ).', 'gutenverse-themes-builder')}</p>
            <p>{__('If you want to replace it, please make sure you replace the whole text including the curly brackets. (example: from "{{title}}" into "My Amazing Theme"', 'gutenverse-themes-builder')}</p>
            <p>{__('If you keep it, it will be automatically converted into the data you\'ve provide in theme\'s details.', 'gutenverse-themes-builder')}</p>
            <div style={{
                overflow: 'auto',
                height: '400px',
                width: '100%',
                borderRadius: '5px',
                marginTop: '5px',
                marginBottom: '32px'
            }}>
                <CodeEditor
                    value={readmeContent}
                    language={'text'}
                    placeholder={__('Write your readme.txt details right here', 'gutenverse-themes-builder')}
                    onChange={(evn) => setReadmeContent(evn.target.value)}
                    minHeight={400}
                    data-color-mode="dark"
                    style={{
                        fontSize: 13,
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </div>
            <div className="data-footer">
                <div className="buttons end">
                    {
                        loading ? <div className="button button-loading padding-12-28" disabled>{__('Loading...', 'gutenverse-themes-builder')}</div> : <button className="button create padding-12-28" onClick={saveReadme}>{__('Save Readme', 'gutenverse-themes-builder')}</button>
                    }
                </div>
            </div>
        </ContentWrapper>
    );
};

export default ReadmeEditor;