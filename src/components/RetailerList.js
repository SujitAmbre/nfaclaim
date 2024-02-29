import React, { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import TableLoader from "./TableLoader";
import TablePagination from "./TablePagination";
import TableShimmer from "./TableShimmer";
import GlobalModal2 from "./GloablModal2";
import { useDispatch, useSelector } from "react-redux";
import { pushToAddOrEdit } from "../redux/masterDataSlice";
import { fetchListing, fetchRetailerListing, setOrder, setOrderBy, setPage, setSearchQuery } from "../redux/listingSlice";
import SortArrows from "./SortArrows";

const RetailerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    listing,
    searchQuery,
    isLoading,
    page,
    perPage,
    total,
    serverErr,
    from,
    to,
    totalRecords,
    order,
    orderBy,
  } = useSelector((store) => store.listing.retailerListing);
  
  useEffect(() => {
    getListing();
  }, [page, searchQuery, order, orderBy]);

  const handlePageChange = useCallback((page) => {
    dispatch(setPage({listingType: 'retailerListing', page: page}));
  }, []);

  const handleSearchQueryChange = (searchTerm) => {
    dispatch(setPage({listingType: 'retailerListing', page: 1}));
    dispatch(setSearchQuery({listingType: 'retailerListing', searchTerm: searchTerm}));
  };

  const getListing = () => {
    const url = `/api/retailer/list?search=${searchQuery}&page=${page}&pagesize=${perPage}&orderby=${orderBy}&order=${order}`;
    dispatch(fetchRetailerListing(url));
  };

  const handleAddorEdit = (item = {}) => {
    let url = "/api/retailer/store";
    let popupTitle = "Add Retailer";
    let itemType = "addRetailerForm";
    if (item.id) {
      url = "/api/retailer/update/" + item.id;
      popupTitle = "Edit Retailer";
      itemType = "editRetailerForm";
    } else {
      item = {
        name: "",
        retailer_name: "",
        email: "",
        password: "",
        status: "0",
      };
    }
    console.log(item);
    const buildObject = {
      itemType,
      actionUrl: url,
      method: "post",
      popupStatus: true,
      popupTitle,
      itemToModify: item,
    };

    dispatch(pushToAddOrEdit(buildObject));
  };

  const handleOrderAndOrderBy = useCallback((column, order) => {
    dispatch(setOrderBy({ listingType: "retailerListing", orderBy: column }));
    dispatch(setOrder({ listingType: "retailerListing", order: order }));
  });

  return (
    <div className="wrapper">
      <GlobalModal2 updateList={getListing} />
      <div className="container">
        {/* Header start here */}
        <Header />
        {/* Header end here */}
        <div className="inner_wrap">
          {/* Table section start here */}
          <section className="recent_activity_tbl_wrap main_pg_sec">
            <div className="row">
              <div className="col-lg-6 col-xl-4 col-md-6 col-xs-12 d-flex align-items-center search_item">
                <form>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    name="Search"
                    placeholder="Find a Retailer"
                    onChange={(e) => {
                      handleSearchQueryChange(e.target.value);
                    }}
                    onBlur={(e) => {
                      handleSearchQueryChange(e.target.value);
                    }}
                  />
                </form>
              </div>
              <div className="col-lg-6 col-xl-5 col-md-6 col-xs-12 d-flex align-items-center justify-content-end">
                <div className="btn-grp d-flex align-items-center">
                  {/* <button className="btn btn_secondary">
                    <i className="fa-solid fa-gears"></i> RUN REPORT
                  </button> */}
                  <Link
                    to={"#"}
                    onClick={handleAddorEdit}
                    className="btn main_btn"
                  >
                    Add Retailer
                  </Link>
                </div>
              </div>
            </div>
            <div className="table_main_wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID <SortArrows
                          column={"id"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        /></th>
                    <th>Retailer Name <SortArrows
                          column={"retailer_name"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        /></th>
                    <th>Status</th>
                    <th>Added Date <SortArrows
                          column={"created_at"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        /></th>
                    <th>Updated Date <SortArrows
                          column={"updated_at"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        /></th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <TableShimmer rowCount={perPage} columnCount={6} columns={['ID', 'Retailer Name', 'Status', 'Added Date', 'Updated Date', 'Actions']}/>
                  ) : listing.length === 0 ? (
                    <TableLoader
                      columnCount={6}
                      loadingText={"Data not found"}
                    />
                  ) : (
                    listing.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.retailer_name}</td>
                          <td>
                            {parseInt(item.status) === 1
                              ? "active"
                              : "disabled"}
                          </td>
                          <td>{item.created_at}</td>
                          <td>{item.updated_at}</td>
                          <td>
                            <Link
                              to={"#"}
                              onClick={() => {
                                handleAddorEdit(item);
                              }}
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            {total > 1 && (
              <TablePagination
                current={page}
                total={total}
                onPageChange={handlePageChange}
                from={from}
                to={to}
                totalRecords={totalRecords}
              />
            )}
            <Footer />
          </section>
          {/* Table section end here */}
        </div>
      </div>
    </div>
  );
};

export default RetailerList;
