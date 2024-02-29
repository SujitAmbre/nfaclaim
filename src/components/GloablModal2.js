import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { masterFormFields } from "../utils/masterFormFields";
import { useDispatch } from "react-redux";
import { pushToAddOrEdit, setErrors, updateItem } from "../redux/masterDataSlice";
import { toast } from "react-toastify";
import httpInstance from "../axios/axiosConfig";

const GlobalModal2 = ({updateList}) => {
    const dispatch = useDispatch();
    const { popupStatus, actionUrl, method, itemType, itemToModify, popupTitle } = useSelector((store) => store.master.masterData);
    const errors = useSelector((store) => store.master.errors)
    // let itemToModify = useSelector((store) => store.master.masterData.itemToModify );
    const [formFields, setFormFields] = useState([]);
    const modalRef = useRef('modalRef');
    const modalCloseRef = useRef('modalCloseRef');
    const [submitBtnTxt, setSubmitBtnTxt] = useState('Submit');
    const [submitBtnDisabledStatus, setSubmitBtnDisabledStatus] = useState(false);
    
  useEffect(() => {
    if(popupStatus) {
        modalRef.current.click();
    } else {
        modalCloseRef.current.click();
    }
    
    
  }, [popupStatus]);
  
  useEffect(() => {
    if(masterFormFields[itemType]) {
        setFormFields(masterFormFields[itemType]);
    } else {
        setFormFields([]);
    }  
  }, [itemType]);

  const handleModalEmpty = () => {
    const buildObject = {
      itemType: "",
      actionUrl: "",
      method: "",
      popupStatus: false,
      itemToModify: {}
    };

    dispatch(pushToAddOrEdit(buildObject));
  };

  const handleFormFieldUpdate = (fieldName, fieldValue) => {
    const updatedObj = {...itemToModify};
    updatedObj[fieldName] = fieldValue;
    dispatch(updateItem(updatedObj));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addOrEditItem();
  }

  const addOrEditItem = async() => {
    dispatch(setErrors([]));
    setSubmitBtnTxt("Please wait...");
    setSubmitBtnDisabledStatus(true);
    const getToken = localStorage.getItem("_nfa_token");
    const config = {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    };

    try {
      
      const addUpdateItem = await httpInstance.post(actionUrl, itemToModify, config);
      if (addUpdateItem.data.status) {
        handleModalEmpty();
        toast.success(addUpdateItem.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        updateList();
      } else {
        console.log(addUpdateItem);
      }
    } catch (error) {
    //   console.log(error);
    //   setErrors(error?.response?.data?.errors);
        const responseStatus = error?.response?.status;
        switch(responseStatus) {
            case 500:
                toast.error("Error in processing your request, please try after some time.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            return
            default:
                dispatch(setErrors(error?.response?.data?.errors)); 
            return
        }
        
    } finally {
      setSubmitBtnTxt("Submit");
      setSubmitBtnDisabledStatus(false);
    }
  }
  
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={modalRef}
        style={{display:'none'}}
      >
        
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {popupTitle}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={modalCloseRef}
                onClick={handleModalEmpty}
              ></button>
            </div>
            <div className="modal-body">
            {/* html here */}
            <form
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        > 
         {
            formFields.map((item, key) => {
                if(item.type === 'checkbox') {
                    return (
                        <div className="mb-3" key={key}>
                            <input
                            type={item.type}
                            className={item.class}
                            name={item.name}
                            id={item.id}
                            placeholder={item.placeholder}
                            value={1}
                            defaultChecked={parseInt(itemToModify[item.name]) === 1 ? true : false}
                            onChange={(e) => {
                                e.target.checked ? handleFormFieldUpdate(item.name, '1') : handleFormFieldUpdate(item.name, '0');
                            }}
                            />
                            &nbsp;
                            <label htmlFor={item.name} className="form-label">
                            {item.label}
                            </label>
                            {errors[item.name] ? (
                            <div className="form-error">{errors[item.name][0]}</div>
                            ) : null}
                        </div>
                    );
                } else {
                    return (
                        <div className="mb-3" key={key}>
                            <label htmlFor={item.name} className="form-label">
                            {item.label}
                            {(typeof item.required !=='undefined' && item.required) ? <span className="requiredMark">*</span> : null}
                            </label>
                            <input
                            type={item.type}
                            className={item.class}
                            name={item.name}
                            id={item.id}
                            placeholder={item.placeholder}
                            value={itemToModify[item.name] ?? ""}
                            onChange={(e) => {
                                handleFormFieldUpdate(item.name, e.target.value)
                            }}
                            autoComplete="off"
                            />
                            {errors[item.name] ? (
                            <div className="form-error">{errors[item.name][0]}</div>
                            ) : null}
                        </div>
                    );
                }
                
            })
         }  
          <input
            type="hidden"
            name="popup_product_type_id"
            value={itemToModify.id ?? ""}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitBtnDisabledStatus}
          >
            {submitBtnTxt}
          </button>
        </form>
            {/* html here */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleModalEmpty}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalModal2;
