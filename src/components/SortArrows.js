const SortArrows = ({column, currentField, currentOrder, handleOrderAndOrderBy}) => {
    return (
        <>
        {
            currentField+currentOrder === `${column}asc`
            ? <i className="bi bi-caret-up-fill"></i>
            : <i className="bi bi-caret-up" onClick={()=>{ handleOrderAndOrderBy(column, 'asc') }}></i>
        }
        {" "}
        {
            currentField+currentOrder === `${column}desc`
            ? <i className="bi bi-caret-down-fill"></i>
            : <i className="bi bi-caret-down" onClick={()=>{ handleOrderAndOrderBy(column, 'desc') }}></i>
        }
        
        </>
    );
}

export default SortArrows;