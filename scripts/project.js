"use strict";

"use strict";

/**
 * Project class used for portfolios page
 */
class Project {

    constructor(title, image, description) {
        this._title = title;
        this._image = image;
        this._description = description;
    }

    /**
     * Returns an HTML card from the objects properties to be rendered in the DOM
     * @returns {HTMLDivElement}
     */
    toCard() {
        const column = document.createElement("div");
        column.classList.add("col");

        const card = document.createElement("div");
        card.classList.add("card", "shadow-sm", "h-100");

        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.height = 225;
        image.alt = this._title;
        image.src = this._image;
        card.appendChild(image);

        const headerContainer = document.createElement("div");
        headerContainer.classList.add("card-header", "pt-3");
        const header = document.createElement("h5");
        headerContainer.classList.add("card-title");
        header.appendChild(document.createTextNode(this._title));
        headerContainer.appendChild(header);
        card.appendChild(headerContainer);

        const bodyContainer = document.createElement("div");
        bodyContainer.classList.add("card-body");
        const body = document.createElement("p");
        bodyContainer.classList.add("card-text");
        body.appendChild(document.createTextNode(this._description));
        bodyContainer.appendChild(body);
        card.appendChild(bodyContainer);

        column.appendChild(card)

        return column;
    }

}