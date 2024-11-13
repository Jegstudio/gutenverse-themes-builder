import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withCopyElementToolbar, withCustomStyle } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';
import { parse } from '@wordpress/blocks';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { debounce, isEmpty } from 'lodash';
import { BlockControls, BlockPreview } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { ArrowLeft } from 'react-feather';
import { CreatePatternIcon, UsePatternIcon } from '../block-icons';
import { IconSearchSVG } from 'gutenverse-core/icons';

const PatternWrapper = ({ blockProps }) => {
    return (
        <div {...blockProps}>
            <InnerBlocks
                renderAppender={InnerBlocks.ButtonBlockAppender}
            />
        </div>
    );
};

const insertBlocksTemplate = (data, clientId) => {
    return new Promise((resolve) => {
        const { replaceInnerBlocks } = dispatch('core/block-editor');
        const blocks = parse(data);
        replaceInnerBlocks(clientId, blocks);
        resolve();
    });
};

const fetchPattern = ({
    data,
    setAttributes,
    clientId
}) => {
    const { value } = data;

    setAttributes({
        pattern: data
    });

    return apiFetch({
        path: '/gtb-backend/v1/pattern',
        method: 'POST',
        data: {
            slug: value
        }
    }).then(result => {
        if (result) {
            insertBlocksTemplate(result, clientId);
        } else {
            return null;
        }
    });
};

const PatternPreview = ({ setAttributes, clientId, patterns }) => {
    const changeOption = (data) => {
        fetchPattern({
            data,
            setAttributes,
            clientId
        });
    };
    return !isEmpty(patterns) &&
        <div className="pattern-collection">
            <div className="masonry-content">
                {patterns.map((pattern, key) => {
                    console.log(pattern.content)
                    return key % 2 === 0 && <div key={key} className="pattern-frame" onClick={() => changeOption(pattern)}>
                        <BlockPreview blocks={parse(pattern.content)} />
                        <span className="title">{pattern.label}</span>
                    </div>;
                })}
            </div>
            <div className="masonry-content">
                {patterns.map((pattern, key) => {
                    return key % 2 === 1 && <div key={key} className="pattern-frame" onClick={() => changeOption(pattern)}>
                        <BlockPreview blocks={parse(pattern.content)} />
                        <span className="title">{pattern.label}</span>
                    </div>;
                })}
            </div>
            <div className="masonry-content">
                {patterns.map((pattern, key) => {
                    return key % 2 === 2 && <div key={key} className="pattern-frame" onClick={() => changeOption(pattern)}>
                        <BlockPreview blocks={parse(pattern.content)} />
                        <span className="title">{pattern.label}</span>
                    </div>;
                })}
            </div>
        </div>;
};

const searchForms = (params, callback) => {
    apiFetch({
        path: '/gtb-backend/v1/pattern/search',
        method: 'POST',
        data: {
            ...params
        }
    }).then(response => {
        callback(response);
    }).catch(() => { });
};

const PatternInput = ({ search, setSearch, paged, setMode, setPatterns, setTotal }) => {
    const debounceSearch = useCallback(
        debounce(search => {
            searchForms({
                ...search,
                paged
            }, (result) => {
                setPatterns(result?.list);
                setTotal(result?.total);
            });
        }, 500),
        []
    );

    useEffect(() => {
        debounceSearch(search, setPatterns);
    }, [search]);

    return <>
        <div className="buttons bottom">
            <div onClick={() => setMode('')} className="back-button"><ArrowLeft size={14} />{__('Back', 'gutenverse-themes-builder')}</div>
        </div>
        <div className="search-wrapper">
            {
                isEmpty(search.search) && <div className="search-placeholder">
                    <span>{__('Search Pattern', 'gutenverse-themes-builder')}</span>
                    <IconSearchSVG/>
                </div>
            }
            <input type="text" className="pattern-input" value={search.search} onChange={e => {
                setSearch({
                    ...search,
                    search: e.target.value
                });
            }} />
        </div>
        <div className="categories">
            <div className={`category ${search?.category === 'core' ? 'active' : ''}`} onClick={() => setSearch({ ...search, category: 'core' })}>{__('Core Patterns', 'gutenverse-themes-builder')}</div>
            <div className={`category ${search?.category === 'gutenverse' ? 'active' : ''}`} onClick={() => setSearch({ ...search, category: 'gutenverse' })}>{__('Gutenverse Patterns', 'gutenverse-themes-builder')}</div>
            <div className={`category ${search?.category === 'pro' ? 'active' : ''}`} onClick={() => setSearch({ ...search, category: 'pro' })}>{__('Gutenverse PRO Patterns', 'gutenverse-themes-builder')}</div>
        </div>
    </>;
};

