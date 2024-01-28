"use strict";

(function () {
    const BLOG_LINK_TITLE = "News";

    /**
     * Triggers appropriate JS code for the contact.html page.
     */
    function loadContactForm() {
        const form = document.getElementById("contact-form")
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault()
                console.log('show 1')
                const modalBody = document.getElementById("form-modal-body")
                const contact = new Contact(
                    document.getElementById('firstName').value,
                    document.getElementById('lastName').value,
                    document.getElementById('email').value,
                    document.getElementById('subject').value,
                    document.getElementById('message').value,
                );

                contact.toFormModalBody().forEach((element) => modalBody.appendChild(element));
                const modal = new bootstrap.Modal(document.getElementById('form-modal'), {});
                modal.show('');
            }
            form.classList.add('was-validated')
        }, false)
    }

    /**
     * Triggers appropriate JS code for the portfolios.html page.
     */
    function loadPortfolios() {
        document
            .getElementById("projects-load-more-btn")
            .addEventListener("click", () => {
            getProjects();
        });
        getProjects();
    }

    /**
     * Triggers the appropriate JS code for all pages as well as ensuring proper code execution.
     */
    function start() {
        console.log("App Started");
        addNavigationLinks(document.title);
        addFooterLinks();

        switch (document.title) {
            case "Portfolio":
                loadPortfolios();
                break;
            case "Contact":
                loadContactForm();
                break;
        }
    }

    window.addEventListener("load", start);

    /**
     * Gets portfolios to be used in projects page. This method will return
     * 3 projects at a time.
     */
    function getProjects() {
        const projectsContainer = document.getElementById("projects-container");
        const projects = [
            new Project("Tech for All", "image/project-1.jpg", "This inclusive initiative is designed to bridge the digital divide, offering a range of technology resources and training for community members. From basic digital literacy classes to advanced tech workshops."),
            new Project("Green Harmony Garden", "image/project-2.jpg", "A serene haven where nature and sustainability intertwine seamlessly. This eco-conscious oasis is a living testament to our commitment to environmental stewardship."),
            new Project("Code Connect", "image/project-3.jpg", "\"Code Connect\" Is a dynamic initiative aimed at making coding accessible to individuals of all ages and backgrounds. Whether you're a curious beginner or looking to enhance your programming skills."),
        ];
        projects.forEach((project) => projectsContainer.appendChild(project.toCard()));
    }

    /**
     * Gets navigation links for the top bar.
     * @param selected the document.title of the current page to ensure the appropriate link is selected
     */
    function addNavigationLinks(selected) {
        const navigationLinks = document.getElementById("navigation-links");
        navigationLinks.innerHTML = '';
        navigationLinks.appendChild(getNavigationLink("index.html", "Home", selected === "Home"));
        navigationLinks.appendChild(getNavigationLink("portfolio.html", "Portfolio", selected === "Portfolio"));
        navigationLinks.appendChild(getNavigationLink("services.html", "Services", selected === "Services"));
        navigationLinks.appendChild(getNavigationLink("team.html", "Team", selected === "Team"));
        navigationLinks.appendChild(getNavigationLink("blog.html", BLOG_LINK_TITLE, selected === "Blog"));
        navigationLinks.appendChild(getNavigationLink("careers.html", "Careers", selected === "Careers"));
    }

    /**
     * Adds appropriate footer links to the bottom of the page
     */
    function addFooterLinks() {
        const footerLinks = document.getElementById("footer-links");
        footerLinks.innerHTML = '';
        footerLinks.appendChild(getFooterLink("privacy-policy.html", "Privacy Policy"));
        footerLinks.appendChild(getFooterLink("terms.html", "Terms of Service"));
        footerLinks.appendChild(getFooterLink("contact.html", "Contact"));
    }

    /**
     * Get a single navigation link with appropriate CSS classes
     * @param href hypertext reference
     * @param text the text to be displayed
     * @param selected true or false if to render the link as selected
     * @returns {HTMLLIElement}
     */
    function getNavigationLink(href, text, selected) {
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.classList.add("nav-link");
        if (selected) {
            anchor.classList.add("active")
            anchor.setAttribute("aria-current", "page")
        }
        const anchorText = document.createTextNode(text);
        anchor.appendChild(anchorText);
        listItem.appendChild(anchor)
        return listItem;
    }

    /**
     * Get a single footer navigation link with appropriate CSS classes
     * @param href hypertext reference
     * @param text the text to be displayed
     * @returns {HTMLLIElement}
     */
    function getFooterLink(href, text) {
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.classList.add("nav-link", "px-2", "text-body-secondary");
        const anchorText = document.createTextNode(text);
        anchor.appendChild(anchorText);
        listItem.appendChild(anchor)
        return listItem;
    }
})()
