import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpInstance, { config } from "../axios/axiosConfig";

const initialState = {
    claimToEdit: {
        claim_id: "",
        manufacturer_id: "",
        claim_number: "",
        invoice_number: "",
        description: "",
        product_type_id: "",
        support_member_id: "",
        price: "",
        quantity: "",
        unit: "",
        your_name: "",
        firstname:"",
        lastname: "",
        phone: "",
        email: "",
        claim_type: "",
        dealer_claim: "",
        project_name: "",
        builder:"",
        unit_lot:"",
        name: "",
        cust_firstname: "",
        cust_lastname: "",
        cust_phone: "",
        cust_email: "",
        address: "",
        cust_zip: "",
        city: "",
        state: "",
        is_defective_product: "",
        installed_date: "",
        rooms_involved: "",
        floors_involved: "",
        sample_available: "",
        space_occupied: "",
        installation_type_id: "",
        adhesive_primer_sealer: "",
        method_of_application: "",
        subfloor_information: "",
        underlayment_type: "",
        perimeter_caulked: "",
        dehumidifier_humidifier: "",
        rental_property: "",
        original_purchaser: "",
        first_noticed: "",
        correction_attempted: "",
        clearner_type: "",
        attachment: "",
        claim_attachments: "",
        comments: "",
        original_purchaser_name: "",
        current_purchaser_name:"",
        claim_status: "",
        frequency_of_cleaning:"",
        manufacturer_claim: "",
        carpet_category: "",
        carpet_question: "",
        location_id: "",
        is_mail_send: '1',
    },

    isLoading: false,
    disableSubmit: false,
    errors: {},
    statusCode: null,
    
}

export const fetchClaim = createAsyncThunk(
    'claim/fetchClaim',
    async (url) => {
        const headerConfig = await config();
        const res = await httpInstance.get(url, headerConfig);
        const data = await res.data
        return data
    }
    );

const claimSlice = createSlice({
    name: 'claim',
    initialState,
    reducers: {
        updateClaimItem: (state, action) => {
            state.claimToEdit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchClaim.pending, (state) => {
            state.isLoading = true
          });
          builder.addCase(fetchClaim.fulfilled, (state, action) => {
            const response = action.payload; 
            state.isLoading = false
            const claimEntry = response?.data;
            const bindClaimData = {
                claim_id: claimEntry.id,
                manufacturer_id: claimEntry.manufacturer_id || "",
                claim_number: claimEntry.claim_number || "",
                invoice_number: claimEntry.invoice_number || "",
                description: claimEntry.description || "",
                product_type_id: claimEntry.product_type_id || "",
                support_member_id: claimEntry.support_member_id || "",
                price: claimEntry.price || "",
                unit: claimEntry.unit || "",
                quantity: claimEntry.quantity || "",
                your_name: claimEntry.your_name || "",
                firstname: claimEntry.firstname || "",
                lastname: claimEntry.lastname || "",
                phone: claimEntry.phone || "",
                email: claimEntry.email || "",
                claim_type: claimEntry.claim_type || "",
                dealer_claim: claimEntry.dealer_claim || "",
                project_name: claimEntry.project_name || "",
                builder: claimEntry.builder || "",
                unit_lot: claimEntry.unit_lot || "",
                name: claimEntry.name || "",
                cust_firstname: claimEntry.cust_firstname || "",
                cust_lastname: claimEntry.cust_lastname || "",
                cust_phone: claimEntry.cust_phone || "",
                cust_email: claimEntry.cust_email || "",
                address: claimEntry.address || "",
                cust_zip: claimEntry.cust_zip || "",
                city: claimEntry.city || "",
                state: claimEntry.state || "",
                is_defective_product: claimEntry.is_defective_product || "",
                installed_date: claimEntry.installed_date || "",
                rooms_involved: claimEntry.rooms_involved || "",
                floors_involved: claimEntry.floors_involved || "",
                sample_available: claimEntry.sample_available || "",
                space_occupied: claimEntry.space_occupied || "",
                installation_type_id: claimEntry.installation_type_id || "",
                adhesive_primer_sealer: claimEntry.adhesive_primer_sealer ? claimEntry.adhesive_primer_sealer.split(',') : "",
                method_of_application: claimEntry.method_of_application || "",
                subfloor_information: claimEntry.subfloor_information || "",
                underlayment_type: claimEntry.underlayment_type || "",
                perimeter_caulked: claimEntry.perimeter_caulked || "",
                dehumidifier_humidifier: claimEntry.dehumidifier_humidifier || "",
                rental_property: claimEntry.rental_property || "",
                original_purchaser: claimEntry.original_purchaser || "",
                first_noticed: claimEntry.first_noticed || "",
                correction_attempted: claimEntry.correction_attempted || "",
                clearner_type: claimEntry.clearner_type || "",
                attachment: claimEntry.attachment || null,
                claim_attachments: claimEntry.claim_attachments || null,
                comments: claimEntry.comments || "",
                original_purchaser_name: claimEntry.original_purchaser_name || "",
                current_purchaser_name: claimEntry.current_purchaser_name || "",
                claim_status: claimEntry.claim_status || "",
                frequency_of_cleaning: claimEntry.frequency_of_cleaning || "",
                manufacturer_claim: claimEntry.manufacturer_claim || "",
                carpet_category: claimEntry.carpet_category || "",
                carpet_question: claimEntry.carpet_question || "",
                location_id: claimEntry.location_id || "",
                is_mail_send: claimEntry.is_mail_send || '0',
              };
            state.claimToEdit = bindClaimData;
            state.statusCode = response.code;
          });
          builder.addCase(fetchClaim.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
          });
    },
});


export const { updateClaimItem } = claimSlice.actions;

export default claimSlice.reducer;

