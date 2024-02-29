import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpInstance, { config } from '../axios/axiosConfig';

const initialState = {
    claimListing: {
        listing: [],
        serverErr: null,
        searchQuery: '',
        isLoading: false,
        page: 1,
        perPage: 10,
        total: 0,
        from: 0,
        to: 0,
        totalRecords: 0,
        statusCode: 200,
        manufacturer: "",
        productType: "",
        fromDate: "",
        toDate: "",
        order: "desc",
        orderBy: "id",
    },
    retailerListing: {
        listing: [],
        serverErr: null,
        searchQuery: '',
        isLoading: false,
        page: 1,
        perPage: 10,
        total: 0,
        from: 0,
        to: 0,
        totalRecords: 0,
        statusCode: 200,
        order: "desc",
        orderBy: "id",
    },
    manufacturerListing: {
        listing: [],
        serverErr: null,
        searchQuery: '',
        isLoading: false,
        page: 1,
        perPage: 10,
        total: 0,
        from: 0,
        to: 0,
        totalRecords: 0,
        statusCode: 200,
        order: "desc",
        orderBy: "id",
    },
    productTypeListing: {
        listing: [],
        serverErr: null,
        searchQuery: '',
        isLoading: false,
        page: 1,
        perPage: 10,
        total: 0,
        from: 0,
        to: 0,
        totalRecords: 0,
        statusCode: 200,
        order: "desc",
        orderBy: "id",
    },
    installationTypeListing: {
        listing: [],
        serverErr: null,
        searchQuery: '',
        isLoading: false,
        page: 1,
        perPage: 10,
        total: 0,
        from: 0,
        to: 0,
        totalRecords: 0,
        statusCode: 200,
        order: "desc",
        orderBy: "id",
    },
    locationListing: {
        listing: [],
        serverErr: null,
        searchQuery: '',
        isLoading: false,
        page: 1,
        perPage: 10,
        total: 0,
        from: 0,
        to: 0,
        totalRecords: 0,
        statusCode: 200,
        order: "desc",
        orderBy: "id",
    },
    salesrepListing: {
        listing: [],
        serverErr: null,
        searchQuery: '',
        isLoading: false,
        page: 1,
        perPage: 10,
        total: 0,
        from: 0,
        to: 0,
        totalRecords: 0,
        statusCode: 200,
        order: "desc",
        orderBy: "id",
    },
    listing: [],
    error: null,
    searchQuery: '',
    isLoading: false,
    page: 1,
    perPage: 10,
    total: 0,
    from: 0,
    to: 0,
    totalRecords: 0,
    statusCode: 200,
};

export const fetchListing = createAsyncThunk(
    'listing/fetchListing',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data
        return data
    }
);

export const fetchClaimListing = createAsyncThunk(
    'claimListing',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data;
        return data;
    }
);

export const fetchRetailerListing = createAsyncThunk(
    'retailerListing',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data;
        return data;
    }
);

export const fetchManufacturerListing = createAsyncThunk(
    'manufacturerListing',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data;
        return data;
    }
);

export const fetchProductTypeListing = createAsyncThunk(
    'productTypeListing',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data;
        return data;
    }
);

export const fetchInstallationTypeListing = createAsyncThunk(
    'installationTypeListing',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data;
        return data;
    }
);

export const fetchLocationListing = createAsyncThunk(
    'locationListing',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data;
        return data;
    }
);
export const fetchSalesrepListing = createAsyncThunk(
    'salesrepListing',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data;
        return data;
    }
);


