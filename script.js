/*
=========================================================
TOOLERKITDIGEST
SMART LINK LANDING PAGE
=========================================================

FLOW:

1. FAQ accordion
2. Tracking initialization
3. Email validation
4. Silent Google Form submission
5. Facebook Pixel event
6. Google Ads conversion event
7. Redirect visitor to Smart Link

=========================================================
*/


/* =======================================================
   1. CONFIGURATION
   ======================================================= */


/*
---------------------------------------------------------
FACEBOOK PIXEL
---------------------------------------------------------
*/

const FACEBOOK_PIXEL_ID =
    "YOUR_FACEBOOK_PIXEL_ID";


/*
---------------------------------------------------------
GOOGLE ADS
---------------------------------------------------------
*/

const GOOGLE_ADS_ID =
    "AW-XXXXXXXXXXX";

const GOOGLE_CONVERSION_LABEL =
    "YOUR_CONVERSION_LABEL";


/*
---------------------------------------------------------
GOOGLE FORM
---------------------------------------------------------
*/

const GOOGLE_FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLScdMB3gFQPSDkiC7_WpUMbSO49GoiKNbMeiZZ0aO9VgBQPYCg/formResponse";

const GOOGLE_FORM_EMAIL_ENTRY =
    "entry.1038039629";


/*
---------------------------------------------------------
SMART LINK
---------------------------------------------------------

This Smart Link automatically handles:

- Available offers
- Visitor matching
- Offer completion
- Successful conversion redirect
- Fallback URL

---------------------------------------------------------
*/

const SMART_LINK =
    "https://appsave.store/sl/n1o66";



/* =======================================================
   2. FAQ ACCORDION
   ======================================================= */


document
    .querySelectorAll(".question")
    .forEach(item => {


        item.onclick =
            function () {


                const answer =
                    this.nextElementSibling;


                answer.style.display =
                    answer.style.display === "block"
                        ? "none"
                        : "block";


            };


    });



