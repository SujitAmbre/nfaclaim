import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpInstance, { config } from "../axios/axiosConfig";

export const getClaimsByManufacturer = createAsyncThunk(
  "getClaimsByManufacturer",
  async () => {
    const url = "/api/manufacturercount";
    const headerConfig = await config();
    const res = await httpInstance.get(url, headerConfig);
    const data = await res.data;
    return data;
  }
);

export const getClaimsByProductType = createAsyncThunk(
  "getClaimsByProductType",
  async () => {
    const url = "/api/producttypecount";
    const headerConfig = await config();
    const res = await httpInstance.get(url, headerConfig);
    const data = await res.data;
    return data;
  }
);

export const getClaimsByAmount = createAsyncThunk(
  "getClaimsByAmunt",
  async () => {
    const url = "/api/claimamount";
    const headerConfig = await config();
    const res = await httpInstance.get(url, headerConfig);
    const data = await res.data;
    return data;
  }
);

const generalSlice = createSlice({
  name: "general",
  initialState: {
    loader: false,
    error: null,
    claimsByManufacturer: {
      claims: [],
      total: 0,
    },
    claimsByProductType: {
      claims: [],
      total: 0,
    },
    claimsByAmount: {
      claims: [],
      total: 0,
    },
  },
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClaimsByManufacturer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClaimsByManufacturer.fulfilled, (state, action) => {
      const response = action.payload;
      state.isLoading = false;
      console.log(response);
      state.claimsByManufacturer.claims = response?.data?.claims;
      state.claimsByManufacturer.total = response?.data?.total_count;
    });
    builder.addCase(getClaimsByManufacturer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(getClaimsByProductType.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClaimsByProductType.fulfilled, (state, action) => {
      const response = action.payload;
      state.isLoading = false;
      state.claimsByProductType.claims = response?.data?.claims;
      state.claimsByProductType.total = response?.data?.total_count;
    });
    builder.addCase(getClaimsByProductType.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(getClaimsByAmount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClaimsByAmount.fulfilled, (state, action) => {
      const response = action.payload;
      state.isLoading = false;
      state.claimsByAmount.claims = response?.data?.claims;
      state.claimsByAmount.total = response?.data?.total_count;
    });
    builder.addCase(getClaimsByAmount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setLoader } = generalSlice.actions;

export default generalSlice.reducer;
