/* =========================================
TOOLERKITDIGEST
AI CREATOR TOOLKIT 2026

SIMPLE DIRECT CPA FLOW
========================================= */

/* =========================================
AI CPA OFFER
========================================= */

const AI_CPA_OFFER =
"https://ratwn.bid/cl/4d0f529f28760f93";

document.addEventListener(
"DOMContentLoaded",
function () {


    /* =======================================
==
       ELEMENTS
    ========================================= */

    const unlockButton =
        document.getElementById(
            "unlockButton"
        );


    const unlockPopup =
        document.getElementById(
            "unlockPopup"
        );


    const continueButton =
        document.getElementById(
            "continueButton"
        );


    const closePopupButton =
        document.getElementById(
            "closePopupButton"
        );


    const cancelButton =
        document.getElementById(
            "cancelButton"
        );


    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    const navLinks =
        document.getElementById(
            "navLinks"
        );


    /* =========================================
       OPEN POPUP
    ========================================= */

    if (
        unlockButton &&
        unlockPopup
    ) {

        unlockButton.addEventListener(
            "click",
            function () {

                unlockPopup.classList.add(
                    "active"
                );

                unlockPopup.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    /* =========================================
       CLOSE POPUP
    ========================================= */

    function closePopup() {

        if (!unlockPopup) {
            return;
        }


        unlockPopup.classList.remove(
            "active"
        );


        unlockPopup.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    /* =========================================
       CLOSE X
    ========================================= */

    if (closePopupButton) {

        closePopupButton.addEventListener(
            "click",
            function () {

                closePopup();

            }
        );

    }


    /* =========================================
       CANCEL
    ========================================= */

    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                closePopup();

            }
        );

    }


    /* =========================================
       CLICK OUTSIDE POPUP
    ========================================= */

    if (unlockPopup) {

        unlockPopup.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    unlockPopup
                ) {

                    closePopup();

                }

            }
        );

    }


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                unlockPopup &&
                unlockPopup.classList.contains(
                    "active"
                )
            ) {

                closePopup();

            }

        }
    );


    /* =========================================
       CONTINUE TO UNLOCK

       DIRECT CPA REDIRECT
    ========================================= */

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                if (
                    !AI_CPA_OFFER ||
                    AI_CPA_OFFER.trim() === ""
                ) {

                    alert(
                        "The AI CPA offer is not configured."
                    );

                    return;

                }


                continueButton.disabled =
                    true;


                continueButton.textContent =
                    "Redirecting...";


                window.location.href =
                    AI_CPA_OFFER;

            }
        );

    }


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    if (
        menuToggle &&
        navLinks
    ) {

        menuToggle.addEventListener(
            "click",
            function () {

                navLinks.classList.toggle(
                    "active"
                );


                const isOpen =
                    navLinks.classList.contains(
                        "active"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

            }
        );


        const links =
            navLinks.querySelectorAll(
                "a"
            );


        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove(
                            "active"
                        );


                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );

    }

}


);
