import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import "yup-phone-lite";
import { withTokenGetAPI, withTokenPostAPI } from "../utils/service";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesRep } from "../redux/salesRepSlice";
import Select from "react-select";
import { successToast, errorToast } from "../utils/constants";
import "yup-phone-lite";
import InputMask from 'react-input-mask';

const EditSalseRep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const { salesrep_id } = useParams();
  const salesRepdata = useSelector((store) => store.salesrep.salesRepdata);
  const initialValues = {
    salesrep_id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    location_id: "",
    profile_pic: "",
  };
  useEffect(() => {
    getLocationList();
  }, []);

  const getLocationList = async () => {
    const url = `/api/location/list?pagesize=1000`;
    const manList = await withTokenGetAPI(url);
    const { code, success, message, data } = manList;
    if (code !== 200) {
      console.log(message);
    }
    const locationData = data?.data;
    const finalLocations = locationData.map((item, key) => {
      return { value: item.id, label: item.location_name };
    });

    setLocationList(finalLocations);
  };

  const validationSchemaObj = {
    firstname: yup
      .string()
      .required("Please enter firstname.")
      .max(
        30,
        "The entered string is too long. Please limit your input to a maximum of 30 characters."
      ),
    lastname: yup
      .string()
      .required("Please enter lastname.")
      .max(
        30,
        "The entered string is too long. Please limit your input to a maximum of 30 characters."
      ),
    email: yup
      .string()
      .required()
      .email("Please enter valid email.")
      .required("Please enter email."),
    // password: yup.string().required("Please enter Password."),
    phone: yup
        .string()
        .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone number')
        .required("This is required field."),
    attachment: yup
      .mixed()
      .nullable()
      .test("fileSize", "File Size is too large", (value) => {
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > 50000) {
              return false;
            }
          }
        }
        return true;
      }),
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
    if (isLoading) return;
    const url = `/api/support_member/show/${salesrep_id}`;
    dispatch(fetchSalesRep(url));
  }, [isLoading]);

  useEffect(() => {
    setValues(salesRepdata);
  }, [salesRepdata]);

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
    const url = `/api/support_member/update/${values.salesrep_id}`;

    if (values.attachment) {
      values = { ...values, attachment: [...values.attachment] };
    }
    const postForm = await withTokenPostAPI(url, values);
    if (postForm.code === 200) {
      setTimeout(() => {
        successToast(postForm.message);
      }, 1);
    } else {
      errorToast(postForm.message);
    }
    setIsLoading(false);
  };
  
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <div className="inner_wrap">
          <div className="edit_claim_form_wrapper">
            <div className="edit_claim_form">
              <h2 className="new_head">Edit Claims Analyst</h2>
              <form onSubmit={handleSubmit}>
                <div className="new_claim_form_wrapper">
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="firstname">First Name<span className="requiredMark">*</span></label>
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          placeholder="First Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstname}
                        />
                        {errors.firstname && touched.firstname ? (
                          <p className="text-danger">{errors.firstname}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="lastname">Last Name<span className="requiredMark">*</span></label>
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder="Last Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastname}
                        />
                        {errors.lastname && touched.lastname ? (
                          <p className="text-danger">{errors.lastname}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="email">Email<span className="requiredMark">*</span></label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          placeholder="name@domain.com"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email ? (
                          <p className="text-danger">{errors.email}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="phone">Phone<span className="requiredMark">*</span></label>
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
                    {/* <div className="col-xs-12 col-sm-6 col-md-4">
                                <div className="form-field">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched.password ? (
                                        <p className="text-danger">{errors.password}</p>
                                    ) : null}
                                </div>
                            </div> */}
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className="form-field custom_dropdown_wrapper">
                        <label htmlFor="location_id">Store Location</label>
                        { console.log(values.locations) }
                        <Select
                          id="location_id"
                          name="location_id"
                          options={locationList}
                          isMulti
                          onChange={(selectedOptions) =>
                            setFieldValue("location_id", selectedOptions)
                          }
                          value={values.location_id}
                         
                        />
                        {errors.location_id && touched.location_id ? (
                          <p className="text-danger">{errors.location_id}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-sm-12 col-sm-6 col-md-4">
                      <div className="form-field">
                        <label htmlFor="profile_pic">Upload Profile</label>
                        <input
                          type="file"
                          name="profile_pic"
                          id="profile_pic"
                          placeholder="Profile Picture"
                          onChange={(event) => {
                            setFieldValue(
                              "profile_pic",
                              event.currentTarget.files
                            );
                          }}
                          onBlur={(event) => {
                            setFieldValue(
                              "profile_pic",
                              event.currentTarget.files
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className="btn main_btn main_btn_sm"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EditSalseRep;
