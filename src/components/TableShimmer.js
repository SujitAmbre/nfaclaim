const TableShimmer = ({rowCount, columnCount, columns}) => {
  return (
    <>
    {
        [...Array(rowCount)].map((item, key) => {
            return(
                <tr className="table-row-shimmer" key={`shimmer-${key}`}>
                    { 
                    columns && columns.length > 0 
                    ? columns.map((innerItem, innerKey) => {
                        return <td key={`shimmer-td-${innerKey}`}><label>{innerItem}</label></td>;
                    })
                    : [...Array(columnCount)].map((innerItem, innerKey) => {
                        // if(innerKey == 0) {
                        //     return <td key={`shimmer-td-${innerKey}`}><label>{innerKey}</label></td>;
                        // }
                        return <td key={`shimmer-td-${innerKey}`}><label>lorem ipsum</label></td>;
                    })}
                </tr>
            )
        })
    }
    
    </>
    
  );
};

export default TableShimmer;
