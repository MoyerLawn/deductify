class Donations {
    constructor(imageUpload, donorName, organizationName, date, donationValue) {
        this._imageUpload = imageUpload;        // Image upload (e.g., receipt or donation proof)
        this._donorName = donorName;            // Name of the donor
        this._organizationName = organizationName;  // Name of the recipient organization
        this._date = new Date(date);            // Date of the donation
        this._donationValue = donationValue;    // Monetary value of the donation
    }

    // Getter and Setter for imageUpload
    get imageUpload() {
        return this._imageUpload;
    }

    set imageUpload(value) {
        this._imageUpload = value;
    }

    // Getter and Setter for donorName
    get donorName() {
        return this._donorName;
    }

    set donorName(value) {
        this._donorName = value;
    }

    // Getter and Setter for organizationName
    get organizationName() {
        return this._organizationName;
    }

    set organizationName(value) {
        this._organizationName = value;
    }

    // Getter and Setter for date
    get date() {
        return this._date;
    }

    set date(value) {
        this._date = new Date(value);  // Ensures the date is properly formatted
    }

    // Getter and Setter for donationValue
    get donationValue() {
        return this._donationValue;
    }

    set donationValue(value) {
        this._donationValue = value;
    }
}