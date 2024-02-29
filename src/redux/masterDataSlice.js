import {createSlice} from '@reduxjs/toolkit';

const masterDataSlice = createSlice({
    name: 'masterData',
    initialState: {
        masterData:{
            itemType: "",
            actionUrl: "",
            method: "",
            popupStatus: false,
            popupTitle: "",
            itemToModify: {}
        },
        errors: []
    },
    reducers: {
        pushToAddOrEdit: (state, action) => {
            state.masterData= action.payload;
        },
        updateItem: (state, action) => {
            state.masterData.itemToModify = action.payload;
        },
        hidePopup: (state, action) => {
            state.masterData.popupStatus = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        
    }
});

export const { pushToAddOrEdit, updateItem, hidePopup, setErrors } = masterDataSlice.actions;

export default masterDataSlice.reducer;