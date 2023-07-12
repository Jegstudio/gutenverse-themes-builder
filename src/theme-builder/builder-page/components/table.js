const Table = (props) => {
    const { heads, children } = props;
    return (
        <table className="table">
            <tr className="head">
                {heads.map((head, i) => <th key={i}>{head}</th>)}
            </tr>
            {children}
        </table>
    );
};

export default Table;