/*
=========================================================
TOOLERKITDIGEST
PROTECTED DOWNLOAD PAGE
=========================================================
*/

const DOWNLOAD_URL =
    "https://drive.google.com/uc?export=download&id=1_Js2FqQrGBxQRGMVSzz5cr4qCcynX3-d";


async function verifyAccess(){

    const clickId =
        localStorage.getItem("tdr_click_id");

    if(!clickId){

        showDenied();

        return;

    }

    try{

        const response =
            await fetch(
                "/api/verify-access?click_id="+clickId
            );

        const result =
            await response.json();

        if(result.success && result.access){

            showApproved();

        }else{

            showDenied();

        }

    }

    catch(error){

        console.error(error);

        showDenied();

    }

}


function showApproved(){

    document.getElementById("loading").style.display="none";

    document.getElementById("approved").style.display="block";

    document.getElementById("downloadBtn").href =
        DOWNLOAD_URL;

}


function showDenied(){

    document.getElementById("loading").style.display="none";

    document.getElementById("denied").style.display="block";

}


verifyAccess();