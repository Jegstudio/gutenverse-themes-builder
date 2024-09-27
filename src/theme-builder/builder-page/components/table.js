const Table = (props) => {
    const { heads, children, length, paged, totalPage, setPaged } = props;

    return (
        <table className="table">
            <tr className="head">
                {heads.map((head, i) => <th key={i}>{head}</th>)}
            </tr>
            {children}
            <tr className="footer">
                <td className="footer-content" colSpan={heads.length}>
                    <div>{length} results</div>
                    <div className="navigation">
                        <div className={`${paged === 1 ? '' : 'active'}`} onClick={() => paged > 1 && setPaged(paged - 1)}>Prev</div>
                        <div className={`${paged === totalPage ? '' : 'active'}`} onClick={() => paged < totalPage && setPaged(paged + 1)}>Next</div>
                    </div>
                </td>
            </tr>
        </table>
    );
};

export default Table;