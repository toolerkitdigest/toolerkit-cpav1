
/*
=========================================================
TECHDEVRise CPA LANDING PAGE
TRACKING + EMAIL COLLECTION + GEO CPA ROUTING
=========================================================

FLOW:

1. FAQ accordion
2. Tracking initialization
3. Visitor country detection
4. Email validation
5. Silent Google Form submission
6. Facebook Pixel event
7. Google Ads conversion event
8. Country-specific CPA offer
9. Global CPA offer
10. Fallback CPA offer

=========================================================
*/


/* =======================================================
   1. CONFIGURATION
   ======================================================= */


/*
---------------------------------------------------------
FACEBOOK PIXEL
---------------------------------------------------------

Replace:

YOUR_FACEBOOK_PIXEL_ID

with your real Meta/Facebook Pixel ID.

Example:

123456789012345

Leave it unchanged until you have your real ID.
*/

const FACEBOOK_PIXEL_ID =
    "YOUR_FACEBOOK_PIXEL_ID";


/*
---------------------------------------------------------
GOOGLE ADS
---------------------------------------------------------

Replace these with your real Google Ads information.

Example:

GOOGLE_ADS_ID:
AW-123456789

GOOGLE_CONVERSION_LABEL:
AbCdEFghIjK
*/

const GOOGLE_ADS_ID =
    "AW-XXXXXXXXXXX";

const GOOGLE_CONVERSION_LABEL =
    "YOUR_CONVERSION_LABEL";


/*
---------------------------------------------------------
GOOGLE FORM
---------------------------------------------------------

IMPORTANT:

We will replace these when you provide your Google Form.

FORM_ACTION:
Your Google Form formResponse URL.

EMAIL_ENTRY_ID:
The entry ID belonging to the EMAIL field.

Example:

https://docs.google.com/forms/d/e/XXXXXXXX/formResponse

entry.123456789
*/

const GOOGLE_FORM_ACTION =
    "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";

const GOOGLE_FORM_EMAIL_ENTRY =
    "entry.YOUR_EMAIL_ENTRY_ID";


/*
---------------------------------------------------------
CPA OFFERS
---------------------------------------------------------

IMPORTANT:

These are placeholders.

Replace the URLs when you have your actual CPA offers.

The system checks:

1. Country-specific offer
2. Global offer
3. Fallback offer

---------------------------------------------------------
*/

const CPA_OFFERS = {


    /*
    =====================================================
    COUNTRY-SPECIFIC OFFERS
    =====================================================
    */


    NG:
        "https://YOUR-NIGERIA-CPA-OFFER.com",


    US:
        "https://YOUR-USA-CPA-OFFER.com",


    GB:
        "https://YOUR-UK-CPA-OFFER.com",


    CA:
        "https://YOUR-CANADA-CPA-OFFER.com",


    AU:
        "https://YOUR-AUSTRALIA-CPA-OFFER.com",


    ZA:
        "https://YOUR-SOUTH-AFRICA-CPA-OFFER.com",


    /*
    =====================================================
    GLOBAL OFFER
    =====================================================
    */

    GLOBAL:
        "https://YOUR-GLOBAL-CPA-OFFER.com",


    /*
    =====================================================
    FALLBACK OFFER
    =====================================================
    */

    FALLBACK:
        "https://YOUR-FALLBACK-CPA-OFFER.com"

};



/*
=========================================================
COUNTRY DETECTION API
=========================================================

We use an IP-based country detection service.

The visitor's IP address is NOT manually collected
by this script.

The service returns country information.

=========================================================
*/

const GEO_API =
    "https://ipapi.co/json/";



/* =======================================================
   2. GLOBAL STATE
   ======================================================= */


/*
Store visitor country.

Example:

NG
US
GB
CA

*/

let visitorCountry = null;



/*
Store whether country detection succeeded.
*/

let countryDetectionComplete = false;



/* =======================================================
   3. FAQ ACCORDION
   ======================================================= */


document
    .querySelectorAll(".question")
    .forEach(item => {


        item.onclick = function () {


            const answer =
                this.nextElementSibling;


            answer.style.display =
                answer.style.display === "block"
                    ? "none"
                    : "block";


        };


    });



/* =======================================================
   4. FACEBOOK PIXEL
   ======================================================= */


/*
Initialize Facebook Pixel only when a real Pixel ID
has been entered.
*/

function initializeFacebookPixel() {


    if (
        !FACEBOOK_PIXEL_ID ||
        FACEBOOK_PIXEL_ID ===
        "YOUR_FACEBOOK_PIXEL_ID"
    ) {

        console.log(
            "Facebook Pixel is not configured yet."
        );

        return;

    }


    /*
    Facebook Pixel base code
    */

    !function(f,b,e,v,n,t,s)
    {

        if(f.fbq)return;

        n=f.fbq=function(){

            n.callMethod ?
            n.callMethod.apply(n,arguments) :
            n.queue.push(arguments);

        };

        if(!f._fbq)f._fbq=n;

        n.push=n;

        n.loaded=!0;

        n.version='2.0';

        n.queue=[];

        t=b.createElement(e);

        t.async=!0;

        t.src=v;

        s=b.getElementsByTagName(e)[0];

        s.parentNode.insertBefore(t,s);

    }(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
    );


    window.fbq(
        'init',
        FACEBOOK_PIXEL_ID
    );


    window.fbq(
        'track',
        'PageView'
    );


    console.log(
        "Facebook Pixel initialized."
    );

}



