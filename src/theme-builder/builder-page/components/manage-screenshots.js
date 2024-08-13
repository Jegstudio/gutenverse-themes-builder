import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ContentWrapper from './content-wrapper';
import { getThemeData, updateOtherData } from '../../../data/api-fetch';


const ManageScreenshots = () => {
    const [thumbnail, setThumbnail] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [thumbnailFrame, setThumbnailFrame] = useState(null);
    const [screenshotFrame, setScreenshotFrame] = useState(null);

    useEffect(() => {
        const firstFrame = wp?.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Select as Thumbnail'
            },
            library: {
                type: ['image/jpg', 'image/jpeg']
            },
            multiple: false
        });

        setThumbnailFrame(firstFrame);

        const secondFrame = wp?.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Select for Screenshots'
            },
            library: {
                type: ['image']
            },
            multiple: true
        });

        setScreenshotFrame(secondFrame);

        getThemeData(null, response => {
            if (response?.other?.screenshots) {
                response?.other?.screenshots?.thumbnail && setThumbnail(response?.other?.screenshots?.thumbnail);
                response?.other?.screenshots?.dashboard && setDashboard(response?.other?.screenshots?.dashboard);
            }
        });
    }, []);

    useEffect(() => {
        if (thumbnailFrame) {
            thumbnailFrame.on('select', function () {
                const attachment = thumbnailFrame.state().get('selection').first().toJSON();
                setThumbnail({
                    id: attachment?.id,
                    filename: attachment?.filename,
                    url: attachment?.url,
                });
            });
        }
    }, [thumbnailFrame]);

    useEffect(() => {
        if (screenshotFrame) {
            screenshotFrame.on('select', function () {
                const attachment = screenshotFrame.state().get('selection').toJSON();
                setDashboard(attachment.map(item => ({
                    id: item?.id,
                    filename: item?.filename,
                    url: item?.url,
                })));
            });
        }
    }, [screenshotFrame]);

    const selectItem = (frame) => {
        if (frame) {
            frame.open();
            return;
        }
    };

    const updateScreenshotData = () => {
        updateOtherData({
            key: 'screenshots',
            data: {
                thumbnail,
                dashboard
            }
        });
    };

    return <ContentWrapper
        title={__('Manage Screenshots', 'gutenverse-themes-builder')}
        description={__('This is the place to manage all screenshots that represent your themes. From theme thumbnail to theme dashboard.', 'gutenverse-themes-builder')}
        headingButton={true}
        headingButtons={[
            {
                buttonText: __('Save', 'gutenverse-themes-builder'),
                buttonEvent: updateScreenshotData,
                buttonIcon: false,
                buttonLoading: false
            }
        ]}
    >
        <>
            <div>
                <h3>{__('Screenshot for Thumbnail', 'gutenverse-themes-builder')}</h3>
                <p>{__('Make sure the thumbnail is a representation of your theme layout.', 'gutenverse-themes-builder')}</p>
                <div>
                    {thumbnail && <img className="image-preview" src={thumbnail?.url} />}
                </div>
                <button onClick={() => selectItem(thumbnailFrame)}>{__('Choose Image', 'gutenverse-themes-builder')}</button>
                <h3>{__('Screenshots for Dashboard', 'gutenverse-themes-builder')}</h3>
                <p>{__('Make sure each screenshot size is smaller than 500KB to reduce the theme file size', 'gutenverse-themes-builder')}</p>
                <div>
                    {dashboard && dashboard.map(screenshot => {
                        return <img className="image-preview" key={screenshot?.id} src={screenshot?.url} />;
                    })}
                </div>
                <button onClick={() => selectItem(screenshotFrame)}>{__('Choose Images', 'gutenverse-themes-builder')}</button>
            </div>
        </>
    </ContentWrapper>;
};

export default ManageScreenshots;
