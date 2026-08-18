/*
=========================================================
TOOLERKITDIGEST
CONVERSION STORAGE
=========================================================

Stores verified CPA conversions using Netlify Blobs.
=========================================================
*/

import { getStore } from "@netlify/blobs";


const conversionStore =
    getStore("cpa-conversions");


/*
Save a completed conversion.
*/

export async function saveConversion(
    clickId,
    conversionData
) {

    const record = {

        click_id: clickId,

        status: "completed",

        network:
            conversionData.network || null,

        offer_id:
            conversionData.offer_id || null,

        offer_name:
            conversionData.offer_name || null,

        payout:
            conversionData.payout || null,

        datetime:
            conversionData.datetime ||
            new Date().toISOString(),

        verified_at:
            new Date().toISOString()

    };


    await conversionStore.setJSON(
        clickId,
        record
    );


    return record;

}


/*
Check whether a visitor completed
a CPA offer.
*/

export async function getConversion(
    clickId
) {

    return await conversionStore.get(
        clickId,
        {
            type: "json",
            consistency: "strong"
        }
    );

}