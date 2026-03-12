import { generate } from "rxjs";

export const environment = {
    production: false,
    apiBaseUrl: 'https://localhost:7189/api',

    endpoints: {
        members: {
            getMembers: 'Members',
            create: 'Members'
        },

        coupon: {
            getAllCoupons: 'Coupons',
            generate: 'Coupons/generate',
            save: 'Coupons/save'
        }
    }
};