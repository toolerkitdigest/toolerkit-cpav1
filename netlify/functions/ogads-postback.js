/*
=========================================================
TOOLERKITDIGEST
OGADS POSTBACK ENDPOINT
=========================================================

Receives conversion notifications from OGAds.

OGAds sends:

{aff_sub}
{payout}
{offer_id}
{offer_name}
{session_ip}
{datetime}

We use aff_sub as our visitor click ID.
=========================================================
*/

export default async (request) => {

    try {

        /*
        Read parameters sent by OGAds.
        */

        const url =
            new URL(request.url);

        const clickId =
            url.searchParams.get("click_id");

        const payout =
            url.searchParams.get("payout");

        const offerId =
            url.searchParams.get("offer_id");

        const offerName =
            url.searchParams.get("offer_name");

        const sessionIp =
            url.searchParams.get("session_ip");

        const datetime =
            url.searchParams.get("datetime");


        /*
        Log the conversion information.

        We will later replace this temporary
        logging system with persistent storage.
        */

        console.log(
            "OGAds conversion received:",
            {
                clickId,
                payout,
                offerId,
                offerName,
                sessionIp,
                datetime
            }
        );


        /*
        Make sure OGAds supplied our click ID.
        */

        if (!clickId) {

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
        Successful test response.
        */

        return new Response(

            JSON.stringify({

                success: true,

                message:
                    "OGAds conversion received.",

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
