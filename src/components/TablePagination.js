import React from 'react';
import {Pagination} from 'react-bootstrap';

const TablePagination = ({total, current, onPageChange, from, to, totalRecords}) => {
    let items = [];
    if(current > 1) {
        items.push(<Pagination.Prev key="prev" onClick={() => {onPageChange(current-1)}} />);
    }

    for(let page=1; page <= total; page++) {
        items.push( <Pagination.Item key={page} data-page={page} active={page === current} onClick={() => {onPageChange(page)}}>{page}</Pagination.Item>  )
    }

    if(current < total) {
        items.push(<Pagination.Next key="next" onClick={() => { onPageChange(current+1) }} />)
    }
    return (
        <div className='container p-2 table-pagination'>
        <div className='pagination-inner-container'>
            <p>Showing {from} to {to} of {totalRecords} entries.</p>
        </div>
        <div className='pagination-inner-container'>
            <Pagination>
                {items}
            </Pagination>  
        </div>
        </div>  
    );
}

export default TablePagination;