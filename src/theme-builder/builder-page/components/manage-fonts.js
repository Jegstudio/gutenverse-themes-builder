import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { DeleteIcon, EditIcon } from '../data/icons';
import Table from './table';
import { isEmpty } from 'lodash';
import { createFont, deleteFont, getFontList, updateFont } from '../../../data/api-fetch';
import { ArrowLeft } from 'react-feather';
import SelectControl from '../controls/select-control';
import { WarningPopup } from './warning-popup';
import { FONT_FAMILIES } from '../data/default';
import ContentWrapper from './content-wrapper';
import { checkDetails } from '../data/helper';

const importantData = {
    family: true,
    style: true,
    weights: true,
};

const ManageFontOption = ({ title, fontData, setMode, updateDetails, loading, actionFontData, notice }) => {

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
            {loading ? <div className="saving-indicator">{__('Saving...', 'gtb')}</div> :
                <>
                    <SelectControl
                        id={'family'}
                        title={__('Font Family', 'gtb')}
                        value={fontData?.family}
                        options={FONT_FAMILIES}
                        onChange={value => updateDetails('family', value)}
                        important={true}
                    />
                    <SelectControl
                        id={'style'}
                        title={__('Font Style', 'gtb')}
                        value={fontData?.style}
                        isMulti={true}
                        options={[
                            {
                                value: 'normal',
                                label: 'Normal'
                            },
                            {
                                value: 'italic',
                                label: 'Italic'
                            }
                        ]}
                        onChange={value => updateDetails('style', value)}
                        important={true}
                    />
                    <SelectControl
                        id={'weights'}
                        title={__('Font Weight', 'gtb')}
                        value={fontData?.weights}
                        isMulti={true}
                        options={[
                            {
                                value: '100',
                                label: '100'
                            },
                            {
                                value: '200',
                                label: '200'
                            },
                            {
                                value: '300',
                                label: '300'
                            },
                            {
                                value: 'regular',
                                label: 'Regular'
                            },
                            {
                                value: '500',
                                label: '500'
                            },
                            {
                                value: '600',
                                label: '600'
                            },
                            {
                                value: '700',
                                label: '700'
                            },
                            {
                                value: '800',
                                label: '800'
                            },
                            {
                                value: '900',
                                label: '900'
                            },
                        ]}
                        onChange={value => updateDetails('weights', value)}
                        important={true}
                    />
                </>
            }
        </div>
        {!loading && <div className="data-footer">
            <div className="buttons inline"></div>
            <div className="buttons inline">
                <button className="button create" onClick={actionFontData}>{title}</button>
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
        updateFont(fontData, updateCallback);
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
        title={__('Edit Font Detail', 'gtb')}
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
        createFont(fontData, updateCallback);
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
        title={__('Create Font', 'gtb')}
    />;
};

const ManageFonts = () => {
    const [mode, setMode] = useState();
    const [fontList, setFontList] = useState([]);
    const [data, setData] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);

    const setEditFont = (data) => {
        setData(data);
        setMode('edit');
    };

    const updateFontList = (result) => {
        setFontList(result?.data);
    };

    const removeFont = () => {
        return deleteFont({ id: deletePopup }, updateFontList);
    };

    useEffect(() => {
        getFontList(updateFontList);
    }, []);

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
                title={__('Manage Core Fonts', 'gtb')}
                description={__('This is a place to manage all fonts for ONLY core blocks of your current active theme. For Gutenverse fonts, you can set it up directly in global styles extended.', 'gtb')}
                headingButton={true}
                headingButtonOnClick={() => setMode('create')}
            >
                <>
                    <Table heads={['ID', 'Font Family', 'Style', 'Weights', 'Actions',]}>
                        <>
                            {!isEmpty(fontList) && fontList.map((font, key) => {
                                return <tr key={key}>
                                    <td>{font?.id}</td>
                                    <td>{font?.family}</td>
                                    <td>{font?.style?.join(', ')}</td>
                                    <td>{font?.weights?.join(', ')}</td>
                                    <td>
                                        <div className="actions">
                                            <a className="edit" onClick={() => setEditFont(font)}><EditIcon />{__('Edit', 'gtb')}</a>
                                            <a className="delete" onClick={() => setDeletePopup(font?.id)}><DeleteIcon />{__('Delete', 'gtb')}</a>
                                        </div>
                                    </td>
                                </tr>;
                            })}
                        </>
                    </Table>
                    {deletePopup && <WarningPopup
                        title={__('Are you sure want to delete this font?', 'gtb')}
                        detail={__('Please note, every element related to this font won\'t be working property after delete this aset.', 'gtb')}
                        onProceed={removeFont}
                        onClose={() => setDeletePopup(false)}
                    />}
                </>
            </ContentWrapper>;
    }

    return Content;
};

export default ManageFonts;
