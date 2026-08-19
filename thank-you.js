/* =========================================================
   TOOLERKITDIGEST
   PROTECTED DOWNLOAD PAGE
   ========================================================= */

const DOWNLOAD_URL =
    "https://drive.google.com/uc?export=download&id=1_Js2FqQrGBxQRGMVSzz5cr4qCcynX3-d";


/* =========================================================
   GET PAGE ELEMENTS
   ========================================================= */

const loading =
    document.getElementById("loading");

const denied =
    document.getElementById("denied");

const approved =
    document.getElementById("approved");

const downloadBtn =
    document.getElementById("downloadBtn");


/* =========================================================
   HIDE ALL STATES
   ========================================================= */

function hideAllStates() {

    loading.style.display = "none";

    denied.style.display = "none";

    approved.style.display = "none";

}


/* =========================================================
   SHOW LOADING
   ========================================================= */

function showLoading() {

    hideAllStates();

    loading.style.display = "block";

}


/* =========================================================
   SHOW DENIED
   ========================================================= */

function showDenied() {

    hideAllStates();

    denied.style.display = "block";

}


/* =========================================================
   SHOW APPROVED
   ========================================================= */

function showApproved() {

    hideAllStates();

    approved.style.display = "block";

    /*
    Only add the Google Drive download
    URL after access has been verified.
    */

    downloadBtn.href = DOWNLOAD_URL;

}


/* =========================================================
   VERIFY CPA ACCESS
   ========================================================= */

async function verifyAccess() {

    /*
    Start with verification screen.
    */

    showLoading();


    /*
    Get the visitor's click ID.
    */

    const clickId =
        localStorage.getItem("tdr_click_id");


    /*
    No click ID = no access.
    */

    if (!clickId) {

        console.warn(
            "No visitor click ID found."
        );

        showDenied();

        return;

    }


    console.log(
        "Verifying click ID:",
        clickId
    );


    try {

        /*
        Send click ID to Netlify
        verification function.
        */

        const response =
            await fetch(
                "/api/verify-access?click_id=" +
                encodeURIComponent(clickId)
            );


        /*
        Check HTTP response.
        */

        if (!response.ok) {

            throw new Error(
                "Verification request failed."
            );

        }


        /*
        Read verification result.
        */

        const result =
            await response.json();


        console.log(
            "Verification result:",
            result
        );


        /*
        =============================================
        VERIFIED
        =============================================
        */

        if (
            result.success === true &&
            result.access === true
        ) {

            showApproved();

            return;

        }


        /*
        =============================================
        NOT VERIFIED
        =============================================
        */

        showDenied();

    }

    catch(error) {

        console.error(
            "Access verification error:",
            error
        );

        showDenied();

    }

}


/* =========================================================
   START VERIFICATION
   ========================================================= */

verifyAccess();