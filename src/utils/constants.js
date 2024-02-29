import { toast } from "react-toastify";

export const CLAIM_TYPE = ['Damaged (Material Only)','Installed','Returned (Material Only)'];
export const YES_NO_OPTIONS = ['Yes', 'No'];
export const CLEARNER_OPTIONS = ['Dry Mop','Vinegar','Water','Wet Mop'];
export const UNDERLAYMENT_OPTIONS = ['Cushion','Pad'];
export const STATES_ARRAY = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
export const ADHESIVE_OPTIONS = ['Adhesive', 'Primer', 'Sealer'];
export const UNIT_OPTION = ['Cartons','Piece','Square Feet','Square Yards'];
export const INSTALLATION_TYPES_HARD_SURFACE = ['Floating','Glue Down','I don’t know','Loose Lay','Nail Down','Other'];
export const INSTALLATION_TYPES_SOFT_SURFACE = ['Glue Down','I don’t know','Other','Stretch In'];
export const menuItems = {
    admin: [
        {
            menu_label: 'Retailers',
            menu_link: '/retailers/list',
            menu_id: 'retailers'
        },
        {
            menu_label: 'Manufacturers',
            menu_link: '/manufacturers/list',
            menu_id: 'manufacturers'
        },
        {
            menu_label: 'Product Types',
            menu_link: '/product-type/list',
            menu_id: 'product_types'
        },
        {
            menu_label: 'Installation Types',
            menu_link: '/installation-type/list',
            menu_id: 'installation_type'
        },
    ],
    retailer: [
        {
            menu_label: 'Create Claim',
            menu_link: '/create-claim',
            menu_id: 'create-claim'
        },
        {
            menu_label: 'Claims Analysts',
            menu_link: '/sales-rep/list',
            menu_id: 'sales_reps'
        },
        {
            menu_label: 'Location',
            menu_link: '/location/list',
            menu_id: 'location'
        },
    ],
    support_members: [
        {
            menu_label: 'Create Claim',
            menu_link: '/create-claim',
            menu_id: 'create-claim'
        },
    ]
}


export const errorToast = (msg) => {
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
}

export const successToast = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
}
