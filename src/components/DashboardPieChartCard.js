import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux';
import { getClaimsByAmount, getClaimsByManufacturer, getClaimsByProductType } from '../redux/generalSlice';

const DashboardPieChartCard = ({id, chartType, apiEndName, headerLabel, type, enableSlices, format }) => {
    const dispatch = useDispatch();
    const { claims, total } = useSelector((store) => store.general[`${apiEndName}`] );
    const [data, setData] = useState([["claims", "claims_per_user"], ['loading', 1]]);
    const [currencySign, setCurrencySign] = useState(null);
    const [options, setOptions] = useState({
        legend: 'none',
    });
    
    useEffect(() => {
    switch(type) {
        case 'manufacturer': dispatch(getClaimsByManufacturer());
        return;
        case 'product': dispatch(getClaimsByProductType());
        return;
        case 'amount': 
            dispatch(getClaimsByAmount());
            setCurrencySign('$');
        return;
        default: //Do nothing
        return;
    }
   }, []);

   useEffect(() => {
    if(claims.length > 0) {
        const buildData = claims.map((item, index) => {
            return [item.name, item.count];
        });
        const finalData = [["claims", "claims_per_user"], ...buildData];
        const slices = {}
        let offsetVal = 0.1;
        if(finalData.length > 0 && enableSlices) {
            for(let i=0; i<finalData.length; i++) {
                if(i!==0 && i%3===0) {
                    slices[i] = {
                        offset:  offsetVal + 0.1,
                    }
                }
            }

            setOptions({
                legend: 'none',
                pieSliceText: 'value',
                slices: slices,
                
            });
        }

        setData(finalData);
        
    }
   }, [claims]);
  return (
    <div className="col-md-12 col-lg-6 col-xl-4 dashboardPieChart">
              <div className="accordion cust_accordion" id={`accordionExample${id}`}>
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseOne${id}`}
                      aria-expanded="true"
                      aria-controls={`collapseOne${id}`}
                    >
                      <i className="fa-solid fa-caret-down"></i>
                      {headerLabel}
                    </button>
                    <div className="total_count">
                      Total <span className="main_count">{currencySign}{total}</span>
                    </div>
                  </div>
                  <div
                    id={`collapseOne${id}`}
                    className="accordion-collapse collapse show"
                    data-bs-parent={`#accordionExample${id}`}
                  >
                    <div className="accordion-body">
                    <Chart
                        chartType={chartType}
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"200px"}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}

export default DashboardPieChartCard;