/* =======================================================
   3. FACEBOOK PIXEL
   ======================================================= */


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


    !function(f,b,e,v,n,t,s)
    {


        if(f.fbq)return;


        n=f.fbq=function(){


            n.callMethod
                ? n.callMethod.apply(
                    n,
                    arguments
                )
                : n.queue.push(
                    arguments
                );


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

        s.parentNode.insertBefore(
            t,
            s
        );


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
   4. GOOGLE TAG
   ======================================================= */


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


    const script =
        document.createElement(
            "script"
        );


    script.async =
        true;


    script.src =
        "https://www.googletagmanager.com/gtag/js?id="
        + GOOGLE_ADS_ID;


    document.head.appendChild(
        script
    );


    window.dataLayer =
        window.dataLayer || [];


    function gtag() {


        window.dataLayer.push(
            arguments
        );


    }


    window.gtag =
        gtag;


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
   5. EMAIL VALIDATION
   ======================================================= */


function isValidEmail(
    email
) {


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        email
    );


}



/* =======================================================
   6. SILENT GOOGLE FORM SUBMISSION
   ======================================================= */


async function submitEmailToGoogleForm(
    email
) {


    /*
    Don't attempt submission if the
    Google Form is not configured.
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


                method:
                    "POST",


                mode:
                    "no-cors",


                body:
                    formData


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
   7. FACEBOOK EVENT TRACKING
   ======================================================= */


function trackFacebookEvent(
    eventName,
    parameters = {}
) {


    if (
        typeof window.fbq ===
        "function"
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



/* =======================================================
   8. GOOGLE ADS CONVERSION
   ======================================================= */


function trackGoogleConversion() {


    if (
        typeof window.gtag !==
        "function"
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



async function handleUnlock(event) {

    /*
    Stop normal form submission.
    */

    event.preventDefault();


    /*
    Get page elements.
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
    Validate email.
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
    Disable button.
    */

    button.disabled = true;


    button.textContent =
        "Preparing your ebook...";


    message.textContent =
        "We are preparing your download...";


    /*
    Start email submission.

    IMPORTANT:
    We do NOT wait for Google Forms.
    */

    submitEmailToGoogleForm(email)
        .catch(function (error) {

            console.warn(
                "Background email submission failed:",
                error
            );

        });


    /*
    Facebook Lead event.
    */

    trackFacebookEvent(
        "Lead",
        {

            content_name:
                "Free Creator Resource"

        }
    );


    /*
    Google Ads event.
    */

    trackGoogleConversion();


    /*
    Redirect to Smart Link.

    This will happen even if Google Forms
    is slow or unavailable.
    */

    setTimeout(
        function () {

            window.location.href =
                SMART_LINK;

        },
        700
    );

}


    /*
    Stop normal form submission.
    */

    event.preventDefault();


    /*
    Get page elements.
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
        !isValidEmail(
            email
        )
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

    button.disabled =
        true;


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
    GOOGLE ADS CONVERSION EVENT
    ---------------------------------------------
    */

    trackGoogleConversion();



    /*
    ---------------------------------------------
    REDIRECT TO SMART LINK
    ---------------------------------------------

    The Smart Link handles:

    - Offer selection
    - Available offers
    - Offer completion
    - Successful conversion
    - Redirect to thank-you.html
    - Fallback URL
    */

    setTimeout(
        function () {


            window.location.href =
                SMART_LINK;


        },
        700
    );


}


/* =======================================================
   10. PAGE INITIALIZATION
   ======================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
        Initialize Facebook Pixel.
        */

        initializeFacebookPixel();


        /*
        Initialize Google Tag.
        */

        initializeGoogleTag();


        /*
        Connect the form to handleUnlock().
        */

        const unlockForm =
            document.getElementById(
                "unlockForm"
            );


        if (
            unlockForm
        ) {


            unlockForm.addEventListener(
                "submit",
                handleUnlock
            );


            console.log(
                "Unlock form connected successfully."
            );


        } else {


            console.error(
                "Unlock form was not found."
            );


        }


        console.log(
            "ToolerKitDigest Smart Link landing page initialized."
        );


    }
);


/* =======================================================
   7. COUNTRY DETECTION
   ======================================================= */

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
   8. CPA OFFER ROUTER
   ======================================================= */

function getCPAOffer() {

    /*
    COUNTRY-SPECIFIC OFFER
    */

    if (
        visitorCountry &&
        CPA_OFFERS[visitorCountry]
    ) {

        const countryOffer =
            CPA_OFFERS[visitorCountry];


        if (
            countryOffer &&
            !countryOffer.includes("YOUR-")
        ) {

            console.log(
                "Using country-specific CPA offer:",
                visitorCountry
            );


            return countryOffer;

        }

    }


    /*
    GLOBAL OFFER
    */

    if (
        CPA_OFFERS.GLOBAL &&
        !CPA_OFFERS.GLOBAL.includes("YOUR-")
    ) {

        console.log(
            "Using global CPA offer."
        );


        return CPA_OFFERS.GLOBAL;

    }


    /*
    FALLBACK OFFER
    */

    if (
        CPA_OFFERS.FALLBACK &&
        !CPA_OFFERS.FALLBACK.includes("YOUR-")
    ) {

        console.log(
            "Using fallback CPA offer."
        );


        return CPA_OFFERS.FALLBACK;

    }


    console.error(
        "No CPA offer has been configured."
    );


    return null;

}


/* =======================================================
   9. ADD CLICK ID TO CPA OFFER
   ======================================================= */

function buildCPAOfferUrl(offer) {

    if (!offer) {

        return null;

    }


    /*
    Always use the current global click ID.
    */

    const clickId =
        window.visitorClickId;


    if (!clickId) {

        console.warn(
            "No visitor click ID available."
        );


        return offer;

    }


    try {

        const url =
            new URL(offer);


        /*
        Send our click ID to OGAds/CPA network
        using aff_sub.
        */

        url.searchParams.set(
            "aff_sub",
            clickId
        );


        console.log(
            "CPA tracking URL:",
            url.toString()
        );


        return url.toString();

    }

    catch(error) {

        console.error(
            "Unable to build CPA offer URL:",
            error
        );


        return offer;

    }

}


/* =======================================================
   10. EMAIL VALIDATION
   ======================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        email
    );

}


/* =======================================================
   11. SILENT GOOGLE FORM SUBMISSION
   ======================================================= */

async function submitEmailToGoogleForm(
    email
) {

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
   12. FACEBOOK EVENTS
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


/* =======================================================
   13. CONTENT VIEW TRACKING
   ======================================================= */

function trackPreviewClick() {

    trackFacebookEvent(
        "ViewContent",
        {
            content_name:
                "CPA Resource Landing Page"
        }
    );


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
   14. GOOGLE ADS CONVERSION
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
   15. MAIN UNLOCK FUNCTION
   ======================================================= */

async function handleUnlock(event) {

    event.preventDefault();


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


    if (!emailInput || !button) {

        console.error(
            "Required form elements were not found."
        );

        return;

    }


    const email =
        emailInput.value.trim();


    /*
    VALIDATE EMAIL
    */

    if (
        !isValidEmail(email)
    ) {

        if (message) {

            message.textContent =
                "Please enter a valid email address.";

            message.className =
                "form-message error";

        }


        emailInput.focus();


        return;

    }


    /*
    DISABLE BUTTON
    */

    button.disabled = true;


    button.textContent =
        "Preparing your access...";


    if (message) {

        message.textContent =
            "We are preparing your download, wait .......";

        message.className =
            "form-message";

    }


    /*
    -------------------------------------------------------
    MAKE SURE CLICK ID EXISTS
    -------------------------------------------------------
    */

    if (!clickIdReady) {

        await initializeClickId();

    }


    /*
    -------------------------------------------------------
    EMAIL COLLECTION
    -------------------------------------------------------
    */

    await submitEmailToGoogleForm(
        email
    );


    /*
    -------------------------------------------------------
    FACEBOOK LEAD
    -------------------------------------------------------
    */

    trackFacebookEvent(
        "Lead",
        {
            content_name:
                "Free Creator Resource"
        }
    );


    /*
    -------------------------------------------------------
    GOOGLE ADS CONVERSION
    -------------------------------------------------------
    */

    trackGoogleConversion();


    /*
    -------------------------------------------------------
    GET BASE CPA OFFER
    -------------------------------------------------------
    */

    const baseOffer =
        getCPAOffer();


    /*
    -------------------------------------------------------
    BUILD TRACKED CPA URL
    -------------------------------------------------------
    */

    const offer =
        buildCPAOfferUrl(
            baseOffer
        );


    /*
    -------------------------------------------------------
    NO OFFER
    -------------------------------------------------------
    */

    if (!offer) {

        if (message) {

            message.textContent =
                "The download is temporarily unavailable. Please try again later.";

            message.className =
                "form-message error";

        }


        button.disabled = false;


        button.textContent =
            "Unlock & Download";


        return;

    }

    /*
    -------------------------------------------------------
    REDIRECT
    -------------------------------------------------------

    Small delay gives tracking systems time to fire.
    */

    setTimeout(
        function () {

            window.location.href =
                offer;

        },
        1200
    );

}


/* =======================================================
   16. PAGE INITIALIZATION
   ======================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        /*
        Initialize tracking.
        */

        initializeFacebookPixel();

        initializeGoogleTag();


        /*
        Initialize visitor click ID.
        */

        await initializeClickId();


        /*
        Detect visitor country.
        */

        detectVisitorCountry();


        console.log(
            "ToolerKitDigest CPA landing page initialized."
        );

    }
);
