import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { withTokenGetAPI, withTokenPostAPI } from "../utils/service";
import { UNIT_OPTION } from "../utils/constants";
import InfoBubble from "../utils/Infobublle";

const CreateClaim = () => {
  const navigate = useNavigate();
  const [manufacturerList, setManufacturerList] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);
  const [submitBtnTxt, setSubmitBtnTxt] = useState('Save & Continue');
  const [submitDisableStatus, setSubmitDisableStatus] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [latestClaimNumber, setLatestClaimNumber] = useState(null);

  useEffect(() => {
    getManufacturerList();
    getProductTypeList();
    getLastClaimNumber();
  }, []);

  const getManufacturerList = async () => {
    const url = `/api/manufacturer/list?pagesize=1000`;
    const manList = await withTokenGetAPI(url);
    const { code, success, message, data } = manList;
    if (code !== 200) {
      console.log(message);
    }

    setManufacturerList(data?.data);
  }

  const getProductTypeList = async () => {
    const url = `/api/producttypes/list?pagesize=1000`;
    const manList = await withTokenGetAPI(url);
    const { code, success, message, data } = manList;
    if (code !== 200) {
      console.log(message);
    }

    setProductTypeList(data?.data);
  }

  const getLastClaimNumber = async () => {
    const url = `/api/getlatestclaimnumber`;
    const manList = await withTokenGetAPI(url);
    const { code, success, message, data } = manList;
    if (code !== 200) {
      console.log(message);
    }

    let resultClaimNumber = data?.claim_number;
    setLatestClaimNumber(parseInt(resultClaimNumber) + 1); 

  }

  const handleFormSubmit = async (postData) => {
    setSubmitDisableStatus(true);
    setSubmitBtnTxt('Please wait..');
    const url = 'api/claim/addclaim';
    const storeClaim = await withTokenPostAPI(url, postData);
    const { code, success, message, data, error } = storeClaim;
    setSubmitBtnTxt('Submit');
    setSubmitDisableStatus(false);
    if (code !== 200) {
      if (typeof error !== 'undefined') {
        setFormErrors(error);
      }
      console.log(message);
      return;
    }

    navigate(`/edit-claim/${data.id}`);
    console.log('Store Claim', storeClaim);

  }

  const initialValues = {
    manufacturer_id: "",
    invoice_number: "",
    product_type_id: "",
    description: "",
    price: "",
    quantity: "",
    unit: "",
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema: yup.object({
      manufacturer_id: yup.string().required("Please select Manufacture."),
      invoice_number: yup.string().required("Please Enter Invoice Number."),
      product_type_id: yup.string().required('Please select Product Type.'),
      description: yup.string().required("Please Enter Description"),
      price: yup.number("Please enter valid Price.").required("Please Enter Price").min(1, 'Please enter valid Price.').max(9999, 'Maximum allowed value is $9999'),
      quantity: yup.number().required("Please Enter Quantity").min(1, "Minumum allowed value is 1").max(999, 'Maximum allowed value is 999'),
      unit: yup.string().required('Please select quantity unit.'),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <div className="wrapper createClaimForm">
      <div className="container">
        <Header />
        <div className="inner_wrap">
          <section className="recent_activity_tbl_wrap main_pg_sec">
            <div className="new_claim_wrapper createClaimHeading">
              <h2 className="new_head">Submit A New Claim</h2>
              <form onSubmit={handleSubmit}>
                <div className="new_claim_form_wrapper">
                  {/* <div className="form-field-wrap">
                    <div className="form-field">
                      <label htmlFor="claim-number">Claim number</label>
                      <label>123-xx-57239-1</label>
                    </div>
                    <div className="form-field">
                      <Link
                        to="/edit-claim"
                        className="btn main_btn main_btn_sm"
                      >
                        Edit Claim
                      </Link>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group newCliamInfo">
                        <label>New Claim Number</label>
                        <label className="claimFormatNo">#{latestClaimNumber}</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="manufacturer_id">
                          CHOOSE MANUFACTURER<span className="requiredMark">*</span>
                          <InfoBubble dataId='manufacturer_id' content='This is the manufacturer that you would like to submit this claim to' />
                        </label>
                        <select
                          className="form-control"
                          name="manufacturer_id"
                          id="manufacturer_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.manufacturer_id}
                        >
                          <option value="" key="0manufacturer">
                            Choose Manufacturer
                          </option>
                          {manufacturerList.length > 0 &&
                            manufacturerList.map((item, key) => {
                              return (
                                <option value={item.id} key={item.id + item.manufacturer_name}>{item.manufacturer_name}</option>
                              )
                            })
                          }
                        </select>
                        {errors.manufacturer_id && touched.manufacturer_id ? <p className="text-danger">{errors.manufacturer_id}</p> : null}
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">INVOICE NUMBER <span className="requiredMark">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="invoice_number"
                          id="invoice_number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.invoice_number}
                          placeholder="Invoice Number"
                        />
                        {errors.invoice_number && touched.invoice_number ? <p className="text-danger">{errors.invoice_number}</p> : null}
                        {formErrors['invoice_number'] ? (
                          <div className="form-error">{formErrors['invoice_number'][0]}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="product_type_id">
                          CHOOSE PRODUCT TYPE<span className="requiredMark">*</span>
                        </label>
                        <select
                          className="form-control"
                          name="product_type_id"
                          id="product_type_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.product_type_id}
                        >
                          <option value="" key="0producttype">
                            Choose Product Type
                          </option>
                          {productTypeList.length > 0 &&
                            productTypeList.map((item, key) => {
                              return (
                                <option value={item.id} key={item.id + item.product_type_name}>{item.product_type_name}</option>
                              )
                            })
                          }
                        </select>
                        {errors.product_type_id && touched.product_type_id ? <p className="text-danger">{errors.product_type_id}</p> : null}
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <div className="form-group descriptionTextarea">
                        <label htmlFor="description">DESCRIPTION<span className="requiredMark">*</span></label>
                        {/* <input
                          type="text"
                          className="form-control"
                          name="description"
                          id="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          placeholder="DESCRIPTION"
                        /> */}
                        <textarea
                          className="form-control"
                          name="description"
                          id="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          placeholder="DESCRIPTION">  </textarea>
                        {errors.description && touched.description ? <p className="text-danger">{errors.description}</p> : null}
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group">
                        <label htmlFor="price">Enter Price<span className="requiredMark">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          id="price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price}
                          placeholder="$"
                        />
                        {errors.price && touched.price ? <p className="text-danger">{errors.price}</p> : null}
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group">
                        <label htmlFor="quantity">quantity<span className="requiredMark">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="quantity"
                          id="quantity"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantity}
                          placeholder="Quantity"
                        />
                        {errors.quantity && touched.quantity ? <p className="text-danger">{errors.quantity}</p> : null}
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group">
                        <label htmlFor="unit">
                          Unit <span className="requiredMark">*</span>
                        </label>
                        <select
                          className="form-control"
                          name="unit"
                          id="unit"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.unit}
                        >
                          <option value="" key="0unit">
                            Choose Unit
                          </option>
                          {UNIT_OPTION.length > 0 &&
                            UNIT_OPTION.map((item, key) => {
                              return (
                                <option value={item} key={item + 'unit'}>{item}</option>
                              )
                            })
                          }
                        </select>
                        {errors.unit && touched.unit ? <p className="text-danger">{errors.unit}</p> : null}
                      </div>
                    </div>

                  </div>
                  <div className="form-field-wrap justify-content-end">
                    <div className="totalPriceQty">
                      <label>Total:</label>
                      <label className="labelPriceQty">${values.price * values.quantity}</label>
                    </div>
                    <button type="submit" className="btn main_btn main_btn_sm" disabled={submitDisableStatus}>
                      {submitBtnTxt}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateClaim;
