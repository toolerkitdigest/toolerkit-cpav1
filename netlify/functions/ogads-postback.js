/*
=========================================================
TOOLERKITDIGEST
OGADS POSTBACK
=========================================================
*/

import {
    saveConversion
} from "../lib/conversion-store.js";


export default async (request) => {

    try {

        const url =
            new URL(request.url);


        /*
        OGAds sends its {aff_sub} value
        into our click_id parameter.
        */

        const clickId =
            url.searchParams.get(
                "click_id"
            );


        const payout =
            url.searchParams.get(
                "payout"
            );


        const offerId =
            url.searchParams.get(
                "offer_id"
            );


        const offerName =
            url.searchParams.get(
                "offer_name"
            );


        const sessionIp =
            url.searchParams.get(
                "session_ip"
            );


        const datetime =
            url.searchParams.get(
                "datetime"
            );


        /*
        A click ID is required.
        */

        if (!clickId) {

            console.error(
                "OGAds postback missing click ID."
            );


            return new Response(

                JSON.stringify({

                    success: false,

                    message:
                        "Missing click ID."

                }),

                {
                    status: 400,

                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }

            );

        }


        /*
        Save the verified conversion.
        */

        const conversion =
            await saveConversion(

                clickId,

                {

                    network:
                        "OGADS",

                    offer_id:
                        offerId,

                    offer_name:
                        offerName,

                    payout:
                        payout,

                    session_ip:
                        sessionIp,

                    datetime:
                        datetime

                }

            );


        console.log(
            "OGAds conversion saved:",
            conversion
        );


        /*
        Tell OGAds that we received
        the conversion successfully.
        */

        return new Response(

            JSON.stringify({

                success: true,

                message:
                    "OGAds conversion verified and saved.",

                click_id:
                    clickId

            }),

            {

                status: 200,

                headers: {

                    "Content-Type":
                        "application/json"

                }

            }

        );

    }

    catch (error) {

        console.error(
            "OGAds postback error:",
            error
        );


        return new Response(

            JSON.stringify({

                success: false,

                message:
                    "Server error."

            }),

            {

                status: 500,

                headers: {

                    "Content-Type":
                        "application/json"

                }

            }

        );

    }

};