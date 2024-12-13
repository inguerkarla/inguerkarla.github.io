"use strict";

/**
 * Contact class for the contact form
 */
class Contact {

    constructor(firstName, lastName, email, subject, message, address, phone) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._subject = subject;
        this._message = message;
        this._address = address;
        this._phone = phone;
    }

    /**
     * Get concatenated full name
     * @returns {string}
     */
    getFullName() {
        return `${this._firstName} ${this._lastName}`
    }

    /**
     * Returns elements for modal body displaying all the objects properties
     * @returns {Node[]}
     */
    toFormModalBody() {

        const elements = [];

        const nameParagraph = document.createElement("p");
        nameParagraph.appendChild(
            document.createTextNode(`Thank you for submitting your request ${this.getFullName()} for subject '${this._subject}' which contains the following message:`))
        elements.push(nameParagraph);

        const messageParagraph = document.createElement("p");
        messageParagraph.innerHTML = `<i>${this._message}</i>`;
        elements.push(messageParagraph);

        const emailParagraph = document.createElement("p");
        emailParagraph.innerHTML = `A response will be returned to you shortly by our staff to the email you specified, ${this._email}.`;
        elements.push(emailParagraph);

        const addressParagraph = document.createElement("p");
        addressParagraph.innerHTML = `Address: ${this._address}`;
        elements.push(addressParagraph);

        const phoneParagraph = document.createElement("p");
        phoneParagraph.innerHTML = `Phone: ${this._phone}`;
        elements.push(phoneParagraph);

        return elements;
    }
}