/* =======================================================
   5. GOOGLE TAG
   ======================================================= */


/*
Load Google Ads / Google Tag only when configured.
*/

function initializeGoogleTag() {


    if (
        !GOOGLE_ADS_ID ||
        GOOGLE_ADS_ID ===
        "AW-XXXXXXXXXXX"
    ) {

        console.log(
            "Google Ads tag is not configured yet."
        );

        return;

    }


    /*
    Create Google Tag script.
    */

    const script =
        document.createElement("script");


    script.async = true;


    script.src =
        "https://www.googletagmanager.com/gtag/js?id="
        + GOOGLE_ADS_ID;


    document.head.appendChild(script);


    /*
    Google dataLayer
    */

    window.dataLayer =
        window.dataLayer || [];


    function gtag() {

        window.dataLayer.push(
            arguments
        );

    }


    window.gtag = gtag;


    gtag(
        "js",
        new Date()
    );


    gtag(
        "config",
        GOOGLE_ADS_ID
    );


    console.log(
        "Google Ads tag initialized."
    );

}



/* =======================================================
   6. COUNTRY DETECTION
   ======================================================= */


/*
Detect visitor country.

If detection fails, the system will still work.

It will simply use the GLOBAL CPA offer.
*/

async function detectVisitorCountry() {


    try {


        const response =
            await fetch(
                GEO_API,
                {
                    method: "GET",
                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Country detection failed."
            );

        }


        const data =
            await response.json();


        /*
        ipapi returns country_code such as:

        NG
        US
        GB
        CA
        */

        if (
            data &&
            data.country_code
        ) {


            visitorCountry =
                data.country_code
                    .toUpperCase();


            console.log(
                "Visitor country:",
                visitorCountry
            );


        }


    }

    catch(error) {


        console.warn(
            "Country detection unavailable.",
            error
        );


        visitorCountry = null;


    }

    finally {


        countryDetectionComplete = true;


    }

}



/* =======================================================
   7. CPA OFFER ROUTER
   ======================================================= */


/*
Determine which CPA offer should be used.

Priority:

COUNTRY OFFER
       ↓
GLOBAL OFFER
       ↓
FALLBACK OFFER
*/

function getCPAOffer() {


    /*
    ---------------------------------------------
    COUNTRY-SPECIFIC OFFER
    ---------------------------------------------
    */

    if (
        visitorCountry &&
        CPA_OFFERS[visitorCountry]
    ) {


        const countryOffer =
            CPA_OFFERS[visitorCountry];


        if (
            countryOffer &&
            !countryOffer.includes(
                "YOUR-"
            )
        ) {


            console.log(
                "Using country-specific CPA offer:",
                visitorCountry
            );


            return countryOffer;


        }

    }


    /*
    ---------------------------------------------
    GLOBAL OFFER
    ---------------------------------------------
    */

    if (
        CPA_OFFERS.GLOBAL &&
        !CPA_OFFERS.GLOBAL.includes(
            "YOUR-"
        )
    ) {


        console.log(
            "Using global CPA offer."
        );


        return CPA_OFFERS.GLOBAL;


    }


    /*
    ---------------------------------------------
    FALLBACK OFFER
    ---------------------------------------------
    */

    if (
        CPA_OFFERS.FALLBACK &&
        !CPA_OFFERS.FALLBACK.includes(
            "YOUR-"
        )
    ) {


        console.log(
            "Using fallback CPA offer."
        );


        return CPA_OFFERS.FALLBACK;


    }


    /*
    ---------------------------------------------
    NO OFFER CONFIGURED
    ---------------------------------------------
    */

    console.error(
        "No CPA offer has been configured."
    );


    return null;

}



/* =======================================================
   8. EMAIL VALIDATION
   ======================================================= */


function isValidEmail(email) {


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        email
    );

}



/* =======================================================
   9. SILENT GOOGLE FORM SUBMISSION
   ======================================================= */


/*
Submit email silently to Google Forms.

The visitor does NOT leave the landing page.

The request is sent using no-cors because Google Forms
does not provide normal cross-origin AJAX responses.
*/

