import { useRef, useState, useEffect } from '@wordpress/element';

const Table = (props) => {
    const { heads, children, length, paged, totalPage, setPaged, numPost, totalData } = props;
    const tdRef = useRef(null);
    const [tdHeight, setTdHeight] = useState(0);
    useEffect(() => {
        if(length < numPost){
            const tdElement = tdRef.current;
    
            if (!tdElement) return;
        
            const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { height } = entry.contentRect;
                setTdHeight(height); // Update state when height changes
            }
            });
        
            observer.observe(tdElement); // Start observing
        
            return () => {
            observer.disconnect(); // Clean up when component unmounts
            };
        }
      }, []);

    return (
        <table className="table">
            <tr className="head">
                {heads.map((head, i) => <th key={i}>{head}</th>)}
            </tr>
            {children}
            {
                length < numPost && <tr><td colSpan={heads.length} style={{height: tdHeight * (numPost - length)}}></td></tr>
            }
            <tr ref={tdRef} className="footer">
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