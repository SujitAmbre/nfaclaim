import axios from "axios";
import { resetLocalStorage } from "../utils/helper";
import { errorToast } from "../utils/constants";

// export const BASE_URL = 'https://nfaclaims.mm-dev.agency/backend';
export const BASE_URL = 'https://claims.nationalfloorcoveringalliance.com/backend';

const httpInstance = axios.create({
    baseURL: BASE_URL,
    headers:{
        Accept: 'application/json',
        "content-type": "multipart/form-data"
        // 'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    // 'Access-Control-Allow-Credentials': true,
});

httpInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Unauthorized - Redirect to the login page or any other appropriate route
      localStorage.setItem('_nfa_last_url', window.location.pathname);
      resetLocalStorage();
      window.location.href = '/login';
    } else if(error.response.status === 500) {
      errorToast('Something went wrong, please try after sometime');
    } else {
      // do nothing
    }
    return Promise.reject(error);
  }
);

export const config = async() => {
  const token = await localStorage.getItem('_nfa_token');  
  const headerConfig= {
      headers: {
        Authorization: `Bearer ${token}`,
        
      }
    };
    
    return headerConfig;
  };

export default httpInstance;