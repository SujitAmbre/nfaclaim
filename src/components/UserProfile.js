import React, { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import profilePic from "../assets/images/profile.png";
import { fetchUserProfile } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { withTokenPostAPI } from "../utils/service";
import { useFormik } from "formik";
import { successToast, errorToast } from "../utils/constants";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const profileInfo = useSelector((store) => store.user.profileInfo);
  const { statusCode, serverErr } = useSelector((store) => store.user);

  const initialValues = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    profile_pic: "",
    company: "",
    location: "",
    address: "",
    role: "",
    new_password: "",
    new_profile_pic: "",
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const validationSchemaObj = {
    firstname: yup.string().required("Please enter firstname.").max(30, 'The entered string is too long. Please limit your input to a maximum of 30 characters.'),
    lastname: yup.string().required("Please enter lastname.").max(30, 'The entered string is too long. Please limit your input to a maximum of 30 characters.'),
    email: yup
      .string()
      .email("Please enter valid email.")
      .required("Please enter email."),
    // new_password: yup.string().required('Password is required'),
    // conf_password: yup.string()
    //  .oneOf([yup.ref('new_password'), null], 'Passwords must match')
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

  const handleFormSubmit = async (values) => {
    // console.log(values);
    setIsLoading(true);
    const url = "/api/updateprofile";
    const postForm = await withTokenPostAPI(url, values);

    if (postForm.code === 200) {
      // navigate("/profile");
      setTimeout(() => {
        successToast(postForm.message);
        setShowPasswordForm(false);
      }, 1);
    } else {
      errorToast(postForm.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    dispatch(fetchUserProfile());
  }, [isLoading]);

  useEffect(() => {
    setValues(profileInfo);
  }, [profileInfo]);

  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <div className="inner_wrap">
          <div className="row">
            <div className="col-lg-4 userProfileHeading">
              <h2 className="new_head">User Profile</h2>
            </div>
          </div>

          <div className="new_claim_form_wrapper">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-12 text-center">
                  <img
                    src={values.profile_pic ? values.profile_pic : profilePic}
                    alt="BigCo Inc. logo"
                    className="rounded-circle profilepic"
                  />
                </div>
                <div className="col-lg-12 text-center mt-3">
                  <input
                    type="file"
                    name="new_profile_pic"
                    id="new_profile_pic"
                    placeholder="Profile Picture"
                    onChange={(event) => {
                      setFieldValue(
                        "new_profile_pic",
                        event.currentTarget.files
                      );
                    }}
                    onBlur={(event) => {
                      setFieldValue(
                        "new_profile_pic",
                        event.currentTarget.files
                      );
                    }}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-lg-4">
                  <div className="form-field">
                    <label htmlFor="firstname">First Name<span className="requiredMark">*</span></label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="First Name"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstname && touched.firstname ? (
                      <p className="text-danger">{errors.firstname}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-field">
                    <label htmlFor="lastname">Last Name<span className="requiredMark">*</span></label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Last Name"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastname && touched.lastname ? (
                      <p className="text-danger">{errors.lastname}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-field">
                    <label htmlFor="email">Email<span className="requiredMark">*</span></label>
                    <input
                      type="text"
                      name="email"
                      id="Email"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <p className="text-danger">{errors.email}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-field">
                    <label htmlFor="role">Role</label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      placeholder="role"
                      value={values.role}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-field">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      placeholder="Company"
                      value={values.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.company && touched.company ? (
                      <p className="text-danger">{errors.company}</p>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-field">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address ? (
                      <p className="text-danger">{errors.address}</p>
                    ) : null}
                  </div>
                </div>
                <input type="hidden" name="id" value={values.id} />
              </div>

              <div className="row mb-5">
                <div className="col-lg-12">
                  <button
                    type="button"
                    className="btn main_btn main_btn_sm"
                    onClick={togglePasswordForm}
                  >
                    {showPasswordForm ? 'Cancel Change Password' : 'Change Password'}
                  </button>
                </div>
              </div>
              {
                showPasswordForm
                ? <div>
                <div className="row mt-5">
                  <h3 className="mb-5">User Password</h3>

                  <div className="col-lg-4">
                    <div className="form-field">
                      <label htmlFor="old_password">OLD PASSWORD</label>
                      <input
                        type="password"
                        name="old_password"
                        id="old_password"
                        placeholder="OLD PASSWORD"
                        value={values.old_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-field">
                      <label htmlFor="new_password">NEW PASSWORD</label>
                      <input
                        type="password"
                        name="new_password"
                        id="new_password"
                        placeholder="NEW PASSWORD"
                        value={values.new_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.new_password && touched.new_password ? (
                        <p className="text-danger">{errors.new_password}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-field">
                      <label htmlFor="conf_password">CONFIRM PASSWORD</label>
                      <input
                        type="password"
                        name="conf_password"
                        id="conf_password"
                        placeholder="CONFIRM PASSWORD"
                        value={values.conf_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.conf_password && touched.conf_password ? (
                        <p className="text-danger">{errors.conf_password}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              : null 
              }        
              

              <div className="row">
                <div className="col-lg-12 float-right">
                  <button type="submit" className="btn main_btn main_btn_sm">
                    UPDATE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default UserProfile;
