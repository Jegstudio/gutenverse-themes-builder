import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { DeleteIcon, EditIcon, PlusIcon } from '../data/icons';
import Table from './table';
import { isEmpty } from 'lodash';
import { createFontsize, deleteFontsize, getFontsizeList, updateFontsize } from '../../../data/api-fetch';
import { ArrowLeft } from 'react-feather';
import { WarningPopup } from './warning-popup';
import ContentWrapper from './content-wrapper';
import TextControl from '../controls/text-control';
import { checkDetails } from '../data/helper';

const importantData = {
    size: true,
    title: true,
};

const ManageFontOption = ({ title, fontData, setMode, updateDetails, loading, actionFontData, notice, buttonText }) => {
    return <div className="font-data-wrapper">
        <div className="data-header">
            <div className="buttons inline">
                <button className="button data" onClick={() => setMode('')}><ArrowLeft size={14} /></button>
            </div>
            <h3 className="subtitle">{title}</h3>
        </div>
        <div className="data-notice">
            {notice}
        </div>
        <div className="data-body">
            {loading ? <div className="saving-indicator">{__('Saving...', 'gutenverse-themes-builder')}</div> :
                <>
                    <TextControl
                        id={'title'}
                        title={__('Title', 'gutenverse-themes-builder')}
                        value={fontData?.title}
                        onChange={value => updateDetails('title', value)}
                        important={true}
                    />
                    <TextControl
                        id={'size'}
                        title={__('Size', 'gutenverse-themes-builder')}
                        value={fontData?.size}
                        onChange={value => updateDetails('size', value)}
                        important={true}
                    />
                </>
            }
        </div>
        {!loading && <div className="data-footer">
            <div className="buttons inline"></div>
            <div className="buttons inline">
                <button className="button create" onClick={actionFontData}>{buttonText}</button>
            </div>
        </div>}
    </div>;
};

const EditFont = ({ data, setMode, updateFontList }) => {
    const [fontData, setFontData] = useState(data);
    const [loading, setLoading] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState('');

    const updateCallback = (response) => {
        setMode('');
        updateFontList(response);
        setLoading(false);
    };

    const updateFontData = () => {
        if (!checkDetails(importantData, fontData)) {
            return setNoticeMessage('Please fill all the required data!');
        }

        setLoading(true);
        updateFontsize(fontData, updateCallback);
    };

    const updateDetails = (name, value) => {
        setFontData(data => {
            return {
                ...data,
                [name]: value
            };
        });
    };

    const notice = !isEmpty(noticeMessage) && <div className="gtb-notice">
        {noticeMessage}
    </div>;

    const params = { notice, fontData, setMode, updateDetails, loading, actionFontData: updateFontData };
    return <ManageFontOption
        {...params}
        title={__('Edit Font Size', 'gutenverse-themes-builder')}
        buttonText={__('Save Changes', 'gutenverse-themes-builder')}
    />;
};

const CreateFont = ({ setMode, updateFontList }) => {
    const [fontData, setFontData] = useState({});
    const [loading, setLoading] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState('');

    const updateCallback = (response) => {
        setMode('');
        updateFontList(response);
        setLoading(false);
    };

    const createFontData = () => {
        if (!checkDetails(importantData, fontData)) {
            return setNoticeMessage('Please fill all the required data!');
        }

        setLoading(true);
        createFontsize(fontData, updateCallback);
    };

    const updateDetails = (name, value) => {
        setFontData(data => {
            return {
                ...data,
                [name]: value
            };
        });
    };

    const notice = !isEmpty(noticeMessage) && <div className="gtb-notice">
        {noticeMessage}
    </div>;

    const params = { notice, fontData, setMode, updateDetails, loading, actionFontData: createFontData };
    return <ManageFontOption
        {...params}
        title={__('Add Font Size', 'gutenverse-themes-builder')}
        buttonText={__('Save Changes', 'gutenverse-themes-builder')}

    />;
};

const ManageFontSizes = () => {
    const [mode, setMode] = useState();
    const [fontList, setFontList] = useState([]);
    const [data, setData] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [paged,setPaged] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    let num_post = 10;

    const setEditFont = (data) => {
        setData(data);
        setMode('edit');
    };

    const updateFontList = (result) => {
        setFontList(result?.data.list);
        setTotalData(parseInt(result?.data.total_data));
        setTotalPage(parseInt(result?.total_page));
    };

    const removeFont = () => {
        return deleteFontsize({ id: deletePopup }, updateFontList);
    };

    useEffect(() => {
        getFontsizeList({
            paged,
            num_post
        },updateFontList);
    }, [paged]);

    let Content = null;

    switch (mode) {
        case 'edit':
            Content = <EditFont data={data} setMode={setMode} updateFontList={updateFontList} />;
            break;
        case 'create':
            Content = <CreateFont setMode={setMode} updateFontList={updateFontList} />;
            break;
        default:
            Content = <ContentWrapper
                title={__('Manage Core Fonts Size', 'gutenverse-themes-builder')}
                description={__('This is a place to manage all fonts for ONLY core blocks of your current active theme. For Gutenverse fonts, you can set it up directly in global styles extended.', 'gutenverse-themes-builder')}
                headingButton={true}
                headingButtons={[
                    {
                        buttonText: __('Add Font Size', 'gutenverse-themes-builder'),
                        buttonEvent: () => setMode('create'),
                        buttonIcon: <PlusIcon />,
                        buttonLoading: false,
                        buttonHide : totalData === 0
                    }
                ]}
            >
                <>
                    <Table 
                        heads={['ID', 'Slug', 'Title', 'Size', 'Actions',]}
                        length={fontList.length}
                        paged={paged}
                        setPaged={setPaged}
                        numPost={num_post}
                        totalData={totalData}
                        totalPage={totalPage}
                        emptyTitle = {__('You Haven’t Add Any Fonts Size Yet', 'gutenverse-themes-builder')} 
                        emptySubtitle = {__('Click \'Add Font Size\' to manage and customize the font Size for your theme.', 'gutenverse-themes-builder')}
                        showButton = {true}
                        buttons = {[
                            {
                                buttonElement : () => <div className="button create" onClick={() => setMode('create')}><PlusIcon fill={'white'}/> {__('Add Font Size', 'gutenverse-themes-builder')}</div>,
                                buttonLoading : false
                            }
                        ]}
                    >
                        <>
                            {!isEmpty(fontList) && fontList.map((font, key) => {
                                return <tr key={key}>
                                    <td>{font?.id}</td>
                                    <td>{font?.slug}</td>
                                    <td>{font?.title}</td>
                                    <td>{font?.size}</td>
                                    <td>
                                        <div className="actions">
                                            <a className="edit" onClick={() => setEditFont(font)}><EditIcon />{__('Edit', 'gutenverse-themes-builder')}</a>
                                            <a className="delete" onClick={() => setDeletePopup(font?.id)}><DeleteIcon />{__('Delete', 'gutenverse-themes-builder')}</a>
                                        </div>
                                    </td>
                                </tr>;
                            })}
                        </>
                    </Table>
                    {deletePopup && <WarningPopup
                        title={__('Are you sure want to delete this font?', 'gutenverse-themes-builder')}
                        detail={__('Please note, every element related to this font won\'t be working property after delete this aset.', 'gutenverse-themes-builder')}
                        onProceed={removeFont}
                        onClose={() => setDeletePopup(false)}
                    />}
                </>
            </ContentWrapper>;
    }

    return Content;
};

export default ManageFontSizes;
