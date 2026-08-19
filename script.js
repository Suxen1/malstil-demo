const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOverlay =
    document.getElementById("mobile-menu-overlay");


function openMenu() {

    menuToggle.classList.add("active");
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Menü schließen"
    );
}


function closeMenu() {

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");

    document.body.style.overflow = "";

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Menü öffnen"
    );
}


/* Menü öffnen / schließen */

menuToggle.addEventListener("click", function () {

    const isOpen =
        mobileMenu.classList.contains("active");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

});


/* Menü schließen bei Klick auf einen Link */

const mobileLinks =
    mobileMenu.querySelectorAll("a");

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        closeMenu();
    });

});


/* Menü schließen bei Klick auf Overlay */

mobileMenuOverlay.addEventListener(
    "click",
    function () {
        closeMenu();
    }
);


/* Menü mit ESC schließen */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);

/* =========================================
   SCROLL REVEAL
   ========================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .service-card, .why-card, .portfolio-item, .contact-intro, .contact-details, .contact-form-wrapper"
    );


revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});

/* =========================================
   KONTAKTFORMULAR
   ========================================= */

const contactForm =
    document.querySelector(".contact-form");

const formSuccess =
    document.getElementById("form-success");

const successReset =
    document.getElementById("success-reset");


contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const submitButton =
        contactForm.querySelector(
            'button[type="submit"]'
        );


    const originalText =
        submitButton.textContent;


    submitButton.disabled = true;

    submitButton.textContent =
        "Wird gesendet …";


    const formData =
        new FormData(contactForm);


    try {

        const response = await fetch(
            contactForm.action,
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );


        const result =
            await response.json();


        if (response.ok && result.success) {

            contactForm.style.display =
                "none";

            formSuccess.classList.add(
                "active"
            );

            formSuccess.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            contactForm.reset();

        } else {

            throw new Error(
                "Formular konnte nicht gesendet werden."
            );

        }


    } catch (error) {

        alert(
            "Leider konnte die Anfrage nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt."
        );

        submitButton.disabled = false;

        submitButton.textContent =
            originalText;

    }

});

successReset.addEventListener("click", function () {

    formSuccess.classList.remove("active");

    contactForm.style.display = "";

    contactForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

