import React from "react";
const TableLoader = ({columnCount, loadingText}) => {
    return(
        <tr className="loader-tr"><td colSpan={columnCount}>{loadingText}</td></tr>
    );
}

export default TableLoader;