const Pagination = ({ total, paged, setPaged }) => {
    return total > 1 && <ul className="pagination">
        <li key={'prev'} className={` prev ${paged > 1 ? 'active' : ''}`} onClick={() => setPaged(paged - 1)}>{__('Prev', 'gutenverse-themes-builder')}</li>
        <li className={`${1 === paged ? 'active' : ''}`} onClick={() => setPaged(1)}>{1}</li>
        {paged > 3 && total > 5 && <div className="space">...</div>}
        {[...Array(total).keys()].map(key => {
            const current = key + 1;
            if (total <= 5) {
                return current !== 1 && current !== total && <li key={current} className={`${current === paged ? 'active' : ''}`} onClick={() => setPaged(current)}>{current}</li>;
            }

            if (paged === 1 && current === paged + 1) {
                return <>
                    {current !== total && <li key={current} className={`${current === paged ? 'active' : ''}`} onClick={() => setPaged(current)}>{current}</li>}
                    {current + 1 !== total && <li key={current + 1} className={`${current + 1 === paged ? 'active' : ''}`} onClick={() => setPaged(current + 1)}>{current + 1}</li>}
                </>;
            }

            if (paged > 1 && paged < total && current === paged) {
                return <>
                    {current - 1 !== 1 && <li key={current - 1} className={`${current - 1 === paged ? 'active' : ''}`} onClick={() => setPaged(current - 1)}>{current - 1}</li>}
                    <li key={current} className={`${current === paged ? 'active' : ''}`} onClick={() => setPaged(current)}>{current}</li>
                    {current + 1 !== total && <li key={current + 1} className={`${current + 1 === paged ? 'active' : ''}`} onClick={() => setPaged(current + 1)}>{current + 1}</li>}
                </>;
            }

            if (paged === total && current === paged - 1) {
                return <>
                    {current - 1 !== 1 && <li key={current - 1} className={`${current - 1 === paged ? 'active' : ''}`} onClick={() => setPaged(current - 1)}>{current - 1}</li>}
                    {current !== 1 && <li key={current} className={`${current === paged ? 'active' : ''}`} onClick={() => setPaged(current)}>{current}</li>}
                </>;
            }
        })}
        {paged < total - 2 && total > 5 && <div className="space">...</div>}
        {total > 1 && <li className={`${total === paged ? 'active' : ''}`} onClick={() => setPaged(total)}>{total}</li>}
        <li key={'next'} className={` next ${paged < total ? 'active' : ''}`} onClick={() => setPaged(paged + 1)}>{__('Next', 'gutenverse-themes-builder')}</li>
    </ul>;
};

const UsePattern = ({ setAttributes, setMode, clientId }) => {
    const [search, setSearch] = useState({
        search: '',
        category: 'core'
    });
    const [patterns, setPatterns] = useState([]);
    const [paged, setPaged] = useState(1);
    const [total, setTotal] = useState(null);
    const patternPreview = useMemo(() => <PatternPreview setAttributes={setAttributes} clientId={clientId} patterns={patterns} />, [clientId, patterns]);

    useEffect(() => {
        searchForms({
            ...search,
            paged
        }, (result) => {
            setPatterns(result?.list);
            setTotal(result?.total);
        });
    }, [paged]);

    return <div className="pattern-container">
        <h2>{__('Use Pattern', 'gutenverse-themes-builder')}</h2>
        <div className="pattern-content searcher">
            <PatternInput paged={paged} search={search} setSearch={setSearch} setMode={setMode} setPatterns={setPatterns} setTotal={setTotal} />
            {patternPreview}
            <Pagination total={total} paged={paged} setPaged={setPaged} />
        </div>
    </div>;
};

