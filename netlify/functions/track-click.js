/*
=========================================================
TOOLERKITDIGEST
VISITOR CLICK ID GENERATOR
=========================================================
*/

function generateClickId() {

    const randomPart =
        crypto.randomUUID().replace(/-/g, "");

    return "tdr_" + randomPart;

}


export default async (request) => {

    /*
    Generate a unique visitor/click ID
    */

    const clickId =
        generateClickId();


    /*
    Return the ID to the landing page
    */

    return new Response(

        JSON.stringify({

            success: true,

            click_id: clickId

        }),

        {

            status: 200,

            headers: {

                "Content-Type":
                    "application/json",

                "Cache-Control":
                    "no-store"

            }

        }

    );

};