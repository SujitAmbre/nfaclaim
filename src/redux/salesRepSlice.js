import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpInstance, { config } from "../axios/axiosConfig";

const initialState = {
    salesRepdata : {
        salesrep_id:"",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        location_id: "",
        profile_pic: "",
    },

    isLoading: false,
    disableSubmit: false,
    serverErr: {},
    statusCode: null,
    
}

export const fetchSalesRep = createAsyncThunk(
    'salesrep/fetchSalesRep',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data
        return data
    }
    );

const salesRepSlice = createSlice({
    name: 'salesrep',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSalesRep.pending, (state) => {
            state.isLoading = true
          });
          builder.addCase(fetchSalesRep.fulfilled, (state, action) => {
            const response = action.payload; 
            state.isLoading = false
            const salesRepEntry = response?.data;
            const bindSalesRepData = {
                salesrep_id: salesRepEntry.support_member_id || "",
                firstname: salesRepEntry.firstname || "",
                lastname: salesRepEntry.lastname || "",
                email: salesRepEntry.email || "",
                phone: salesRepEntry.phone || "",
                password: "",
                location_id: salesRepEntry.location_id || "",
                profile_pic: salesRepEntry.profile_pic || "",
              };
            state.salesRepdata = bindSalesRepData;
            state.statusCode = response.code;
          });
          builder.addCase(fetchSalesRep.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
          });
    },
});



// export const { updateClaimItem } = claimSlice.actions;

export default salesRepSlice.reducer;