async function submitEmailToGoogleForm(
    email
) {


    /*
    Don't attempt submission if Google Form
    hasn't been configured yet.
    */

    if (
        GOOGLE_FORM_ACTION.includes(
            "YOUR_FORM_ID"
        ) ||
        GOOGLE_FORM_EMAIL_ENTRY.includes(
            "YOUR_EMAIL_ENTRY_ID"
        )
    ) {


        console.log(
            "Google Form is not configured yet."
        );


        return false;

    }


    try {


        const formData =
            new FormData();


        formData.append(
            GOOGLE_FORM_EMAIL_ENTRY,
            email
        );


        await fetch(
            GOOGLE_FORM_ACTION,
            {
                method: "POST",
                mode: "no-cors",
                body: formData
            }
        );


        console.log(
            "Email submitted to Google Form."
        );


        return true;


    }

    catch(error) {


        console.warn(
            "Google Form submission failed.",
            error
        );


        return false;

    }

}



/* =======================================================
   10. FACEBOOK EVENTS
   ======================================================= */


function trackFacebookEvent(
    eventName,
    parameters = {}
) {


    if (
        typeof window.fbq === "function"
    ) {


        window.fbq(
            "track",
            eventName,
            parameters
        );


        console.log(
            "Facebook event:",
            eventName
        );


    }

}



/*
Track visitor clicking Download.
*/

function trackPreviewClick() {


    trackFacebookEvent(
        "ViewContent",
        {
            content_name:
                "CPA Resource Landing Page"
        }
    );


    /*
    Google event
    */

    if (
        typeof window.gtag === "function"
    ) {


        window.gtag(
            "event",
            "view_content",
            {
                content_name:
                    "CPA Resource Landing Page"
            }
        );


    }

}



/* =======================================================
   11. GOOGLE ADS CONVERSION
   ======================================================= */


function trackGoogleConversion() {


    if (
        typeof window.gtag !== "function"
    ) {


        console.log(
            "Google conversion not available."
        );


        return;

    }


    if (
        !GOOGLE_ADS_ID ||
        GOOGLE_ADS_ID ===
        "AW-XXXXXXXXXXX"
    ) {


        return;

    }


    if (
        !GOOGLE_CONVERSION_LABEL ||
        GOOGLE_CONVERSION_LABEL ===
        "YOUR_CONVERSION_LABEL"
    ) {


        return;

    }


    window.gtag(
        "event",
        "conversion",
        {
            send_to:
                GOOGLE_ADS_ID +
                "/" +
                GOOGLE_CONVERSION_LABEL
        }
    );


    console.log(
        "Google Ads conversion fired."
    );

}



/* =======================================================
   12. MAIN UNLOCK FUNCTION
   ======================================================= */


async function handleUnlock(event) {


    /*
    Stop normal form submission.
    */

    event.preventDefault();


    /*
    Get email.
    */

    const emailInput =
        document.getElementById(
            "visitorEmail"
        );


    const button =
        document.getElementById(
            "unlockButton"
        );


    const message =
        document.getElementById(
            "formMessage"
        );


    const email =
        emailInput.value.trim();



    /*
    ---------------------------------------------
    VALIDATE EMAIL
    ---------------------------------------------
    */

    if (
        !isValidEmail(email)
    ) {


        message.textContent =
            "Please enter a valid email address.";


        message.className =
            "form-message error";


        emailInput.focus();


        return;

    }



    /*
    ---------------------------------------------
    DISABLE BUTTON
    ---------------------------------------------
    */

    button.disabled = true;


    button.textContent =
        "Preparing your access...";



    message.textContent =
        "";



    /*
    ---------------------------------------------
    SILENT EMAIL COLLECTION
    ---------------------------------------------
    */

    await submitEmailToGoogleForm(
        email
    );



    /*
    ---------------------------------------------
    FACEBOOK LEAD EVENT
    ---------------------------------------------
    */

    trackFacebookEvent(
        "Lead",
        {
            content_name:
                "Free Creator Resource"
        }
    );



    /*
    ---------------------------------------------
    GOOGLE ADS CONVERSION
    ---------------------------------------------
    */

    trackGoogleConversion();



    /*
    ---------------------------------------------
    GET CPA OFFER
    ---------------------------------------------
    */

    const offer =
        getCPAOffer();



    /*
    ---------------------------------------------
    NO OFFER
    ---------------------------------------------
    */

    if (!offer) {


        message.textContent =
            "The download is temporarily unavailable. Please try again later.";


        message.className =
            "form-message error";


        button.disabled = false;


        button.textContent =
            "Unlock & Download";


        return;

    }



    /*
    ---------------------------------------------
    SMALL DELAY
    ---------------------------------------------

    Gives tracking events a moment to fire
    before redirecting.
    */

    setTimeout(
        function () {


            window.location.href =
                offer;


        },
        700
    );

}



/* =======================================================
   13. PAGE INITIALIZATION
   ======================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
        Initialize tracking.
        */

        initializeFacebookPixel();


        initializeGoogleTag();


        /*
        Start country detection.

        We do NOT block the page while
        the country API is loading.
        */

        detectVisitorCountry();


        console.log(
            "TechDevRise CPA landing page initialized."
        );


    }
);