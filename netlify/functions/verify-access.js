/*
=========================================================
TOOLERKITDIGEST
CPA ACCESS VERIFICATION
=========================================================
*/

import {
    getConversion
} from "../lib/conversion-store.js";


export default async (request) => {

    try {

        const url =
            new URL(request.url);

        const clickId =
            url.searchParams.get("click_id");


        /*
        A click ID is required.
        */

        if (!clickId) {

            return new Response(

                JSON.stringify({
                    success: false,
                    access: false,
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
        Look for the conversion
        in Netlify Blobs.
        */

        const conversion =
            await getConversion(
                clickId
            );


        /*
        No conversion found.
        */

        if (!conversion) {

            return new Response(

                JSON.stringify({

                    success: true,

                    access: false,

                    message:
                        "CPA completion not verified."

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


        /*
        Make sure the conversion
        has completed status.
        */

        if (
            conversion.status !==
            "completed"
        ) {

            return new Response(

                JSON.stringify({

                    success: true,

                    access: false,

                    message:
                        "CPA completion not verified."

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


        /*
        Access approved.
        */

        return new Response(

            JSON.stringify({

                success: true,

                access: true,

                message:
                    "CPA completion verified.",

                click_id:
                    clickId,

                network:
                    conversion.network

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
            "Access verification error:",
            error
        );


        return new Response(

            JSON.stringify({

                success: false,

                access: false,

                message:
                    "Verification service unavailable."

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