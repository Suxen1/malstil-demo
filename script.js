/* ==================================================
   MALSTIL
   JAVASCRIPT
================================================== */


/* ==================================================
   MOBILE MENU
================================================== */

const menuToggle =
    document.getElementById("menu-toggle");

const mobileMenu =
    document.getElementById("mobile-menu");

const mobileMenuOverlay =
    document.getElementById("mobile-menu-overlay");


function openMenu() {

    if (!menuToggle || !mobileMenu) {
        return;
    }

    menuToggle.classList.add("active");

    mobileMenu.classList.add("active");

    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.add("active");
    }

    document.body.classList.add("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    mobileMenu.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeMenu() {

    if (!menuToggle || !mobileMenu) {
        return;
    }

    menuToggle.classList.remove("active");

    mobileMenu.classList.remove("active");

    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove("active");
    }

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        function () {

            if (
                mobileMenu &&
                mobileMenu.classList.contains("active")
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );

}


/* ==================================================
   OVERLAY SCHLIESST MENU
================================================== */

if (mobileMenuOverlay) {

    mobileMenuOverlay.addEventListener(
        "click",
        closeMenu
    );

}


/* ==================================================
   MOBILE MENU LINKS
================================================== */

if (mobileMenu) {

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                closeMenu
            );

        }
    );

}


/* ==================================================
   ESCAPE SCHLIESST MENU
================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);


/* ==================================================
   SCROLL REVEAL
================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );


} else {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* ==================================================
   KONTAKTFORMULAR
================================================== */

const contactForm =
    document.querySelector(".contact-form");

const formSuccess =
    document.getElementById("form-success");

const successReset =
    document.getElementById("success-reset");


if (
    contactForm &&
    formSuccess
) {


    contactForm.addEventListener(
        "submit",
        async function (event) {

            /*
             * Verhindert die normale Weiterleitung
             * zu Web3Forms.
             */

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            if (!submitButton) {
                return;
            }


            const originalText =
                submitButton.textContent;


            submitButton.disabled = true;

            submitButton.textContent =
                "Wird gesendet …";


            const formData =
                new FormData(contactForm);


            try {


                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                const result =
                    await response.json();


                if (
                    response.ok &&
                    result.success
                ) {


                    /*
                     * Formular ausblenden
                     */

                    contactForm.style.display =
                        "none";


                    /*
                     * Erfolgsmeldung anzeigen
                     */

                    formSuccess.classList.add(
                        "active"
                    );


                    /*
                     * Formular zurücksetzen
                     */

                    contactForm.reset();


                    /*
                     * Erfolgsmeldung ins Sichtfeld
                     */

                    formSuccess.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: "center"
                        }
                    );


                } else {


                    throw new Error(
                        "Formular konnte nicht gesendet werden."
                    );

                }


            } catch (error) {


                console.error(
                    "Formularfehler:",
                    error
                );


                alert(
                    "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt."
                );


                submitButton.disabled =
                    false;


                submitButton.textContent =
                    originalText;


            }

        }
    );


    /* ==================================================
       WEITERE ANFRAGE
    ================================================== */

    if (successReset) {

        successReset.addEventListener(
            "click",
            function () {


                formSuccess.classList.remove(
                    "active"
                );


                contactForm.style.display =
                    "";


                contactForm.reset();


                contactForm.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "center"
                    }
                );


            }
        );

    }

}
