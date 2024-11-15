import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ContentWrapper from './content-wrapper';
import { getThemeData, updateOtherData } from '../../../data/api-fetch';
import { IconCloseSVG } from 'gutenverse-core/icons';


const ManageScreenshots = () => {
    const [thumbnail, setThumbnail] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [thumbnailFrame, setThumbnailFrame] = useState(null);
    const [screenshotFrame, setScreenshotFrame] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        setTimeout(() => {
            updateOtherData({
                key: 'screenshots',
                data: {
                    thumbnail,
                    dashboard
                }
            });
        }, 500);
        setLoading(false);
    };

    return <ContentWrapper
        title={__('Manage Screenshots', 'gutenverse-themes-builder')}
        description={__('This is the place to manage all screenshots that represent your themes. From theme thumbnail to theme dashboard.', 'gutenverse-themes-builder')}
    >
        <>
            <div >
                <br/>
                <div className='media-input-wrapper'>
                    <h3>{__('Screenshot for Thumbnail', 'gutenverse-themes-builder')}</h3>
                    <p>{__('Make sure the thumbnail is a representation of your theme layout.', 'gutenverse-themes-builder')}</p>
                    <div>
                        {thumbnail && <img className="image-preview" src={thumbnail?.url} />}
                    </div><br/>
                    <button className='button' onClick={() => selectItem(thumbnailFrame)}>{__('Choose Image', 'gutenverse-themes-builder')}</button>
                </div>
                <br/>
                <div className='media-input-wrapper'>
                    <h3>{__('Screenshots for Dashboard', 'gutenverse-themes-builder')}</h3>
                    <p>{__('Make sure each screenshot size is smaller than 500KB to reduce the theme file size', 'gutenverse-themes-builder')}</p>
                    <div className='image-wrapper'>
                        {dashboard && dashboard.map((screenshot, index) => {
                            return <div className="image-preview" key={screenshot?.id} >
                                <div className="close" onClick={() => {
                                    const newList = dashboard.filter((ss, i) => i !== index);
                                    setDashboard(newList);
                                }}>
                                    <IconCloseSVG/>
                                </div>
                                <img src={screenshot?.url} />
                            </div>;
                        })}
                    </div><br/>
                    <button className='button' onClick={() => selectItem(screenshotFrame)}>{__('Choose Images', 'gutenverse-themes-builder')}</button>
                </div>
                <div className="buttons margin-top-32 end">
                    {
                        loading ? <div className="button button-loading padding-12-28" disabled>Loading... </div> :
                        <div className="button create padding-12-28" onClick={() => updateScreenshotData()}>{__('Save Changes', 'gutenverse-themes-builder')}</div>
                    }
                </div>
            </div>
        </>
    </ContentWrapper>;
};

export default ManageScreenshots;
