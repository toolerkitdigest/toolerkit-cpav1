/* =========================================================
   TOOLERKITDIGEST
   HOMEPAGE JAVASCRIPT

   This homepage does NOT handle:
   - Email collection
   - Google Forms
   - CPA offers
   - CPA redirects
   - CPA_CONFIG
   - Unlock protection

   Those functions belong to the individual
   preview pages.
========================================================= */


/* =========================================================
   1. EXPLORE FREE VAULTS
========================================================= */

function exploreFreeVault() {

    const vaultSection = document.getElementById("vaults");

    if (!vaultSection) {
        console.warn("Vault section not found.");
        return;
    }

    vaultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

function initializeMobileNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    /* -----------------------------------------
       Make sure navigation elements exist
    ----------------------------------------- */

    if (!menuToggle || !navLinks) {
        return;
    }


    /* -----------------------------------------
       Open / close mobile menu
    ----------------------------------------- */

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("active");


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* -----------------------------------------
       Close menu after clicking a link
    ----------------------------------------- */

    const links =
        navLinks.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}


/* =========================================================
   3. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

function initializeOutsideMenuClose() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (!menuToggle || !navLinks) {
        return;
    }


    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

}


/* =========================================================
   4. PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeMobileNavigation();

        initializeOutsideMenuClose();

        console.log(
            "ToolerKitDigest homepage initialized successfully."
        );

    }
);