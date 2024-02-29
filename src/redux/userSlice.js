import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpInstance, { config } from "../axios/axiosConfig";


export const fetchUserProfile = createAsyncThunk(
    'fetchuserprofile',
    async () => {
        const url = `/api/getprofile`;
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data
        return data
    }
    );

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo:{},
        profileInfo: {
            'id': '',
            'firstname': '',
            'lastname': '',
            'email': '',
            'profile_pic': '',
            'role': '',
            'company': '',
            'location': '',
            'address': '',
            'new_password':'',
            'new_profile_pic':'',
        },
        statusCode: 200,
        serverErr: null,
        isLoading: false,
    },
    reducers: {
        logIn: (state, action) => {
            state.userInfo= action.payload;
        },
        logout:(state, action) => {
            state.userInfo= {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.isLoading = true
          });
          builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            const response = action.payload; 
            state.isLoading = false
            const profileData = response?.data;
            const bindProfileData = {
                id: profileData.id,
                firstname: profileData.firstname || "",
                lastname: profileData.lastname || "",
                email: profileData.email || "",
                role: profileData.role || "",
                company: profileData.company || "",
                location: profileData.location || "",
                address: profileData.address || "",
                profile_pic: profileData.profile_pic || "",

              };
            state.profileInfo = bindProfileData;
            state.statusCode = response.code;
          });
          builder.addCase(fetchUserProfile.rejected, (state, action) => {
            state.isLoading = false
            state.serverErr = action.error.message
          });
    },
});

export const { logIn, logout } = userSlice.actions;

export default userSlice.reducer;