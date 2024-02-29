import {configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import masterReducer from './masterDataSlice';
import listingReducer from './listingSlice';
import claimReducer from './claimSlice';
import generalReducer from './generalSlice';
import salesRepReducer from './salesRepSlice';


const appStore = configureStore({
    reducer: {
        user: userReducer,
        master: masterReducer,
        listing: listingReducer,
        claim: claimReducer,
        general: generalReducer,
        salesrep: salesRepReducer,
        
    },
    
    
});

export default appStore;