import axios from 'axios';
import httpInstance, { config } from '../axios/axiosConfig';
import { toast } from 'react-toastify';

export const plainGetAPI = async() => {
    // do something here
};

export const withTokenGetAPI = async(url) => {
    try {
        const headersConfig = await config();
        const res = await httpInstance.get(url, headersConfig);
        const data = await res.data
        return data;
    } catch(error) {
        const responseStatus = error?.response?.status;
        const msg = error?.response?.data?.message;
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
            return;
            default:
                toast.error(msg, {
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
        }
    } finally {
        // do nothing
    }
    
};

export const withTokenPostAPI = async(url, postData) => {
    try {
        const headersConfig = await config();
        const res = await httpInstance.post(url, postData, headersConfig);
        const data = await res.data;
        return data;
    } catch(error) {
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
            return;
            case 403:
                const getErrors = error?.response?.data?.errors;
                const msg = error?.response?.data?.message;
                const data = {
                    code: responseStatus, 
                    success: false, 
                    message: msg, 
                    data: [],
                    error: getErrors,
                }
                toast.error(msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            return data;
            default:
                // do nothing 
            return
        }
    } finally {
        // do nothing
    }
    
}

