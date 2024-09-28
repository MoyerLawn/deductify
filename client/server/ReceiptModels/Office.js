class Office {
    constructor(imageUpload, name, vendor, date, totalAmount, writeOffAmount) {
        this._imageUpload = imageUpload;  // Image upload (e.g., file or URL reference)
        this._name = name;                // Office name
        this._vendor = vendor;            // Vendor associated with the office
        this._date = new Date(date);      // Date (converted to JavaScript Date object)
        this._totalAmount = totalAmount;  // Total amount for office expenses
        this._writeOffAmount = writeOffAmount;  // Write-off amount
    }

    // Getter and Setter for imageUpload
    get imageUpload() {
        return this._imageUpload;
    }

    set imageUpload(value) {
        this._imageUpload = value;
    }

    // Getter and Setter for name
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    // Getter and Setter for vendor
    get vendor() {
        return this._vendor;
    }

    set vendor(value) {
        this._vendor = value;
    }

    // Getter and Setter for date
    get date() {
        return this._date;
    }

    set date(value) {
        this._date = new Date(value);  // Ensuring the date is properly formatted
    }

    // Getter and Setter for totalAmount
    get totalAmount() {
        return this._totalAmount;
    }

    set totalAmount(value) {
        this._totalAmount = value;
    }

    // Getter and Setter for writeOffAmount
    get writeOffAmount() {
        return this._writeOffAmount;
    }

    set writeOffAmount(value) {
        this._writeOffAmount = value;
    }
}   
