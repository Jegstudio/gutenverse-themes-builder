import { useRef, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Table = (props) => {
    const { 
        heads,
        children, 
        length, 
        paged, 
        totalPage, 
        setPaged,
        totalData,
        emptyTitle = __('No Data Found', 'gutenverse-themes-builder'), 
        emptySubtitle = __('Please Create a Data', 'gutenverse-themes-builder'),
        showButton = false,
        buttons
    } = props;

    /**Delete when done */
    useEffect(() => {
        console.log(paged);
        console.log(paged, totalPage)
    },[paged])

    const ButtonElement = () => {
        return buttons.map(button => {
            let ElButton = button.buttonElement;
            return button.buttonLoading ? <div className="button button-loading" disabled>Loading... </div> :
                <ElButton/>
        })
    }
    return <>
        {
            length === 0 ? <div className='table empty'>
                <div className='empty-content'>
                    <h3>{emptyTitle}</h3>
                    <p>{emptySubtitle}</p>
                    {
                        showButton && <div className='buttons'><ButtonElement/></div>
                    }
                </div>
            </div> : <table className="table">
                <tr className="head">
                    {heads.map((head, i) => <th key={i}>{head}</th>)}
                </tr>
                {children}
                <tr className="footer">
                    <td  className="footer-content" colSpan={heads.length}>
                        <div className="footer-wrap"> 
                            <div>{totalData} results</div>
                            <div className="navigation">
                                <div className={`${paged === 1 ? '' : 'active'}`} onClick={() => paged > 1 && setPaged(paged - 1)}>Prev</div>
                                <div className={`${parseInt(paged) === parseInt(totalPage) || totalPage === 0 ? '' : 'active'}`} onClick={() => parseInt(paged) < parseInt(totalPage) && setPaged(paged + 1)}>Next</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        }
    </>
};

export default Table;