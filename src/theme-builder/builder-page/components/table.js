import { useRef, useState, useEffect } from '@wordpress/element';

const Table = (props) => {
    const { heads, children, length, paged, totalPage, setPaged, numPost, totalData } = props;

    return (
        <table className="table">
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
                            <div className={`${parseInt(paged) === parseInt(totalPage) ? '' : 'active'}`} onClick={() => parseInt(paged) < parseInt(totalPage) && setPaged(paged + 1)}>Next</div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    );
};

export default Table;