const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        setPage: (state, action) => {
            
            state[action.payload.listingType].page = action.payload.page;
        },
        setPerPage: (state, action) => {
            state[action.payload.listingType].perPage = action.payload.perPage;
        },
        setSearchQuery: (state, action) => {
            state[action.payload.listingType].searchQuery = action.payload.searchTerm;
        },
        setFromDate: (state, action) => {
            state[action.payload.listingType].fromDate = action.payload.fromDate;
        },
        setToDate: (state, action) => {
            state[action.payload.listingType].toDate = action.payload.toDate;
        },
        setOrder: (state, action) => {
            state[action.payload.listingType].order = action.payload.order;
        },
        setOrderBy: (state, action) => {
            state[action.payload.listingType].orderBy = action.payload.orderBy;
        },
        setManufacturer: (state, action) => {
            state[action.payload.listingType].manufacturer = action.payload.manufacturer;
        },
        setProductType: (state, action) => {
            state[action.payload.listingType].productType = action.payload.productType;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListing.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchListing.fulfilled, (state, action) => {
            const response = action.payload;
            state.isLoading = false
            state.listing = response?.data?.data;
            state.total = Math.ceil(response?.data?.total / state.perPage);
            state.from = response?.data?.from;
            state.to = response?.data?.to;
            state.totalRecords = response?.data?.total;
            state.statusCode = response.code;
        });
        builder.addCase(fetchListing.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        });

        // Claim Listing
        builder.addCase(fetchClaimListing.pending, (state) => {
            state.claimListing.isLoading = true
        });
        builder.addCase(fetchClaimListing.fulfilled, (state, action) => {
            const response = action.payload;
            state.claimListing.isLoading = false
            state.claimListing.listing = response?.data?.data;
            state.claimListing.total = Math.ceil(response?.data?.total / state.claimListing.perPage);
            state.claimListing.from = response?.data?.from;
            state.claimListing.to = response?.data?.to;
            state.claimListing.totalRecords = response?.data?.total;
            state.claimListing.statusCode = response.code;
        });
        builder.addCase(fetchClaimListing.rejected, (state, action) => {
            state.claimListing.isLoading = false
            state.claimListing.serverErr = action.error.message
        });
        // Claim Listing

        // Retailer Listing
        builder.addCase(fetchRetailerListing.pending, (state) => {
            state.retailerListing.isLoading = true
        });
        builder.addCase(fetchRetailerListing.fulfilled, (state, action) => {
            const response = action.payload;
            state.retailerListing.isLoading = false
            state.retailerListing.listing = response?.data?.data;
            state.retailerListing.total = Math.ceil(response?.data?.total / state.retailerListing.perPage);
            state.retailerListing.from = response?.data?.from;
            state.retailerListing.to = response?.data?.to;
            state.retailerListing.totalRecords = response?.data?.total;
            state.retailerListing.statusCode = response.code;
        });
        builder.addCase(fetchRetailerListing.rejected, (state, action) => {
            state.retailerListing.isLoading = false
            state.retailerListing.serverErr = action.error.message
        });
        // Retailer Listing

        // Manufacturer Listing
        builder.addCase(fetchManufacturerListing.pending, (state) => {
            state.manufacturerListing.isLoading = true
        });
        builder.addCase(fetchManufacturerListing.fulfilled, (state, action) => {
            const response = action.payload;
            state.manufacturerListing.isLoading = false
            state.manufacturerListing.listing = response?.data?.data;
            state.manufacturerListing.total = Math.ceil(response?.data?.total / state.manufacturerListing.perPage);
            state.manufacturerListing.from = response?.data?.from;
            state.manufacturerListing.to = response?.data?.to;
            state.manufacturerListing.totalRecords = response?.data?.total;
            state.manufacturerListing.statusCode = response.code;
        });
        builder.addCase(fetchManufacturerListing.rejected, (state, action) => {
            state.manufacturerListing.isLoading = false
            state.manufacturerListing.serverErr = action.error.message
        });
        // Manufacturer Listing

        // ProductType Listing
        builder.addCase(fetchProductTypeListing.pending, (state) => {
            state.productTypeListing.isLoading = true
        });
        builder.addCase(fetchProductTypeListing.fulfilled, (state, action) => {
            const response = action.payload;
            state.productTypeListing.isLoading = false
            state.productTypeListing.listing = response?.data?.data;
            state.productTypeListing.total = Math.ceil(response?.data?.total / state.productTypeListing.perPage);
            state.productTypeListing.from = response?.data?.from;
            state.productTypeListing.to = response?.data?.to;
            state.productTypeListing.totalRecords = response?.data?.total;
            state.productTypeListing.statusCode = response.code;
        });
        builder.addCase(fetchProductTypeListing.rejected, (state, action) => {
            state.productTypeListing.isLoading = false
            state.productTypeListing.serverErr = action.error.message
        });
        // ProductType Listing

        // InstallationType Listing
        builder.addCase(fetchInstallationTypeListing.pending, (state) => {
            state.installationTypeListing.isLoading = true
        });
        builder.addCase(fetchInstallationTypeListing.fulfilled, (state, action) => {
            const response = action.payload;
            state.installationTypeListing.isLoading = false
            state.installationTypeListing.listing = response?.data?.data;
            state.installationTypeListing.total = Math.ceil(response?.data?.total / state.installationTypeListing.perPage);
            state.installationTypeListing.from = response?.data?.from;
            state.installationTypeListing.to = response?.data?.to;
            state.installationTypeListing.totalRecords = response?.data?.total;
            state.installationTypeListing.statusCode = response.code;
        });
        builder.addCase(fetchInstallationTypeListing.rejected, (state, action) => {
            state.installationTypeListing.isLoading = false
            state.installationTypeListing.serverErr = action.error.message
        });
        // InstallationType Listing

         // location Listing
         builder.addCase(fetchLocationListing.pending, (state) => {
            state.locationListing.isLoading = true
        });
        builder.addCase(fetchLocationListing.fulfilled, (state, action) => {
            const response = action.payload;
            state.locationListing.isLoading = false
            state.locationListing.listing = response?.data?.data;
            state.locationListing.total = Math.ceil(response?.data?.total / state.locationListing.perPage);
            state.locationListing.from = response?.data?.from;
            state.locationListing.to = response?.data?.to;
            state.locationListing.totalRecords = response?.data?.total;
            state.locationListing.statusCode = response.code;
        });
        builder.addCase(fetchLocationListing.rejected, (state, action) => {
            state.locationListing.isLoading = false
            state.locationListing.serverErr = action.error.message
        });
        // location Listing

         // Sales rep Listing
         builder.addCase(fetchSalesrepListing.pending, (state) => {
            state.salesrepListing.isLoading = true
        });
        builder.addCase(fetchSalesrepListing.fulfilled, (state, action) => {
            const response = action.payload;
            state.salesrepListing.isLoading = false
            state.salesrepListing.listing = response?.data?.data;
            state.salesrepListing.total = Math.ceil(response?.data?.total / state.salesrepListing.perPage);
            state.salesrepListing.from = response?.data?.from;
            state.salesrepListing.to = response?.data?.to;
            state.salesrepListing.totalRecords = response?.data?.total;
            state.salesrepListing.statusCode = response.code;
        });
        builder.addCase(fetchSalesrepListing.rejected, (state, action) => {
            state.salesrepListing.isLoading = false
            state.salesrepListing.serverErr = action.error.message
        });
        // Sales rep Listing
    },
});

export const { setPage, setPerPage, setSearchQuery, setFromDate, setToDate, setOrder, setOrderBy, setManufacturer, setProductType } = listingSlice.actions;

export default listingSlice.reducer;