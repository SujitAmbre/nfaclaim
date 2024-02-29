import React, { useEffect, useRef } from "react";

const GlobalModal = ({toggleModal, setToggleModal, children}) => {
    const modalRef = useRef('modalRef');
    const modalPrevState = useRef(toggleModal);
  useEffect(() => {
    console.log('modal prev state', modalPrevState);
    if(toggleModal || (!toggleModal && modalPrevState.current === true)) {
        modalRef.current.click();
    }
    
    modalPrevState.current = toggleModal;
  }, [toggleModal])  
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
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>{setToggleModal(false)}}
              ></button>
            </div>
            <div className="modal-body">
            {children}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={()=>{setToggleModal(false)}}
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

export default GlobalModal;
