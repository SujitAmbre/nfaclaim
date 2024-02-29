import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import "yup-phone-lite";
import InputMask from 'react-input-mask';
import { withTokenGetAPI, withTokenPostAPI } from "../utils/service";
import { useDispatch, useSelector } from "react-redux";
import { fetchClaim } from "../redux/claimSlice";
import { Link } from 'react-router-dom';
import PDF_file_icon from '../assets/images/PDF_file_icon.png';
import word_file_icon from '../assets/images/word_file_icon.png';
import { getCurrentDate } from "../utils/helper";
import {
  CLAIM_TYPE,
  STATES_ARRAY,
  YES_NO_OPTIONS,
  CLEARNER_OPTIONS,
  ADHESIVE_OPTIONS,
  successToast,
  errorToast,
  UNIT_OPTION,
  INSTALLATION_TYPES_HARD_SURFACE,
  INSTALLATION_TYPES_SOFT_SURFACE
} from "../utils/constants";
import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";
import AttachmentLogo from "./AttachmentLogo";
import InfoBubble from "../utils/Infobublle";
const EditClaim = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [manufacturerList, setManufacturerList] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);
  const [installationTypeList, setInstallationTypeList] = useState([]);
  const [methodOfApplicationList, setMethodOfApplicationList] = useState([]);
  const [addClass, setAddClass] = useState("");
  const { claimToEdit, disableSubmit } = useSelector((store) => store.claim);
  const { claim_id } = useParams();
  const [keepOnSamePage, setKeepOnSamePage] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("_nfa_role"));
  const [memberList, setMemberList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [claimStatusList, setClaimStatusList] = useState([]);
  const [today, setToday] = useState(getCurrentDate);
  const [manufacturerName, setManufacturerName] = useState(null);
  const [claimTotal, setClaimTotal] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [memberName, setMemberName] = useState(null);
  const [analystPopState, setAnalystPopState] = useState(false);
  const analystModalRef = useRef('analystModalRef');
console.log(claimToEdit,"claimto edit");
  const initialValues = {
    claim_id: "",
    manufacturer_id: "",
    claim_number: "",
    invoice_number: "",
    description: "",
    product_type_id: "",
    support_member_id: "",
    unit: "",
    price: "",
    quantity: "",
    your_name: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    claim_type: "",
    dealer_claim: "",
    manufacturer_claim: "",
    project_name: "",
    builder: "",
    unit_lot: "",
    name: "",
    cust_firstname: "",
    cust_lastname: "",
    cust_phone: "",
    cust_email: "",
    address: "",
    cust_zip: "",
    city: "",
    state: "",
    is_defective_product: "",
    installed_date: "",
    rooms_involved: "",
    floors_involved: "",
    sample_available: "",
    space_occupied: "",
    installation_type_id: "",
    adhesive_primer_sealer: "",
    method_of_application: "",
    subfloor_information: "",
    underlayment_type: "",
    // perimeter_caulked: "",
    dehumidifier_humidifier: "",
    // rental_property: "",
    original_purchaser: "",
    first_noticed: "",
    correction_attempted: "",
    clearner_type: "",
    attachment: "",
    claim_attachments: null,
    comments: "",
    original_purchaser_name: "",
    current_purchaser_name: "",
    claim_status: "",
    frequency_of_cleaning: "",
    carpet_question: "",
    location_id: "",
    is_mail_send: '1',
  };

  const supportedFileFormat = ['image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const validationSchemaObj = {
    manufacturer_id: yup.string().required("Please select manufacturer."),
    invoice_number: yup.string().required("This is required field"),
    description: yup.string().required("This is required field."),
    product_type_id: yup.string("This is required field."),
    support_member_id: yup.number().required("Please select Claim Analyst "),
    price: yup
      .number("Please enter valid Price.")
      .required("Please Enter Price")
      .min(1, "Please enter valid Price.")
      .max(9999, "Maximum allowed value is $9999"),
    unit: yup.string().required("Please select quantity unit."),
    quantity: yup
      .number()
      .required("Please Enter Quantity")
      .min(1, "Minumum allowed value is 1")
      .max(999, "Maximum allowed value is 999"),
    firstname: yup
      .string()
      .required("This is required field.")
      .max(
        30,
        "The entered string is too long. Please limit your input to a maximum of 30 characters."
      ),
    lastname: yup
      .string()
      .required("This is required field.")
      .max(
        30,
        "The entered string is too long. Please limit your input to a maximum of 30 characters."
      ),
    phone: yup
      .string()
      .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone number')
      .required("This is required field."),
    email: yup.string().email().required("This is required field."),
    //dealer_claim: yup.string().required("This is required field."),
    claim_type: yup.string().required("This is required field."),
    // project_name:yup.string().required('This is required field.'),
    // name:yup.string().required('This is required field.'),
    cust_firstname: yup
      .string()
      .required("This is required field.")
      .max(
        30,
        "The entered string is too long. Please limit your input to a maximum of 30 characters."
      ),
    cust_lastname: yup
      .string()
      .required("This is required field.")
      .max(
        30,
        "The entered string is too long. Please limit your input to a maximum of 30 characters."
      ),
    cust_phone: yup
      .string()
      .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone number')
      .required("This is required field."),
    cust_email: yup
      .string()
      .email("Please enter valid email.")
      .required("This is required field."),
    dealer_claim: yup.string().required('This is required field.'),
    manufacturer_claim: yup.string().required('This is required field.'),
    cust_zip: yup.string().required("Please enter zip code."),
    // claim_status: yup.string().required("This field is required"),
    // city:yup.string().required('This is required field.'),
    // state:yup.string().required('This is required field.'),
    // is_defective_product:yup.string().required('This is required field.'),
    // installed_date:yup.date().required('This is required field.'),
    // rooms_involved:yup.string().required('This is required field.'),
    // floors_involved:yup.string().required('This is required field.'),
    // sample_available:yup.string().required('This is required field.'),
    // space_occupied:yup.string().required('This is required field.'),
    // installation_type_id:yup.string().required('This is required field.'),
    // method_of_application:yup.string().required('This is required field.'),
    // subfloor_information:yup.string().required('This is required field.'),
    // underlayment_type:yup.string().required('This is required field.'),
    // perimeter_caulked:yup.string().required('This is required field.'),
    // dehumidifier_humidifier:yup.string().required('This is required field.'),
    // rental_property:yup.string().required('This is required field.'),
    // original_purchaser:yup.string().required('This is required field.'),
    // first_noticed:yup.string().required('This is required field.'),
    // correction_attempted:yup.string().required('This is required field.'),
    // clearner_type:yup.string().required('This is required field.'),
    attachment: yup
      .mixed()
      .nullable()
      .test("fileSize", "File Size is too large", (value) => {
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            var filesize = value[i].size / 1024 / 1024;
            if (filesize > 5) {
              return false;
            }
          }
        }
        return true;
      })
  };

  const formicObj = useFormik({
    initialValues,
    validationSchema: yup.object(validationSchemaObj),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const {
    values,
    setValues,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = formicObj;

  useEffect(() => {
    getManufacturerList();
    getProductTypeList();
    getInstallationTypeList();
    getMethodOfApplication();
    getStatusList();
    // getSubfloorInformation();
    if (userRole === "retailer") {
      getMemberList();
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const url = `/api/claim/getclaim?claim_id=${claim_id}`;
    dispatch(fetchClaim(url));
    if (userRole === "retailer") {
      setAddClass("retailerLog");

    }
  }, [isLoading]);

  useEffect(() => {
    setValues(claimToEdit);
    handleClaimTotal(claimToEdit.price, claimToEdit.quantity);
  }, [claimToEdit]);

  useEffect(() => {
    if (values.support_member_id === "") {
      getLoactionsByAgentId();
      
    } else {
      getLoactionsByAgentId(values.support_member_id);
      getMemberData(values.support_member_id);
    }

    
  }, [values.support_member_id, isLoading]);

  useEffect(() => {
    if (manufacturerList.length === 0 || typeof claimToEdit.manufacturer_id === 'undefined') {
      return;
    }
    setStaticManufacturerName(claimToEdit.manufacturer_id);
    handelModalLocation(claimToEdit.location_id);
    handelModalClaimAnyalistName(claimToEdit.support_member_id);
  }, [claimToEdit, manufacturerList]);

useEffect(()=>{
  if(errors.support_member_id && userRole !=='admin') {
    handleAnalystPopup();
  }
},[errors.support_member_id, values.support_member_id, userRole]);

const handleAnalystPopup = () => {
  if(memberName === null || values.support_member_id === "") {
    analystModalRef.current.click();
  }
  
}
  
const handleClaimTotal = () => {
    if (values.price === "" && values.quantity === "") {
      setClaimTotal(0);
      return;

    }
    const total = parseFloat(values.price) * parseFloat(values.quantity);
    setClaimTotal(total);
}

  const jumpToError = () => {
    if (Object.keys(errors).length > 0) {
      const getKeys = Object.keys(errors);
      const element = document.getElementById(`${getKeys[0]}`);
      if (element) {
        element.scrollIntoView();
      }
    }
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    const url = "/api/claim/updateclaim";

    if (values.attachment) {
      values = { ...values, attachment: [...values.attachment] };
    }
    const postForm = await withTokenPostAPI(url, values);
    if (postForm.code === 200) {
      if (!keepOnSamePage) {
        navigate("/dashboard");
      }
      setTimeout(() => {
        successToast(postForm.message);
      }, 1);
    } else {
      errorToast(postForm.message);
    }
    setIsLoading(false);
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
    const list = await withTokenGetAPI(url);
    const { code, message, data } = list;
    if (code !== 200) {
      console.log(message);
    }

    setProductTypeList(data?.data);
  };

  const getInstallationTypeList = async (surfaceType = null) => {
    let url = `/api/installationtype/list?pagesize=1000`;
    if (surfaceType !== null && surfaceType === 'soft') {
      url = `/api/installationtype/list?surfacetype=soft&pagesize=1000`;
    } else {
      url = `/api/installationtype/list?surfacetype=hard&pagesize=1000`;
    }
    const manList = await withTokenGetAPI(url);
    const { code, message, data } = manList;
    if (code !== 200) {
      console.log(message);
    }

    setInstallationTypeList(data?.data);
  };

  const getMethodOfApplication = async () => {
    const url = `/api/method_of_applicationslist?pagesize=1000`;
    const list = await withTokenGetAPI(url);
    const { code, message, data } = list;
    if (code !== 200) {
      console.log(message);
    }

    setMethodOfApplicationList(data?.data);
  };

  const getStatusList = async () => {
    const url = `/api/statuslist`;
    const list = await withTokenGetAPI(url);
    const { code, message, data, success } = list;
    if (!success) {
      console.log(message);
      return;
    }

    setClaimStatusList(data);
  };

  // const getSubfloorInformation = async () => {
  //   const url = `/api/subfloor_informationlist?pagesize=1000`;
  //   const list = await withTokenGetAPI(url);
  //   const { code, message, data } = list;
  //   if (code !== 200) {
  //     console.log(message);
  //   }

  //   setSubfloorInformationList(data?.data);
  // };

  const getMemberList = async () => {
    const url = `/api/retailer/getmemberlist?pagesize=1000`;
    const list = await withTokenGetAPI(url);
    const { code, message, data } = list;
    if (code !== 200) {
      console.log(message);
    }

    setMemberList(data?.data);
  };

  const getMemberData = async (member_id) => {
    const url = `/api/support_member/show/${member_id}`;
    const list = await withTokenGetAPI(url);
    const { code, message, data } = list;
    if (code !== 200) {
      console.log(message);
    }
    const fieldsArray = [
      'firstname',
      'lastname',
      'phone',
      'email'
    ];
    for (let i = 0; i < fieldsArray.length; i++) {
      const fieldName = fieldsArray[i];
      if (typeof data[fieldName] !== 'undefined') {
        setFieldValue(
          fieldName,
          data[fieldName]
        );

      }
    }
    
    setMemberName(data?.member_name);
    // setMemberList(data?.data);
  }

  const setMailTriggerFlag = () => {
    setFieldValue(
      'is_mail_send',
      '0'
    );
  }

  const getLoactionsByAgentId = async (agent_id = null) => {
    // const url = `/api/getlocationsbyagentid/${member_id}`;
    setLocationList([]);
    let url = `/api/getretailerlocations`;
    if (agent_id) {
      url += '?agent_id=' + agent_id;
    }
    const list = await withTokenGetAPI(url);
    const { code, message, data } = list;
    if (code !== 200) {
      console.log(message);
    }
    
    setLocationList(data);
  }
  
  const handleProductTypeChange = (value) => {
    if (value) {
      // console.log(value)
      const selectedProdId = value;
      const targetItem = productTypeList.filter((item, key) => {
        return parseInt(item.id) === parseInt(selectedProdId)
      });
      let productTypeName = targetItem[0].product_type_name;
      const explodeString = productTypeName.split('Soft Surface');
      if (explodeString.length > 1) {
        getInstallationTypeList('soft');
      } else {
        getInstallationTypeList('hard');
      }

    }
  }
  const handelModalLocation = (location_id) => {   
    const getLocationDetail = locationList?.find(item => item.id === parseInt(location_id));   
    
    setLocationName(getLocationDetail?.location_name);
  }

  const setStaticManufacturerName = (man_id) => {
    if (manufacturerList.length === 0) {
      return;
    }
    const getManDetail = manufacturerList.find(item => item.id === parseInt(man_id));
    if (typeof getManDetail !== 'undefined') {
      setManufacturerName(getManDetail.manufacturer_name);
    }
  }
  const handelModalClaimAnyalistName =  (support_member_id) => {   
    const getMemberDetail = memberList.find(item => item.id === parseInt(support_member_id));    
      
    setMemberName(getMemberDetail?.member_name);
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="inner_wrap extra_bottom_margin">
        <section className="main_pg_sec editClaimPage">
          {/* <!-- Modal --> */}
          {userRole !=='admin' &&  <div className="modal fade" id="analystInfo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-body">
                  <div className="row">
                    <h1>Analyst Info</h1>
                  </div>
                  <form onSubmit={(e)=> {e.preventDefault();}}>
                    <div className="row">
                      {userRole === "retailer" && (
                        <div className="form-field col-lg-12 col-md-12 col-sm-12 col-xs-12 custom_dropdown_wrapper">
                          <label htmlFor="choose-product-type">
                            Choose Claims Analyst
                          </label>
                          <select
                            className="form-control"
                            name="pop_support_member_id"
                            id="pop_support_member_id"
                            onChange={(event) => {
                              setFieldValue(
                                "support_member_id",
                                event.target.value
                              );
                            handelModalClaimAnyalistName(event.target.value);
                            }}
                           
                            value={values.support_member_id}
                          >
                            <option value="" key="0support_member">
                              Choose Claims Analyst
                            </option>
                            {memberList.length > 0 &&
                              memberList.map((item, key) => {
                                return (
                                  <option
                                    value={item.id}
                                    key={item.id + item.member_name}
                                  >
                                    {item.member_name}
                                  </option>
                                );
                              })}
                          </select>
                          {errors.support_member_id && touched.support_member_id ? (
                            <p className="text-danger">
                              {errors.support_member_id}
                            </p>
                          ) : null}
                        </div>
                      ) }
                      <div className="form-field col-lg-12 col-md-12 col-sm-12 col-xs-12 custom_dropdown_wrapper">
                        <label htmlFor="location_id">
                          Choose Location
                        </label>
                        <select
                          className="form-control"
                          name="pop_location_id"
                          id="pop_location_id"
                          value={values.location_id}
                          onChange={(event) => {
                            setFieldValue(
                              "location_id",
                              event.target.value
                            );
                          handelModalLocation(event.target.value);
                          }}
                          onBlur={(event) => {
                            setFieldValue(
                              "location_id",
                              event.target.value
                            );
                          handelModalLocation(event.target.value);
                          }}
                        >
                          <option value="" key="0locationItem">
                            Choose Location
                          </option>
                          {
                            locationList?.map((item, key) => {
                              return <option value={item.id} key={`${key}locationItem`}>{item.location_name}</option>
                            })
                          }
                        </select>

                      </div>
                    </div>

                    <div className="modalSubmitDiv">
                    <button type="button" className="btn main_btn"  onClick={() => {
                            setKeepOnSamePage(true);
                          }}
                          disabled={isLoading} data-bs-dismiss="modal"> {isLoading ? "Please wait.." : "Update Analyst"}</button>
                    </div>

                    <div className="modalCancelDiv">
                       <button type="button" className="btn cancelModalBtn" data-bs-dismiss="modal">Cancel</button>
                    </div>
                 
                  </form>
                </div>
              
              </div>
            </div>
          </div>
      }
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="claim_id" value={values.id} />
            <input type="hidden" name="support_member_id" value={values.support_member_id} />
            <input type="hidden" name="location_id" value={values.location_id} />
            <div className="new_claim_wrapper">
              <h2 className="new_head">
                {userRole === "admin" ? "VIEW CLAIM" : "UPDATE CLAIM"}
              </h2>
              <div className="new_claim_form_wrapper">
                <div className="row justify-content-between">
                  <div className="col-lg-6">
                    <div className="form-group newCliamInfo">
                      <label>Claim Number</label>
                      <label className="claimFormatNo">#{claimToEdit.claim_number}</label>
                    </div>
                  </div>
                  <div className="col-lg-6 analystInfoColumn">
                    <div className="newCliamInfo">
                      <div><label  data-bs-toggle="modal" data-bs-target="#analystInfo" ref={analystModalRef}>Analyst Name: </label>
                      {memberName ? <label className="supportValue"  data-bs-toggle="modal" data-bs-target="#analystInfo"> {memberName} 
                      {userRole !=='admin' && <i className="bi bi-caret-right-fill" data-bs-toggle="modal" data-bs-target="#analystInfo"></i> }
                      </label> : 
                      <i className="bi bi-caret-right-fill" data-bs-toggle="modal" data-bs-target="#analystInfo"></i>
                      }
                      </div>

                      <div>                
                        <label className="claimFormatNo" data-bs-toggle="modal" data-bs-target="#analystInfo">Location: </label>{locationName ? <label className="locationValue"  data-bs-toggle="modal" data-bs-target="#analystInfo">{locationName}</label> : <label className="locationValue">{values.location_id}</label>}
                      </div>
                      {errors.support_member_id && touched.support_member_id ? (
                        <p className="text-danger">{errors.support_member_id}</p>
                      ) : null}
                    </div>
                    
                  </div>
                </div>

                <div className={`form-field-wrap1 row ${addClass}`}>
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                    <div className="form-field custom_dropdown_wrapper inforDive">
                      <label htmlFor="manufacturer_id">Choose Manufacturer<span className="requiredMark">*</span> <InfoBubble dataId='manufacturer_id' content='This is the manufacturer that you would like to submit this claim to' /></label>
                      <select
                        className="form-control"
                        name="manufacturer_id"
                        id="manufacturer_id"
                        onChange={(event) => {
                          setFieldValue(
                            "manufacturer_id",
                            event.target.value
                          );
                          setStaticManufacturerName(event.target.value);
                        }}
                        onBlur={(event) => {
                          setFieldValue(
                            "manufacturer_id",
                            event.target.value
                          );
                          setStaticManufacturerName(event.target.value);
                        }}
                        value={values.manufacturer_id}
                      >
                        <option value="" key="0manufacturer">
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
                      {errors.manufacturer_id && touched.manufacturer_id ? (
                        <p className="text-danger">{errors.manufacturer_id}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-field col-lg-3 col-md-4 col-sm-12 col-xs-12 inforDive">


                    <label htmlFor="claim-number">INVOICE NUMBER<span className="requiredMark">*</span>
                      {/* <InfoBubble dataId='invoice_number' content='Invoice number' /> */}
                    </label>

                    <input
                      type="text"
                      name="invoice_number"
                      id="invoice_number"
                      placeholder="INVOICE NUMBER"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.invoice_number}
                    />
                    {errors.invoice_number && touched.invoice_number ? (
                      <p className="text-danger">{errors.invoice_number}</p>
                    ) : null}
                  </div>

                  <div className="form-field col-lg-3 col-md-4 col-sm-12 col-xs-12 custom_dropdown_wrapper">
                    <label htmlFor="choose-product-type">
                      Choose Product Type<span className="requiredMark">*</span>
                      {/* <InfoBubble dataId='product_type_id' content='Product Type' /> */}
                    </label>
                    <select
                      className="form-control"
                      name="product_type_id"
                      id="product_type_id"
                      onChange={(event) => {
                        setFieldValue(
                          "product_type_id",
                          event.target.value
                        );
                        handleProductTypeChange(event.target.value);
                      }}
                      onBlur={(event) => {
                        setFieldValue(
                          "product_type_id",
                          event.target.value
                        );
                        handleProductTypeChange(event.target.value);
                      }}
                      value={values.product_type_id}
                    >
                      <option value="" key="0producttype">
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
                    {errors.product_type_id && touched.product_type_id ? (
                      <p className="text-danger">{errors.product_type_id}</p>
                    ) : null}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                    <div className="form-field custom_dropdown_wrapper">
                      <label htmlFor="claim_type">Claim Type<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='claim_type' content='Claim Type' /> */}
                      </label>
                      <select
                        className="form-control"
                        name="claim_type"
                        id="claim_type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.claim_type}
                      >
                        <option value="" key="0claimtype">
                          Choose Claim Type
                        </option>
                        {CLAIM_TYPE.map((item, key) => {
                          return (
                            <option key={`${key}_${item}`} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                      {errors.claim_type && touched.claim_type ? (
                        <p className="text-danger">{errors.claim_type}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-field col-lg-6 col-md-4 col-sm-12 col-xs-12 inforDive">
                    <label htmlFor="description">Description <span className="requiredMark">*</span>
                      {/* <InfoBubble dataId='description' content='Description' /> */}
                    </label>
                    {/* <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      autoComplete="off"
                    /> */}
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      placeholder="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      autoComplete="off">  </textarea>
                    {errors.description && touched.description ? (
                      <p className="text-danger">{errors.description}</p>
                    ) : null}
                  </div>

                  <div className="form-field col-lg-2 col-md-4 col-sm-12 col-xs-12 field_md inforDive">
                    <label htmlFor="price">Enter Price <span className="requiredMark">*</span>
                      {/* <InfoBubble dataId='price' content='Price' /> */}
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      placeholder="$"
                      onChange={(event) => {
                        setFieldValue(
                          "price",
                          event.target.value
                        );
                      }}
                      onBlur={(event) => {
                        setFieldValue(
                          "price",
                          event.target.value
                        );
                        handleClaimTotal();
                      }}
                      value={values.price}
                    />
                    {errors.price && touched.price ? (
                      <p className="text-danger">{errors.price}</p>
                    ) : null}
                  </div>
                  <div className="form-field col-lg-2 col-md-4 col-sm-12 col-xs-12 field_sm inforDive">
                    <label htmlFor="quantity">QTY <span className="requiredMark">*</span>
                      {/* <InfoBubble dataId='quantity' content='QTY' /> */}
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      id="quantity"
                      placeholder="Enter qty"
                      onChange={(event) => {
                        setFieldValue(
                          "quantity",
                          event.target.value
                        );
                      }}
                      onBlur={(event) => {
                        setFieldValue(
                          "quantity",
                          event.target.value
                        );
                        handleClaimTotal();
                      }}
                      value={values.quantity}
                      autoComplete="off"
                    />
                    {errors.quantity && touched.quantity ? (
                      <p className="text-danger">{errors.quantity}</p>
                    ) : null}
                  </div>
                  <div className="form-field col-lg-2 col-md-4 col-sm-12 col-xs-12 custom_dropdown_wrapper">
                    <label htmlFor="unit">Unit</label>
                    <select
                      className="form-control"
                      name="unit"
                      id="unit"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.unit}
                    >
                      <option value="" key="0claimtype">
                        Choose Unit
                      </option>
                      {UNIT_OPTION.map((item, key) => {
                        return (
                          <option key={`${key}_${item}`} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                    {errors.unit && touched.unit ? (
                      <p className="text-danger">{errors.unit}</p>
                    ) : null}
                  </div>

                </div>
                <div className="row">
                  <div className="form-field-wrap justify-content-end">
                    <div className="totalPriceQty">
                      <label>Total: </label>
                      {
                        claimTotal && <label className="labelPriceQty"> ${claimTotal}</label>
                      }

                    </div>
                    {userRole !== "admin" &&  <button type="submit" className="btn main_btn main_btn_sm">
                      Save claim
                    </button> }
                  </div>
                </div>
              </div>
            </div>

            <div className="edit_claim_form_wrapper">
              <div className="edit_claim_form">
                <h2 className="new_head">Claim Tracking</h2>

                <div className="row">
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field inforDive onHoverInfoShowDiv">

                      <label htmlFor="firstname">First Name <span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='firstname' content='First Name' /> */}
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstname}
                        autoComplete="off"
                        readOnly={(values.firstname) ? true : false}
                      />
                      {errors.firstname && touched.firstname ? (
                        <p className="text-danger">{errors.firstname}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field  inforDive onHoverInfoShowDiv">

                      <label htmlFor="lastname">Last Name<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='lastname' content='Last Name' /> */}
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastname}
                        autoComplete="off"
                        readOnly={(values.lastname) ? true : false}
                      />
                      {errors.lastname && touched.lastname ? (
                        <p className="text-danger">{errors.lastname}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field">
                      <label htmlFor="phone">Phone <span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='phone' content='Phone' /> */}
                      </label>
                      <InputMask
                        type="text"
                        mask="(999) 999-9999"
                        id="phone"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                      />
                      {errors.phone && touched.phone ? (
                        <p className="text-danger">{errors.phone}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field">
                      <label htmlFor="customer-email">Email<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='email' content='Email' /> */}
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="name@domain.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        autoComplete="off"
                        readOnly={(values.email) ? true : false}
                      />
                      {errors.email && touched.email ? (
                        <p className="text-danger">{errors.email}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field">
                      <label htmlFor="dealer-claim">Dealer Claim #<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='dealer_claim' content='Dealer Claim' /> */}
                      </label>
                      <input
                        type="text"
                        name="dealer_claim"
                        id="dealer_claim"
                        placeholder="xxxxxxxx-x"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dealer_claim}
                        autoComplete="off"
                      />
                      {errors.dealer_claim && touched.dealer_claim ? (
                        <p className="text-danger">{errors.dealer_claim}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field">
                      <label htmlFor="manufacturer_claim">Manufacturer Claim #<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='manufacturer_claim' content='Manufacturer Claim' /> */}
                      </label>
                      <input
                        type="text"
                        name="manufacturer_claim"
                        id="manufacturer_claim"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.manufacturer_claim}
                        autoComplete="off"
                      />
                      {errors.manufacturer_claim && touched.manufacturer_claim ? (
                        <p className="text-danger">{errors.manufacturer_claim}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 seprationLine">
                    <hr />
                  </div>

                </div>
              </div>
              <div className="edit_claim_form">
                <h2 className="new_head">Customer Information</h2>

                <div className="row">
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field">
                      <label htmlFor="cust_firstname">First Name<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='cust_firstname' content='First Name' /> */}
                      </label>
                      <input
                        type="text"
                        name="cust_firstname"
                        id="cust_firstname"
                        placeholder="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cust_firstname}
                        autoComplete="off"
                      />
                      {errors.cust_firstname && touched.cust_firstname ? (
                        <p className="text-danger">{errors.cust_firstname}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field">
                      <label htmlFor="cust_lastname">Last Name<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='cust_lastname' content='Last Name' /> */}
                      </label>
                      <input
                        type="text"
                        name="cust_lastname"
                        id="cust_lastname"
                        placeholder="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cust_lastname}
                        autoComplete="off"
                      />
                      {errors.cust_lastname && touched.cust_lastname ? (
                        <p className="text-danger">{errors.cust_lastname}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field">
                      <label htmlFor="phone">Phone<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='cust_phone' content='Phone' /> */}
                      </label>
                      <InputMask
                        type="text"
                        mask="(999) 999-9999"
                        id="cust_phone"
                        name="cust_phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cust_phone}
                      />
                      {errors.cust_phone && touched.cust_phone ? (
                        <p className="text-danger">{errors.cust_phone}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="form-field">
                      <label htmlFor="email">Email<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='cust_email' content='Email' /> */}
                      </label>
                      <input
                        type="text"
                        name="cust_email"
                        id="cust_email"
                        placeholder="name@domain.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cust_email}
                        autoComplete="off"
                      />
                      {errors.cust_email && touched.cust_email ? (
                        <p className="text-danger">{errors.cust_email}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="form-field">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="1234 street rd"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        autoComplete="off"
                      />
                      {errors.address && touched.address ? (
                        <p className="text-danger">{errors.address}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-2">
                    <div className="form-field">
                      <label htmlFor="cust_zip">Zip<span className="requiredMark">*</span>
                        {/* <InfoBubble dataId='cust_zip' content='Zip' /> */}
                      </label>
                      <input
                        type="text"
                        name="cust_zip"
                        id="cust_zip"
                        placeholder="Zip"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cust_zip}
                        autoComplete="off"
                      />
                      {errors.cust_zip && touched.cust_zip ? (
                        <p className="text-danger">{errors.cust_zip}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2">
                    <div className="form-field">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        autoComplete="off"
                      />
                      {errors.city && touched.city ? (
                        <p className="text-danger">{errors.city}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2">
                    <div className="form-field custom_dropdown_wrapper">
                      <label htmlFor="state">State</label>
                      <select
                        className="reactDropDownControl form-control"
                        name="state"
                        id="state"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                      >
                        <option value="" key="0state">
                          Choose State
                        </option>
                        {STATES_ARRAY.map((item, key) => {
                          return (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                      {errors.state && touched.state ? (
                        <p className="text-danger">{errors.state}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-4">
                    <div className="form-field">
                      <label htmlFor="project-name">
                        Project Name / Site Name
                      </label>
                      <input
                        type="text"
                        name="project_name"
                        id="project_name"
                        placeholder="enter name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.project_name}
                        autoComplete="off"
                      />
                      {errors.project_name && touched.project_name ? (
                        <p className="text-danger">{errors.project_name}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="form-field">
                      <label htmlFor="builder">
                        Builder
                      </label>
                      <input
                        type="text"
                        name="builder"
                        id="builder"
                        placeholder="Builder"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.builder}
                        autoComplete="off"
                      />
                      {errors.builder && touched.builder ? (
                        <p className="text-danger">{errors.builder}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="form-field">
                      <label htmlFor="unit_lot">
                        Unit Lot
                      </label>
                      <input
                        type="text"
                        name="unit_lot"
                        id="unit_lot"
                        placeholder="Unit Lot"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.unit_lot}
                        autoComplete="off"
                      />
                      {errors.unit_lot && touched.unit_lot ? (
                        <p className="text-danger">{errors.unit_lot}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 seprationLine">
                    <hr />
                  </div>
                </div>
              </div>
              {String(values.claim_type).toLowerCase() === "installed" ? (
                <div className="edit_claim_form">
                  <h2 className="new_head">Installation Information</h2>
                  <div className="row hide">
                    <div className="col-sm-12 col-lg-4 col-md-6">
                      <div className="form-field">
                        <label>Is this product defective?</label>
                        <div className="radio-wrapper">
                          {YES_NO_OPTIONS.map((item, key) => {
                            if (
                              String(
                                claimToEdit.is_defective_product
                              ).toLowerCase() === String(item).toLowerCase()
                            ) {
                              return (
                                <div
                                  className="form-check"
                                  key={`claimType_${item}`}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_defective_product"
                                    id="is_defective_product"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item}
                                    checked
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="yes"
                                  >
                                    {item}
                                  </label>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className="form-check"
                                  key={`claimType_${item}`}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_defective_product"
                                    id="is_defective_product"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="yes"
                                  >
                                    {item}
                                  </label>
                                </div>
                              );
                            }
                          })}
                        </div>
                        {errors.is_defective_product &&
                          touched.is_defective_product ? (
                          <p className="text-danger">
                            {errors.is_defective_product}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="date-installed">date installed</label>
                        <input
                          type="datetime-local"
                          name="installed_date"
                          id="date-installed"
                          placeholder="1234 street rd"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.installed_date}
                        />
                        {errors.installed_date && touched.installed_date ? (
                          <p className="text-danger">{errors.installed_date}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="rooms_involved">rooms involved</label>
                        <input
                          type="text"
                          name="rooms_involved"
                          id="rooms_involved"
                          placeholder="ex: office, lobby, bedroom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rooms_involved}
                          autoComplete="off"
                        />
                        {errors.rooms_involved && touched.rooms_involved ? (
                          <p className="text-danger">{errors.rooms_involved}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="floors_involved">floors involved</label>
                        <input
                          type="text"
                          name="floors_involved"
                          id="floors_involved"
                          placeholder="ex: 2nd floor, basement"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.floors_involved}
                          autoComplete="off"
                        />
                        {errors.floors_involved && touched.floors_involved ? (
                          <p className="text-danger">{errors.floors_involved}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-4 col-md-6">
                      <div className="form-field">
                        <label>sample available</label>
                        <div className="radio-wrapper">
                          {YES_NO_OPTIONS.map((item, key) => {
                            if (
                              String(
                                claimToEdit.is_defective_product
                              ).toLowerCase() === String(item).toLowerCase()
                            ) {
                              return (
                                <div
                                  className="form-check"
                                  key={`sample_available_${item}`}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sample_available"
                                    id="sample_available"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item}
                                    checked
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="sample-available-yes"
                                  >
                                    {item}
                                  </label>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className="form-check"
                                  key={`sample_available_${item}`}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sample_available"
                                    id="sample_available"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="sample-available-yes"
                                  >
                                    {item}
                                  </label>
                                </div>
                              );
                            }
                          })}
                        </div>
                        {errors.sample_available && touched.sample_available ? (
                          <p className="text-danger">{errors.sample_available}</p>
                        ) : null}
                      </div>
                      <div className="form-field">
                        <label>space occupied</label>
                        <div className="radio-wrapper">
                          {YES_NO_OPTIONS.map((item, key) => {
                            if (
                              String(claimToEdit.space_occupied).toLowerCase() ===
                              String(item).toLowerCase()
                            ) {
                              return (
                                <div
                                  className="form-check"
                                  key={`space_accupied_${item}`}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="space_occupied"
                                    id="space_occupied"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item}
                                    checked
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="yes"
                                  >
                                    {item}
                                  </label>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className="form-check"
                                  key={`space_accupied_${item}`}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="space_occupied"
                                    id="space_occupied"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="yes"
                                  >
                                    {item}
                                  </label>
                                </div>
                              );
                            }
                          })}
                        </div>
                        {errors.space_occupied && touched.space_occupied ? (
                          <p className="text-danger">{errors.space_occupied}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-4 col-sm-6 col-md-6">
                      <div className="form-field">
                        <label>Installation Method</label>
                        <div className="radio-wrapper">
                          {installationTypeList.map((item, key) => {
                            if (claimToEdit.installation_type_id === item.id) {
                              return (
                                <div
                                  className="form-check"
                                  key={item.installation_type_name}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="installation_type_id"
                                    id={`installation-type-${item.installation_type_name}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item.id}
                                    checked
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`installation-type-${item.installation_type_name}`}
                                  >
                                    {item.installation_type_name}
                                  </label>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className="form-check"
                                  key={item.installation_type_name}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="installation_type_id"
                                    id={`installation-type-${item.installation_type_name}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item.id}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`installation-type-${item.installation_type_name}`}
                                  >
                                    {item.installation_type_name}
                                  </label>
                                </div>
                              );
                            }
                          })}
                        </div>
                        {errors.installation_type_id &&
                          touched.installation_type_id ? (
                          <p className="text-danger">
                            {errors.installation_type_id}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-4 col-sm-6 col-md-6">
                      <div className="form-field custom_dropdown_wrapper not_bot_space">
                        <label>Adhesive / primer / sealer used</label>
                        <div>
                          <label>
                            to select multiple items , hold shift and click
                          </label>
                          <select
                            className="form-control"
                            id="adhesive_primer_sealer"
                            name="adhesive_primer_sealer"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            multiple={true}
                            value={values.adhesive_primer_sealer}
                          >
                            <option value="" key="0adhesiveprimersealer">
                              Choose
                            </option>
                            {ADHESIVE_OPTIONS.length > 0 &&
                              ADHESIVE_OPTIONS.map((item, key) => {
                                return (
                                  <option
                                    value={item}
                                    key={"adhesiveprimersealer" + key}
                                  >
                                    {item}
                                  </option>
                                );
                              })}
                          </select>
                          {errors.adhesive_primer_sealer &&
                            touched.adhesive_primer_sealer ? (
                            <p className="text-danger">
                              {errors.adhesive_primer_sealer}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="row equlLabelHeight">
                    <div className="col-xs-12 col-lg-4 col-sm-6 col-md-6">
                      <div className="form-field custom_dropdown_wrapper">
                        <label htmlFor="method-of-app" className="labelMoveDown">
                          method of application?
                        </label>
                        <div className="input_wrap">
                          <select
                            className="form-control"
                            id="method_of_application"
                            name="method_of_application"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.method_of_application}
                          >
                            <option value="" key="0methodofapplication">
                              Choose Method Of Application
                            </option>
                            {methodOfApplicationList.length > 0 &&
                              methodOfApplicationList.map((item, key) => {
                                return (
                                  <option
                                    value={item.method_of_application_name}
                                    key={
                                      item.id + item.method_of_application_name
                                    }
                                  >
                                    {item.method_of_application_name}
                                  </option>
                                );
                              })}
                          </select>
                          {errors.method_of_application &&
                            touched.method_of_application ? (
                            <p className="text-danger">
                              {errors.method_of_application}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-4 col-sm-6 col-md-6">
                      <div className="form-field">
                        <label htmlFor="subfloor_information" className="labelMoveDown">
                          {" "}
                          Subfloors information
                        </label>
                        <input
                          type="text"
                          name="subfloor_information"
                          id="subfloor_information"
                          placeholder="EX: WOOD, CONCRETE, EXISTING VINYL, ETC."
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.subfloor_information}
                          autoComplete="off"
                        />
                        {errors.subfloor_information &&
                          touched.subfloor_information ? (
                          <p className="text-danger">
                            {errors.subfloor_information}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-4 col-sm-6 col-md-6">
                      <div className="form-field">
                        <label htmlFor="underlayment_type">
                          Underlayment (PAD/CUSHION/MEMBRANE/VISQUEEN) Type
                        </label>
                        <input
                          type="text"
                          name="underlayment_type"
                          id="underlayment_type"
                          placeholder="EX: FOAM, RUBBER, CORK, ETC."
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.underlayment_type}
                          autoComplete="off"
                        />
                        {errors.underlayment_type && touched.underlayment_type ? (
                          <p className="text-danger">
                            {errors.underlayment_type}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 col-lg-4 col-md-6">
                      <div className="form-field">
                        <label>is there a dehumidifier or humidifier?</label>
                        <div className="radio-wrapper">
                          {YES_NO_OPTIONS.map((item, key) => {
                            if (
                              String(claimToEdit.dehumidifier_humidifier).toLowerCase() ===
                              String(item).toLowerCase()
                            ) {
                              return (
                                <div
                                  className="form-check"
                                  key={`dehumidifier_humidifier_${item}`}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="dehumidifier_humidifier"
                                    id="dehumidifier_humidifier"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item}
                                    checked
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="yes"
                                  >
                                    {item}
                                  </label>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className="form-check"
                                  key={`dehumidifier_humidifier_${item}`}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="dehumidifier_humidifier"
                                    id="dehumidifier_humidifier"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={item}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="yes"
                                  >
                                    {item}
                                  </label>
                                </div>
                              );
                            }
                          })}
                        </div>
                        {errors.dehumidifier_humidifier && touched.dehumidifier_humidifier ? (
                          <p className="text-danger">{errors.dehumidifier_humidifier}</p>
                        ) : null}
                      </div>
                      {/* <div className="form-field custom_dropdown_wrapper">
                        <label htmlFor="dehumidifier">
                          is there a dehumidifier or humidifier?
                        </label>
                        <div className="input_wrap">
                          <select
                            className="form-control"
                            id="dehumidifier_humidifier"
                            name="dehumidifier_humidifier"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dehumidifier_humidifier}
                          >
                            <option value="" key="0dehumidifier">
                              Choose Option
                            </option>
                            {YES_NO_OPTIONS.length > 0 &&
                              YES_NO_OPTIONS.map((item, key) => {
                                return (
                                  <option
                                    value={item}
                                    key={"dehumidifier" + item}
                                  >
                                    {item}
                                  </option>
                                );
                              })}
                          </select>
                          {errors.dehumidifier_humidifier &&
                            touched.dehumidifier_humidifier ? (
                            <p className="text-danger">
                              {errors.dehumidifier_humidifier}
                            </p>
                          ) : null}
                          <i className="fa-solid fa-caret-down"></i>
                        </div>
                      </div> */}
                    </div>
                    {/* <div className="col-xs-12 col-sm-6 col-lg-4 col-md-6">
                    <div className="form-field custom_dropdown_wrapper">
                      <label htmlFor="rental-product">
                        is this a rental property
                      </label>
                      <div className="input_wrap">
                        <select
                          className="form-control"
                          id="rental_property"
                          name="rental_property"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rental_property}
                        >
                          <option value="" key="0rentalproperty">
                            Choose Option
                          </option>
                          {YES_NO_OPTIONS.length > 0 &&
                            YES_NO_OPTIONS.map((item, key) => {
                              return (
                                <option
                                  value={item}
                                  key={"rentalproperty" + item}
                                >
                                  {item}
                                </option>
                              );
                            })}
                        </select>
                        {errors.rental_property && touched.rental_property ? (
                          <p className="text-danger">
                            {errors.rental_property}
                          </p>
                        ) : null}
                        <i className="fa-solid fa-caret-down"></i>
                      </div>
                    </div>
                  </div> */}
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field custom_dropdown_wrapper">
                        <label htmlFor="original-purchaser">
                          original purchaser?
                        </label>
                        <div className="input_wrap">
                          <select
                            className="form-control"
                            id="original_purchaser"
                            name="original_purchaser"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.original_purchaser}
                          >
                            <option value="" key="0originalpurchaser">
                              Choose Option
                            </option>
                            {YES_NO_OPTIONS.length > 0 &&
                              YES_NO_OPTIONS.map((item, key) => {
                                return (
                                  <option
                                    value={item}
                                    key={"originalpurchaser" + item}
                                  >
                                    {item}
                                  </option>
                                );
                              })}
                          </select>
                          {errors.original_purchaser &&
                            touched.original_purchaser ? (
                            <p className="text-danger">
                              {errors.original_purchaser}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {String(values.original_purchaser).toLowerCase() === "yes" ? (
                      <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="form-field">
                          <label htmlFor="original_purchaser_name">
                            Original purchaser's name
                          </label>
                          <input
                            type="text"
                            name="original_purchaser_name"
                            id="original_purchaser_name"
                            placeholder="Original purchaser's name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.original_purchaser_name}
                            autoComplete="off"
                          />
                          {errors.original_purchaser_name &&
                            touched.original_purchaser_name ? (
                            <p className="text-danger">
                              {errors.original_purchaser_name}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    {String(values.original_purchaser).toLowerCase() === "no" ? (
                      <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="form-field">
                          <label htmlFor="current_purchaser_name">
                            Current purchaser's name
                          </label>
                          <input
                            type="text"
                            name="current_purchaser_name"
                            id="current_purchaser_name"
                            placeholder="Current purchaser's name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.current_purchaser_name}
                            autoComplete="off"
                          />
                          {errors.current_purchaser_name &&
                            touched.current_purchaser_name ? (
                            <p className="text-danger">
                              {errors.current_purchaser_name}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="first_noticed">
                          first noticed
                        </label>
                        <input
                          type="date"
                          name="first_noticed"
                          id="first_noticed"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.first_noticed}
                          max="2024-01-22"
                        />
                        {errors.first_noticed &&
                          touched.first_noticed ? (
                          <p className="text-danger">
                            {errors.first_noticed}
                          </p>
                        ) : null}
                      </div>
                      {/* <div className="form-field custom_dropdown_wrapper">
                      <label htmlFor="first-noticed">first noticed</label>
                      <div className="input_wrap">
                        <select
                          className="form-control"
                          id="first_noticed"
                          name="first_noticed"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.first_noticed}
                        >
                          <option value="" key="0firstnoticed">
                            Choose Option
                          </option>
                          {YES_NO_OPTIONS.length > 0 &&
                            YES_NO_OPTIONS.map((item, key) => {
                              return (
                                <option
                                  value={item}
                                  key={"firstnoticed" + item}
                                >
                                  {item}
                                </option>
                              );
                            })}
                        </select>
                        <i className="fa-solid fa-caret-down"></i>
                        {errors.first_noticed && touched.first_noticed ? (
                          <p className="text-danger">{errors.first_noticed}</p>
                        ) : null}
                      </div>
                    </div> */}
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="first_noticed">
                          CORRECTION ATTEMPTED?
                        </label>
                        <input
                          type="text"
                          name="correction_attempted"
                          id="correction_attempted"
                          placeholder="CORRECTION ATTEMPTED"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.correction_attempted}
                          autoComplete="off"
                        />
                        {errors.correction_attempted &&
                          touched.correction_attempted ? (
                          <p className="text-danger">
                            {errors.correction_attempted}
                          </p>
                        ) : null}
                      </div>

                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="clearner_type">
                          Type of cleaner ?
                        </label>
                        <input
                          type="text"
                          name="clearner_type"
                          id="clearner_type"
                          placeholder="Type of cleaner"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.clearner_type}
                          autoComplete="off"
                        />
                        {errors.clearner_type &&
                          touched.clearner_type ? (
                          <p className="text-danger">
                            {errors.clearner_type}
                          </p>
                        ) : null}
                      </div>

                    </div>
                    {/* <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field custom_dropdown_wrapper">
                        <label htmlFor="clearner_type">Type of cleaner ?</label>
                        <select
                          className="form-control"
                          id="clearner_type"
                          name="clearner_type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.clearner_type}
                        >
                          <option value="" key="0clearnertype">
                            Choose Option
                          </option>
                          {CLEARNER_OPTIONS.length > 0 &&
                            CLEARNER_OPTIONS.map((item, key) => {
                              return (
                                <option value={item} key={"clearnertype" + item}>
                                  {item}
                                </option>
                              );
                            })}
                        </select>
                        {errors.clearner_type && touched.clearner_type ? (
                          <p className="text-danger">{errors.clearner_type}</p>
                        ) : null}
                      </div>
                    </div> */}
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="first_noticed">
                          Frequency of Cleaning
                        </label>
                        <input
                          type="text"
                          name="frequency_of_cleaning"
                          id="frequency_of_cleaning"
                          placeholder="ex: Once per week"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.frequency_of_cleaning}
                          autoComplete="off"
                        />
                        {errors.frequency_of_cleaning &&
                          touched.frequency_of_cleaning ? (
                          <p className="text-danger">
                            {errors.frequency_of_cleaning}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {(values.product_type_id) === "1" ? (
                      <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="form-field">
                          <label htmlFor="carpet_question">
                            Vacuum Brand and/or Model details
                          </label>
                          <input
                            type="text"
                            name="carpet_question"
                            id="carpet_question"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.carpet_question}
                            autoComplete="off"
                          />
                          {errors.carpet_question &&
                            touched.carpet_question ? (
                            <p className="text-danger">
                              {errors.carpet_question}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                  </div>
                </div>
              ) : null}
              {/* claim status field removed temporaraly */}
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <div className="form-field custom_dropdown_wrapper claimStatus">
                    <label htmlFor="claim_status">Claim Status : Submitted</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 seprationLine" style={{ marginBottom: '40px' }}>
                  <hr />
                </div>

              </div>

              <div className="edit_claim_form">
                <h2 className="new_head">Photos And Documentation</h2>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-6">
                    <div className="row uplaodedImgRow">
                      {
                        values.claim_attachments ?
                          values.claim_attachments.map((item, key) => {
                            if (item.type == 'pdf') {
                              return (
                                <div className="col-lg-2 col-md-4 col-xs-12 uploadedImgColm" key={key}>
                                  <Link to={item.path} target="_blank"><div className="uploadedImgDiv" style={{ backgroundImage: `url("${PDF_file_icon}")` }}></div></Link>
                                </div>
                              );
                            } else if (item.type == "docx") {
                              return (
                                <div className="col-lg-2 col-md-4 col-xs-12 uploadedImgColm" key={key}>
                                  <Link to={item.path} target="_blank"><div className="uploadedImgDiv" style={{ backgroundImage: `url("${word_file_icon}")` }}></div></Link>
                                </div>
                              );
                            } else {
                              return (
                                <div className="col-lg-2 col-md-4 col-xs-12 uploadedImgColm" key={key}>
                                  <Link to={item.path} target="_blank"><div className="uploadedImgDiv" style={{ backgroundImage: `url("${item.path}")` }}></div></Link>
                                </div>
                              );
                            }
                          })
                          : null
                      }
                    </div>
                    <div className="file_upload_wrapper uploadEditClaim">
                      <p>
                        please upload file types such as PDF, Word, PNG, JPG,
                        Gif
                      </p>

                      <div className="file_upload_item">
                        <p>
                          <span>Attach photos and/or documentation,</span>{" "}
                          ensuring each file is under 5MB and the total upload
                          does not exceed 25MB.
                        </p>
                        <input
                          type="file"
                          id="attachment"
                          name="attachment"
                          multiple={true}
                          onChange={(event) => {
                            setFieldValue(
                              "attachment",
                              event.currentTarget.files
                            );
                          }}
                          onBlur={(event) => {
                            setFieldValue(
                              "attachment",
                              event.currentTarget.files
                            );
                          }}
                        // value={claimToEdit.attachment}
                        />
                        {errors.attachment && touched.attachment ? (
                          <p className="text-danger">{errors.attachment}</p>
                        ) : null}
                      </div>
                      <p>
                        if your claim is submitted{" "}
                        <span>
                          without photo references, your claim may be delayed.
                          Several photos are required, up-close, with the full
                          room and subfloor if applicable. Please attach all
                          cleaning receipts if applicable.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 extra_space_mob editSuggestResolution">
                    <div className="form-field">
                      <label>Suggested resolution / additional comments</label>
                      <textarea
                        rows="16"
                        name="comments"
                        id="comments"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comments}
                      ></textarea>
                      {errors.comments && touched.comments ? (
                        <p className="text-danger">{errors.comments}</p>
                      ) : null}
                    </div>
                  </div>
                  {userRole !== "admin" &&
                  <div className="d-flex justify-content-end">
                    <button onClick={setMailTriggerFlag} className="btn main_btn">Submit Claim</button>
                  </div>
                }
                </div>

                <div className="fixed-bottom">
                  <div className="container">
                    <div className="fixed-bottom-inner">
                      <div className="bottom-left-wrap">
                        <h3 className="bottom_head">{manufacturerName}</h3>
                        <p>CLAIM #{claimToEdit.claim_number}</p>
                      </div>
                      {userRole !== "admin" && <div className="bottom-right-wrap">
                        <button
                          type="submit"
                          className="btn black_btn"
                          onClick={() => {
                            setKeepOnSamePage(true);
                            jumpToError();
                          }}
                          disabled={isLoading}
                        >
                          {isLoading ? "Please wait.." : "SAVE & CONTINUE"}
                        </button>
                        <button
                          type="submit"
                          className="btn main_btn main_btn_sm editSubmitBtn"
                          onClick={() => {
                            setKeepOnSamePage(false);
                            jumpToError();
                          }}
                          disabled={isLoading}
                        >
                          {isLoading ? "Please wait.." : "SUBMIT"}
                        </button>
                      </div> }
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </form>

          <Footer />
        </section>
      </div>
    </div>
  );
};

export default EditClaim;
