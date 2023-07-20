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
            title={__('Readme Editor', 'gtb')}
            description={__('Edit your current active theme readme content here. This will be built as readme.txt file in your exported theme.', 'gtb')}
        >
            <p>{__('You can keep or replace the text wrapped by "{{" and "}}" (e.g: {{title}} ).', 'gtb')}</p>
            <p>{__('If you want to replace it, please make sure you replace the whole text including the curly brackets. (example: from "{{title}}" into "My Amazing Theme"', 'gtb')}</p>
            <p>{__('If you keep it, it will be automatically converted into the data you\'ve provide in theme\'s details.', 'gtb')}</p>
            <CodeEditor
                value={readmeContent}
                language={'text'}
                placeholder={__('Write your readme.txt details right here', 'gtb')}
                onChange={(evn) => setReadmeContent(evn.target.value)}
                minHeight={400}
                data-color-mode="dark"
                style={{
                    fontSize: 13,
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
            {!loading && <div className="data-footer">
                <div className="buttons inline">
                    <button className="button create" onClick={saveReadme}>{__('Save Readme', 'gtb')}</button>
                </div>
            </div>}
        </ContentWrapper>
    );
};

export default ReadmeEditor;