/* =======================================================
   TOOLERKITDIGEST CPA LANDING PAGE
   CLICK ID + TRACKING + EMAIL + GEO CPA ROUTING
   ======================================================= */


/* =======================================================
   1. VISITOR CLICK ID
   ======================================================= */

let visitorClickId = null;

let clickIdReady = false;


/*
Generate/retrieve a unique CPA click ID.
*/

async function initializeClickId() {

    try {

        /*
        Check whether this visitor already has
        a click ID stored in the browser.
        */

        visitorClickId =
            localStorage.getItem("tdr_click_id");


        /*
        If there is no existing ID,
        request a new one from Netlify.
        */

        if (!visitorClickId) {

            const response =
                await fetch("/api/track-click", {
                    method: "GET",
                    cache: "no-store"
                });


            if (!response.ok) {

                throw new Error(
                    "Unable to generate click ID."
                );

            }


            const data =
                await response.json();


            if (
                data &&
                data.success &&
                data.click_id
            ) {

                visitorClickId =
                    data.click_id;


                /*
                Store click ID locally.
                */

                localStorage.setItem(
                    "tdr_click_id",
                    visitorClickId
                );

            }

        }


        /*
        Make the click ID globally available.
        */

        window.visitorClickId =
            visitorClickId;


        clickIdReady = true;


        console.log(
            "Visitor click ID:",
            visitorClickId
        );


    }

    catch(error) {

        console.error(
            "Click ID initialization failed:",
            error
        );


        visitorClickId = null;

        window.visitorClickId = null;

        clickIdReady = false;

    }

}


/* =======================================================
   2. CONFIGURATION
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
    "https://docs.google.com/forms/d/e/1FAIpQLSc5gNrGBTdVsEcBbxHNEQUsgmKoWKEk5bz1YUg5S_5m2A71DA/formResponse";

const GOOGLE_FORM_EMAIL_ENTRY =
    "ententry.339758370";


/*
---------------------------------------------------------
CPA OFFERS
---------------------------------------------------------

Priority:

1. Country-specific offer
2. Global offer
3. Fallback offer
---------------------------------------------------------
*/

const CPA_OFFERS = {

    NG:
        "https://appsave.online/cl/i/qn16l6",

    US:
        "https://lockerpreview.com/cl/i/6nnroj",

    UK:
        "https://lockerpreview.com/cl/i/m5n38n",

    CA:
        "https://https://appsave.online/cl/i/pq3rl2",

    AU:
        "https://appsave.space/cl/i/o4me74",

    ZA:
        "https://lockerpreview.com/cl/i/34jl9w",

    Brazil:
        "https://appsave.space/cl/i/1xj3w1",

    FALLBACK:
        "https://YOUR-FALLBACK-CPA-OFFER.com"

};


/* =======================================================
   3. COUNTRY DETECTION
   ======================================================= */

const GEO_API =
    "https://ipapi.co/json/";


let visitorCountry = null;

let countryDetectionComplete = false;


/* =======================================================
   4. FAQ ACCORDION
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
   5. FACEBOOK PIXEL
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

            n.callMethod ?
            n.callMethod.apply(n,arguments) :
            n.queue.push(arguments);

        };

        if(!f._fbq)f._fbq=n;

        n.push=n;

        n.loaded=!0;

        n.version="2.0";

        n.queue=[];

        t=b.createElement(e);

        t.async=!0;

        t.src=v;

        s=b.getElementsByTagName(e)[0];

        s.parentNode.insertBefore(t,s);

    }(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
    );


    window.fbq(
        "init",
        FACEBOOK_PIXEL_ID
    );


    window.fbq(
        "track",
        "PageView"
    );


    console.log(
        "Facebook Pixel initialized."
    );

}


/* =======================================================
   6. GOOGLE TAG
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
        document.createElement("script");


    script.async = true;


    script.src =
        "https://www.googletagmanager.com/gtag/js?id="
        + GOOGLE_ADS_ID;


    document.head.appendChild(script);


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