const CreatePattern = ({ setAttributes, clientId, setMode }) => {
    const [loading, setLoading] = useState(false);
    const [patternName, setPatternName] = useState('');
    const [patternSlug, setPatternSlug] = useState('');
    const [patternCategory, setPatternCategory] = useState('core');
    const [patternSync, setPatternSync] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState('');
    const { replaceInnerBlocks } = dispatch('core/block-editor');

    const patternSubmit = () => {
        if (patternName !== '' && patternSlug !== '') {
            setLoading(true);

            apiFetch({
                path: '/gtb-backend/v1/pattern/create',
                method: 'POST',
                data: {
                    name: patternName,
                    slug: patternSlug,
                    category: patternCategory,
                    sync: patternSync
                }
            }).then(result => {
                const { status, data } = result;

                if ('success' === status) {
                    replaceInnerBlocks(clientId, []);
                    setMode('use');
                    setAttributes({
                        pattern: {
                            label: patternName,
                            value: patternSlug
                        }
                    });
                } else {
                    const { message } = data;
                    setNoticeMessage(message);
                }

                setLoading(false);
            });
        }
    };

    if (loading) {
        return <div className="pattern-container">
            {__('Loading', 'gutenverse-themes-builder')}
        </div>;
    } else {
        return <div className="pattern-container">
            
            <div className="pattern-content create">
                <h2>{__('Create Pattern')}</h2>
                {!isEmpty(noticeMessage) && <div className="pattern-notice">
                    {noticeMessage}
                </div>}
                <div className="input-wrap pattern-slug">
                    <label>{__('Pattern Slug', 'gutenverse-themes-builder')}</label>
                    <input type="text" value={patternSlug} onChange={e => setPatternSlug(e.target.value)} />
                </div>
                <div className="input-wrap pattern-name">
                    <label>{__('Pattern Name', 'gutenverse-themes-builder')}</label>
                    <input type="text" value={patternName} onChange={e => setPatternName(e.target.value)} />
                </div>
                <div className="input-wrap pattern-category">
                    <label>{__('Pattern Category', 'gutenverse-themes-builder')}</label>
                    <select onChange={e => setPatternCategory(e.target.value)}>
                        <option value="core">{__('Core', 'gutenverse-themes-builder')}</option>
                        <option value="gutenverse">{__('Gutenverse', 'gutenverse-themes-builder')}</option>
                        <option value="pro">{__('Pro', 'gutenverse-themes-builder')}</option>
                    </select>
                </div>
                <div className="input-wrap pattern-sync control-checkbox">
                    <label>{__('Export as Pattern Sync', 'gutenverse-themes-builder')}</label>
                    <div className="select-inner">
                        <input
                            type="checkbox"
                            checked={patternSync}
                            hidden
                        />
                        <span className="switch" onClick={() => setPatternSync(!patternSync)}/><br/><br/>
                        <p className="description">{__('Sync pattern when exported. Used for categorizing exported patterns.', 'gutenverse-themes-builder')}</p>
                    </div>
                </div>
                <div className="buttons end top">
                    <div className="back-button" onClick={() => setMode('')}>
                        <ArrowLeft size={14} />
                        {__('Back', 'gutenverse-themes-builder')}
                    </div>
                    <div className="pattern-button">
                        <input type="submit" onClick={patternSubmit} />
                    </div>
                </div>
            </div>
        </div>;
    }
};

const EmptyMode = ({ mode, setMode, setAttributes, clientId, blockProps }) => {
    if ('use' === mode) {
        return <div className="pattern-wrapper" {...blockProps}>
            <UsePattern
                mode={mode}
                setMode={setMode}
                setAttributes={setAttributes}
                clientId={clientId}
            />
        </div>;
    } else if ('create' === mode) {
        return <div className="pattern-wrapper" {...blockProps}>
            <CreatePattern
                mode={mode}
                setMode={setMode}
                setAttributes={setAttributes}
                clientId={clientId}
            />
        </div>;
    } else {
        return <div className="pattern-wrapper" {...blockProps}>
            <div className="pattern-container">
                <h2>{__('Pattern Creation Mode', 'gutenverse-themes-builder')}</h2>
                <div className="pattern-content choose-mode">
                    <div className="selection" onClick={() => setMode('use')}>
                        <div className="icon"><UsePatternIcon /></div>
                        <h3>{__('Use Saved Pattern', 'gutenverse-themes-builder')}</h3>
                        <span>{__('Choose an existing pattern', 'gutenverse-themes-builder')}</span>
                    </div>
                    <div className="selection" onClick={() => setMode('create')}>
                        <div className="icon"><CreatePatternIcon /></div>
                        <h3>{__('Create Pattern', 'gutenverse-themes-builder')}</h3>
                        <span>{__('Create a new pattern', 'gutenverse-themes-builder')}</span>
                    </div>
                </div>
            </div>
        </div>;
    }
};

const PatternWrapperBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
)(props => {
    const {
        clientId,
        attributes,
        setAttributes,
    } = props;

    const {
        mode,
        pattern
    } = attributes;

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-pattern-wrapper',
            'no-margin',
        ),
    });

    const setMode = mode => {
        setAttributes({
            mode
        });
    };

    useEffect(() => {
        if (pattern) {
            fetchPattern({
                data: pattern,
                setAttributes,
                clientId
            });
        }
    }, []);

    let Component = PatternWrapper;

    if (mode === '') {
        Component = EmptyMode;
    } else if (mode === 'use') {
        if (isEmpty(pattern)) {
            Component = EmptyMode;
        } else {
            Component = PatternWrapper;
        }
    } else if (mode === 'create') {
        Component = EmptyMode;
    }

    return <>
        <PanelController panelList={panelList} {...props} />
        {pattern !== null && <BlockControls>
            <ToolbarGroup>
                <div className="pattern-board">
                    <input className="pattern-name" value={pattern.label} readOnly={true} type={'text'} />
                </div>
            </ToolbarGroup>
        </BlockControls>}
        <Component
            mode={mode}
            setMode={setMode}
            blockProps={blockProps}
            attributes={attributes}
            clientId={clientId}
            setAttributes={setAttributes}
        />
    </>;
});

export default PatternWrapperBlock;