import { Fragment, useState } from '@wordpress/element';
import { DashEye } from './dashboard-icons';

const DashboardPage = () => {
    const {
        title,
        description,
        pluginTitle,
        pluginDesc,
        pages,
        plugins
    } = window['GutenThemeConfig'];

    const [popupImg, setPopupImg] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const onOpen = img => {
        setOpenPopup(true);
        setPopupImg(img);
    };

    const onClose = () => {
        setOpenPopup(false);
    };

    return <Fragment>
        <div className="top-container">
            <div className="install-template">
                <div className="thumbnail">
                    {Object.keys(pages).map(key => {
                        return <div key={key} className="image" onClick={() => onOpen(pages[key])}>
                            <img src={pages[key]} alt="image" width="400" height="300"/>
                            <div className="hover"><DashEye/></div>
                        </div>;
                    })}
                </div>
                <div className="content">
                    <h2 className="title">{title}</h2>
                    <span className="description">{description}</span>
                </div>
            </div>
        </div>
        <div className="bottom-container">
            <div className="comparison">
                <h2 className="title">{pluginTitle}</h2>
                <p className="description">{pluginDesc}</p>
                <table>
                    <thead>
                        <tr className="thead_tr">
                            <td>Plugin Name</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {plugins.map((plugin) => {
                            return <tr key={plugin?.slug}>
                                <td className="tbody_td">{plugin?.title}</td>
                                <td className="tbody_td">{plugin?.installed ? 'Installed' : 'Not Installed'}</td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        <div className={`popup ${!openPopup ? 'hide' : ''}`} onClick={onClose}>
            <img src={popupImg} alt="image"/>
        </div>
    </Fragment>;
};

export default DashboardPage;