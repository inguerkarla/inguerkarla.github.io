"use strict";

const LGOUT_BUTTON_ID = ''

const App = (function () {
    const BLOG_LINK_TITLE = "News";


    function loadRegistrationForm() {
        console.log('loadRegistrationForm');
        const registrationForm = document.getElementById("registration-form");

        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("reg-username").value.trim();
            const password = document.getElementById("reg-password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();

            // Check if passwords match
            if (password !== confirmPassword) {
                showRegistrationError("Passwords do not match. Please try again.");
                return;
            }


            const userInfo = {username, password};
            localStorage.setItem('login', JSON.stringify(userInfo));


            showRegistrationSuccess(username);
        });
    }

    function showRegistrationSuccess(username) {

        alert(`Registration successful! Welcome, ${username}!`);
        window.location.href = "login.html";
    }

    function showRegistrationError(errorMessage) {
        // Display registration error message
        alert(errorMessage);
        // You can add more handling here based on your application's needs
    }

    function loadLoginForm() {
        console.log('loadLoginForm')
        const loginForm = document.getElementById("login-form");
        const loginFeedback = document.getElementById("login-feedback");

        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Check if username and password are provided
            if (!username || !password) {
                showLoginError("Please enter both username and password.");
                return;
            }

            const userInfoString = localStorage.getItem('login');
            console.log(userInfoString)

            if (userInfoString) {

                const userInfo = JSON.parse(userInfoString);
                console.log(userInfo)
                console.log(password)


                // Check if the entered password matches the stored password
                if (userInfo.password === password) {
                    showWelcomeMessage(username);
                } else {
                    showLoginError("Invalid username or password. Please try again.");
                }
            } else {
                showLoginError("User not found. Please register before logging in.");
            }
        });

        // Check if the user is already logged in, if so redirect them back to index.html
        checkLoggedIn();
    }

    function showWelcomeMessage(username) {
        const loginFeedback = document.getElementById("login-feedback");
        loginFeedback.textContent = `Welcome, ${username}!`;
        loginFeedback.classList.remove("text-danger");
        loginFeedback.classList.add("text-success");

        window.location.href = "index.html";

        handleLogin();
    }

    function showLoginError(errorMessage) {
        const loginFeedback = document.getElementById("login-feedback");
        loginFeedback.textContent = errorMessage;
        loginFeedback.classList.remove("text-success");
        loginFeedback.classList.add("text-danger");
    }

    function checkLoggedIn() {
        const userInfo = localStorage.getItem("userInfo");

        if (userInfo) {
            const {username} = JSON.parse(userInfo);
            showWelcomeMessage(username);
        }
    }


    /**
     * Triggers appropriate JS code for the contact.html page.
     */
    function loadContactForm() {
        // const inputEmail = document.getElementById("email");
        // inputEmail.addEventListener('blur', event => {
        //    console.log('blur event fired');
        // });
        const form = document.getElementById("contact-form");
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                console.log('Form is valid. Proceeding with submission.');

                // Additional form validation using JavaScript
                const firstNameInput = document.getElementById('firstName');
                const lastNameInput = document.getElementById('lastName');
                const emailInput = document.getElementById('email');
                const subjectInput = document.getElementById('subject');
                const messageInput = document.getElementById('message');
                const addressInput = document.getElementById("address");
                const phoneInput = document.getElementById("phone");


                // Check if required fields are not empty name, last name, address, etc
                if (firstNameInput.value === '') {
                    setCustomValidityAndDisplayError(firstNameInput, 'Please enter your first name.');
                    return;
                }
                if (firstNameInput.value === '') {
                    setCustomValidityAndDisplayError(lastNameInput, 'Please enter your last name.');
                    return;
                }
                if (addressInput.value === '') {
                    setCustomValidityAndDisplayError(addressInput, 'Please enter a valid address.');
                    return;
                }

                // Validate email address
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/;
                if (!emailRegex.test(emailInput.value)) {
                    setCustomValidityAndDisplayError(emailInput, 'Please enter a valid email address.');
                    return;
                }

                //Validate phone number
                // const phoneRegex = /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/;
                // if (!phoneRegex.test(phoneInput.value)) {
                //     setCustomValidityAndDisplayError(phoneInput, 'Please enter a valid phone number.');
                //     return;
                // }

                clearCustomValidity(firstNameInput);


                // Proceed with form submission
                const modalBody = document.getElementById("form-modal-body");
                const contact = new Contact(firstNameInput.value.trim(), lastNameInput.value.trim(), emailInput.value.trim(), subjectInput.value.trim(), messageInput.value.trim(), addressInput.value.trim(), phoneInput.value.trim());

                contact.toFormModalBody().forEach((element) => modalBody.appendChild(element));
                const modal = new bootstrap.Modal(document.getElementById('form-modal'), {});
                modal.show('');
            }
            form.classList.add('was-validated');
        }, false);
    }

    /**
     * Set custom validity and display error message for the input field
     * @param {HTMLInputElement} inputElement
     * @param {string} message
     */
    function setCustomValidityAndDisplayError(inputElement, message) {
        inputElement.setCustomValidity(message);
        const feedbackElement = inputElement.parentElement.querySelector('.invalid-feedback');
        console.log(feedbackElement);
        feedbackElement.textContent = message;
    }

    /**
     * Clear custom validity messages for the input field
     * @param {HTMLInputElement} inputElement
     */
    function clearCustomValidity(inputElement) {
        inputElement.setCustomValidity('');
        const feedbackElement = inputElement.parentElement.querySelector('.invalid-feedback');
        feedbackElement.textContent = '';
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
     * Triggers appropriate JS code for the gallery.html page.
     */
    function loadGallery() {
        getGalleryImages();
    }

    function loadBlog() {
        document.getElementById("search-button")
            .addEventListener("click", () => {
                const searchTextBox = document.getElementById("search-input")
                loadBlogs(searchTextBox.value);
            });
        loadBlogs();
    }

    function loadBlogs(search) {

        console.log(`load blogs called with ${search}`);

        const jsonFilePath = 'data/blog.json';
        const container = $('#blog-posts-container');

        container.empty()

        // Perform AJAX request to load blog posts
        $.ajax({
            url: jsonFilePath, dataType: 'json', success: function (data) {
                // Iterate through the blog posts and append them to the container
                $.each(data, function (index, post) {
                    if (!search ||
                        post.title.toLowerCase().includes(search.toLowerCase()) ||
                        post.author.toLowerCase().includes(search.toLowerCase())) {
                        let postHtml = `
                    <article class="blog-post">
                        <h2 class="display-5 link-body-emphasis mb-1">${post.title}</h2>
                        <p class="blog-post-meta">${post.date} by <a href="#">${post.author}</a></p>
                        ${post.content}
                        <hr>
                    </article>
                `;
                        container.append(postHtml);
                    }
                });
            }, error: function (error) {
                console.error('Error loading blog posts:', error);
            }
        });
    }

    function loadEvents() {
        let jsonFilePath = 'data/events.json';
        console.log(jsonFilePath);

        // Perform AJAX request to load event data
        $.ajax({
            url: jsonFilePath, dataType: 'json', success: function (data) {
                // Iterate through the events and append them to the container
                let container = $('#events-posts-container');
                $.each(data, function (index, event) {
                    let eventHtml = `
                        <div class="events-post">
                            <h2 class="display-5 link-body-emphasis mb-1">${event.title}</h2>
                            <p class="events-post-meta">${event.date} at ${event.time}</p>
                            ${event.description}
                            <hr>
                        </div>
                    `;
                    container.append(eventHtml);
                });
            }, error: function (error) {
                console.error('Error loading events posts:', error);
            }
        });
    }


    /**
     * Triggers the appropriate JS code for all pages as well as ensuring proper code execution.
     */
    function start() {
        console.log(`App Started. Document title is ${document.title}`);
        addNavigationLinks(document.title, localStorage.getItem("login") !== null);
        addFooterLinks();

        switch (document.title) {
            case "Portfolio":
                loadPortfolios();
                break;
            case "Contact":
                loadContactForm();
                break;
            case "Blog":
                loadBlog();
                break;
            case "Events":
                loadEvents();
                break;
            case "Gallery":
                loadGallery();
                break;
            case "Login":
                loadLoginForm();
                break
            case "Register":
                loadRegistrationForm();
                break
        }


        /**
         *
         * @type {HTMLElement}
         */
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", handleLogout);
        }

        // const searchButton = document.getElementById("search-button");
        // if (searchButton) {
        //     searchButton.addEventListener("click", handleSearch);
        // }
    }


    function handleLogin() {

        const isLoggedIn = true;

        addNavigationLinks(document.title, isLoggedIn);
    }


    function handleLogout() {
        // Remove user information from local storage
        localStorage.removeItem("userInfo");

        addNavigationLinks(document.title, false);

        // Redirect to the login page
        window.location.href = "login.html";
    }


    /**
     * Gets portfolios to be used in projects page. This method will return
     * 3 projects at a time.
     */
    function getProjects() {
        const projectsContainer = document.getElementById("projects-container");
        const projects = [new Project("Tech for All", "image/project-1.jpg", "This inclusive initiative is designed to bridge the digital divide, offering a range of technology resources and training for community members. From basic digital literacy classes to advanced tech workshops."), new Project("Green Harmony Garden", "image/project-2.jpg", "A serene haven where nature and sustainability intertwine seamlessly. This eco-conscious oasis is a living testament to our commitment to environmental stewardship."), new Project("Code Connect", "image/project-3.jpg", "\"Code Connect\" Is a dynamic initiative aimed at making coding accessible to individuals of all ages and backgrounds. Whether you're a curious beginner or looking to enhance your programming skills."),];
        projects.forEach((project) => projectsContainer.appendChild(project.toCard()));
    }

    function getGalleryImages() {
        const galleryContainer = document.getElementById("gallery-container");
        // Fetch or load gallery images and append them to the galleryContainer
        // For now, let's assume you have an array of image URLs
        const galleryImages = [
            new GalleryImage("Description 1", "image/gallery-1.jpg"),
            new GalleryImage("Description 2", "image/gallery-2.jpg",),
            new GalleryImage("Description 3", "image/gallery-3.jpg"),
        ];
        console.log(galleryImages)
        galleryImages.forEach((image) => {
            const galleryItem = image.toCard();
            galleryContainer.appendChild(galleryItem);
        });
    }

    /**
     * Gets navigation links for the top bar.
     * @param selected the document.title of the current page to ensure the appropriate link is selected
     */
    function addNavigationLinks(selected, isLoggedIn) {
        const navigationLinks = document.getElementById("navigation-links");
        if (navigationLinks) {
            navigationLinks.innerHTML = '';
            navigationLinks.appendChild(getNavigationLink("index.html", "Home", selected === "Home", "home-nav"));
            navigationLinks.appendChild(getNavigationLink("portfolio.html", "Portfolio", selected === "Portfolio", "portfolio-nav"));
            navigationLinks.appendChild(getNavigationLink("services.html", "Services", selected === "Services", "services-nav"));
            navigationLinks.appendChild(getNavigationLink("team.html", "Team", selected === "Team", "team-nav"));
            navigationLinks.appendChild(getNavigationLink("blog.html", BLOG_LINK_TITLE, selected === "Blog", "blog-nav"));
            navigationLinks.appendChild(getNavigationLink("events.html", "Events", selected === "Events", "events-nav"));
            navigationLinks.appendChild(getNavigationLink("gallery.html", "Gallery", selected === "Gallery", "gallery-nav"));
            navigationLinks.appendChild(getNavigationLink("careers.html", "Careers", selected === "Careers", "careers-nav"));

            if (isLoggedIn) {
                navigationLinks.appendChild(getNavigationLink("#", "Logout", false, "logout-btn"));
            } else {
                navigationLinks.appendChild(getNavigationLink("login.html", "Login", false, "login-btn"));
            }
        }
    }

    /**
     * Adds appropriate footer links to the bottom of the page
     */
    function addFooterLinks() {
        const footerLinks = document.getElementById("footer-links");
        if (footerLinks) {
            footerLinks.innerHTML = "";
            footerLinks.appendChild(getFooterLink("privacy-policy.html", "Privacy Policy"));
            footerLinks.appendChild(getFooterLink("terms.html", "Terms of Service"));
            footerLinks.appendChild(getFooterLink("contact.html", "Contact"));
        }
    }

    /**
     * Get a single navigation link with appropriate CSS classes
     * @param href hypertext reference
     * @param text the text to be displayed
     * @param selected true or false if to render the link as selected
     * @returns {HTMLLIElement}
     */
    function getNavigationLink(href, text, selected, id) {
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.id = id;
        anchor.classList.add("nav-link");
        if (selected) {
            anchor.classList.add("active");
            anchor.setAttribute("aria-current", "page");
        }
        const anchorText = document.createTextNode(text);
        anchor.appendChild(anchorText);
        listItem.appendChild(anchor);
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
        listItem.appendChild(anchor);
        return listItem;
    }

    return {
        start: start, handleLogout: handleLogout, loadLoginForm: loadLoginForm,
    };
})()

window.addEventListener("load", App.start);