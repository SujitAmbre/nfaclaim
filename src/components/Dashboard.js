import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import TableShimmer from "./TableShimmer";
import TableLoader from "./TableLoader";
import TablePagination from "./TablePagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClaimListing,
  fetchListing,
  setFromDate,
  setManufacturer,
  setOrder,
  setOrderBy,
  setPage,
  setProductType,
  setSearchQuery,
  setToDate,
} from "../redux/listingSlice";
import DashboardPieChartCard from "./DashboardPieChartCard";
import { withTokenGetAPI, withTokenPostAPI } from "../utils/service";
import { getTodayDate } from "../utils/helper";
import SortArrows from "./SortArrows";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(localStorage.getItem("_nfa_role"));
  const [toggleAdvanceFilter, setToggleAdvanceFilter] = useState(false);
  const [today, setToday] = useState(getTodayDate);
  const [manufacturerList, setManufacturerList] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);

  // const claimList = useSelector((store) => store.listing.listing);
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
    fromDate,
    toDate,
    manufacturer,
    productType,
    order,
    orderBy,
  } = useSelector((store) => store.listing.claimListing);
  // const [dataInCSV, setDataInCSV] = useState("");

  useEffect(() => {
    getListing();
  }, [page, searchQuery, order, orderBy, manufacturer, productType]);

  useEffect(() => {
    if (fromDate === "" || toDate === "") {
      return;
    }
    getListing();
  }, [fromDate, toDate]);

  useEffect(() => {
    getManufacturerList();
    getProductTypeList();
  }, []);

  const handlePageChange = useCallback((page) => {
    dispatch(setPage({ listingType: "claimListing", page: page }));
  }, []);

  const handleSearchQueryChange = (searchTerm) => {
    dispatch(setPage({ listingType: "claimListing", page: 1 }));
    dispatch(
      setSearchQuery({ listingType: "claimListing", searchTerm: searchTerm })
    );
  };

  const handleAdvanceFilterChange = (field, value) => {
    dispatch(setPage({ listingType: "claimListing", page: 1 }));
    if (field === "fromDate") {
      dispatch(setFromDate({ listingType: "claimListing", fromDate: value }));
    } else if(field === "toDate") {
      dispatch(setToDate({ listingType: "claimListing", toDate: value }));
    } else if(field === "manufacturer") {
      dispatch(setManufacturer({ listingType: "claimListing", manufacturer: value }));
    } else if(field === "productType") {
      dispatch(setProductType({ listingType: "claimListing", productType: value }));
    } else {
      // do nothing
    }
  };

  const handleAdvanceFilterToggle = () => {
    setToggleAdvanceFilter(!toggleAdvanceFilter);
  };

  const handleOrderAndOrderBy = useCallback((column, order) => {
    dispatch(setOrderBy({ listingType: "claimListing", orderBy: column }));
    dispatch(setOrder({ listingType: "claimListing", order: order }));
  });

  const getListing = () => {
    let url = `/api/claim/list?search=${searchQuery}&page=${page}&pagesize=${perPage}`;
    if (fromDate !== "" && toDate !== "") {
      url += `&fromdate=${fromDate}&todate=${toDate}`;
    }
    if(manufacturer !== "") {
      url += `&manufacturer=${manufacturer}`;
    }
    if(productType !== "") {
      url += `&product_type=${productType}`;
    }
    url += `&orderby=${orderBy}&order=${order}`;
    dispatch(fetchClaimListing(url));
  };

  const getManufacturerList = async () => {
    const url = `/api/manufacturer/list?pagesize=1000`;
    const manList = await withTokenGetAPI(url);
    const { code, message, data } = manList;
    if (code !== 200) {
      console.log(message);
    }

    setManufacturerList(data?.data);
  };

  const getProductTypeList = async () => {
    const url = `/api/producttypes/list?pagesize=1000`;
    const manList = await withTokenGetAPI(url);
    const { code, message, data } = manList;
    if (code !== 200) {
      console.log(message);
    }

    setProductTypeList(data?.data);
  };

  const resetAllFilters = () => {
    dispatch(setFromDate({ listingType: "claimListing", fromDate: "" }));
    dispatch(setToDate({ listingType: "claimListing", toDate: "" }));
    dispatch(setManufacturer({ listingType: "claimListing", manufacturer: "" }));
    dispatch(setProductType({ listingType: "claimListing", productType: "" }));
    dispatch(setSearchQuery({ listingType: "claimListing", searchTerm: "" }));
    dispatch(setPage({ listingType: "claimListing", page: 1 }));
    setToggleAdvanceFilter(false);
  }

  const downloadReport = async () => {
    let url = `/api/exportclaims?search=${searchQuery}`;
    if (fromDate !== "" && toDate !== "") {
      url += `&fromdate=${fromDate}&todate=${toDate}`;
    }
    if(manufacturer !== "") {
      url += `&manufacturer=${manufacturer}`;
    }
    if(productType !== "") {
      url += `&product_type=${productType}`;
    }
    url += `&orderby=${orderBy}&order=${order}`;
    const exportList = await withTokenGetAPI(url);

    if (exportList) {
      const fileName = "claim_list.csv";
      const link = document.createElement("a");
      link.setAttribute(
        "href",
        `data:text/csv;charset=utf-8,${escape(exportList)}`
      );
      link.setAttribute("download", fileName || "data.json");
      link.style.display = "none";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }
  };
  
  return (
    <>
      <div className="wrapper">
        <div className="container">
          {/* Header start here */}
          <Header />
          {/* Header end here */}
          {/* Accordion section start here */}
          <section className="accordion_wrapper">
            <div className="row align-items-stretch">
              <DashboardPieChartCard
                id={1}
                chartType={"PieChart"}
                apiEndName={"claimsByManufacturer"}
                headerLabel={"Manufacture Claims"}
                type={"manufacturer"}
                enableSlices={false}
                format={"percent"}
              />
              <DashboardPieChartCard
                id={2}
                chartType={"PieChart"}
                apiEndName={"claimsByProductType"}
                headerLabel={"Product Claims"}
                type={"product"}
                enableSlices={false}
                format={"percent"}
              />
              <DashboardPieChartCard
                id={3}
                chartType={"PieChart"}
                apiEndName={"claimsByAmount"}
                headerLabel={"Claim Amount"}
                type={"amount"}
                enableSlices={true}
                format={"currency"}
              />
            </div>
          </section>
          {/* Accordion section end here */}
          <div className="inner_wrap">
            {/* Table section start here */}
            <section className="recent_activity_tbl_wrap main_pg_sec">
              <div className="row">
                <div className="col-lg-4 col-xl-3 d-flex align-items-center">
                  <h2 className="table_head">Recent Activity</h2>
                </div>
                <div className="col-lg-4 col-xl-3 d-flex align-items-center search_item">
                  <form>
                    <i className="bi bi-search"></i>
                    <input
                      type="text"
                      name="search"
                      placeholder="Find a Claim"
                      autoComplete="off"
                      value={searchQuery}
                      onChange={(e) => {
                        handleSearchQueryChange(e.target.value);
                      }}
                      onBlur={(e) => {
                        handleSearchQueryChange(e.target.value);
                      }}
                    />
                  </form>
                </div>

                <div className="col-lg-12 col-xl-6 d-flex align-items-center buttonCol">
                  <div className="btn-grp  d-flex align-items-center ">
                    <button
                      className="btn btn_secondary"
                      onClick={downloadReport}
                    > RUN REPORT
                    </button>
                    {userRole === "admin" || (
                      <Link
                        to="/create-claim"
                        className="btn main_btn createClaim"
                      >
                        Create a custom claim
                      </Link>
                    )}
                    <button
                      className="btn btn_secondary advancedFilter"
                      onClick={handleAdvanceFilterToggle}
                    >
                      ADVANCE FILTER
                    </button>
                  </div>
                </div>
              </div>
              {toggleAdvanceFilter ? (
                <div className={`row advanceFilterCol showAdvanceFilter`}>
                  <div className="col-lg-3 d-md-none"></div>
                  <div className="col-xl-2 col-lg-3 col-md-3">
                    <label htmlFor="filter_by_manufacturer">
                      Filter by Manufacturer:{" "}
                    </label>
                    <select
                      className="form-control filterByDdl"
                      name="filter_by_manufacturer"
                      id="filter_by_manufacturer"
                      value={manufacturer}
                      onChange={(e) => {
                        handleAdvanceFilterChange("manufacturer", e.target.value);
                      }}
                    >
                      <option value="" key={"manufacuturer0"}>
                        Choose Manufacturer
                      </option>
                      {manufacturerList.length > 0 &&
                        manufacturerList.map((item, key) => {
                          return (
                            <option
                              value={item.id}
                              key={item.id + item.manufacturer_name}
                            >
                              {item.manufacturer_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-3">
                    <label htmlFor="filter_by_product_type">
                      Filter by Product Type:{" "}
                    </label>
                    <select
                      className="form-control filterByDdl"
                      name="filter_by_product_type"
                      id="filter_by_product_type"
                      value={productType}
                      onChange={(e) => {
                        handleAdvanceFilterChange("productType", e.target.value);
                      }}
                    >
                      <option value="" key={"producttype0"}>
                        Choose Product Type
                      </option>
                      {productTypeList.length > 0 &&
                        productTypeList.map((item, key) => {
                          return (
                            <option
                              value={item.id}
                              key={item.id + item.product_type_name}
                            >
                              {item.product_type_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-3">
                    <label> From Date: </label>
                    <input
                      type="date"
                      className="form-control"
                      max={today}
                      value={fromDate}
                      onChange={(e) => {
                        handleAdvanceFilterChange("fromDate", e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-3">
                    <label>To Date: </label>
                    <input
                      type="date"
                      className="form-control"
                      min={fromDate}
                      value={toDate}
                      onChange={(e) => {
                        handleAdvanceFilterChange("toDate", e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 reset-filter">
                  <button
                      className="btn btn_secondary"
                      onClick={resetAllFilters}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="table_main_wrap dashboardTable">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="dateColumn">
                        DATE{" "}
                        <SortArrows
                          column={"date"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        />
                      </th>
                      <th>
                        CLAIM NUMBER{" "}
                        <SortArrows
                          column={"claim_number"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        />
                      </th>
                      <th>MEMBER NAME</th>
                      <th>STORE LOCATION</th>
                      <th>
                        MANUFACTURER{" "}
                        <SortArrows
                          column={"manufacturer"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        />
                      </th>
                      <th>
                        PRODUCT TYPE{" "}
                        <SortArrows
                          column={"producttype"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        />
                      </th>
                      <th className="desc_th">DESCRIPTION</th>
                      <th>
                        QTY{" "}
                        <SortArrows
                          column={"quantity"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        />
                      </th>
                      <th>
                        PRICE{" "}
                        <SortArrows
                          column={"price"}
                          currentField={orderBy}
                          currentOrder={order}
                          handleOrderAndOrderBy={handleOrderAndOrderBy}
                        />
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <TableShimmer rowCount={perPage} columnCount={10} columns={['DATE', 'CLAIM NUMBER', 'MEMBER NAME', 'STORE LOCATION', 'MANUFACTURER', 'PRODUCT TYPE', 'DESCRIPTION', 'QTY', 'PRICE', 'Actions']}/>
                    ) : listing.length == 0 ? (
                      <TableLoader
                        columnCount={10}
                        loadingText={"No Records Found"}
                      />
                    ) : (
                      listing.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.created_at}</td>
                            <td>{item.claim_number}</td>
                            <td>{item.member_name}</td>
                            <td>{item.location_name}</td>
                            <td>{item.manufacturer_name}</td>
                            <td>{item.product_type_name}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price ? `$${item.price}` : ""}</td>
                            <td>
                              <Link to={"/edit-claim/" + item.id}>
                                {userRole === "admin" ? "View" : "Edit"}
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
    </>
  );
};

export default Dashboard;
