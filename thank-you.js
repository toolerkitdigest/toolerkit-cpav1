/*
=========================================================
TOOLERKITDIGEST
SMART LINK SUCCESS DOWNLOAD PAGE
=========================================================
*/


const DOWNLOAD_URL =
    "https://drive.google.com/uc?export=download&id=1_Js2FqQrGBxQRGMVSzz5cr4qCcynX3-d";



document.addEventListener(
    "DOMContentLoaded",
    function () {


        const loading =
            document.getElementById(
                "loading"
            );


        const approved =
            document.getElementById(
                "approved"
            );


        const downloadButton =
            document.getElementById(
                "downloadBtn"
            );



        /*
        Hide loading section.
        */

        if (
            loading
        ) {


            loading.style.display =
                "none";


        }



        /*
        Show approved section.
        */

        if (
            approved
        ) {


            approved.style.display =
                "block";


        }



        /*
        Add ebook download URL.
        */

        if (
            downloadButton
        ) {


            downloadButton.href =
                DOWNLOAD_URL;


        }



        console.log(
            "Download page loaded successfully."
        );


    }
);
