class Travel {
    constructor(mileage, gasReceipts, leases, air, hotels, meals) {
        this._mileage = mileage;          // Mileage (e.g., total miles driven)
        this._gasReceipts = gasReceipts;  // Gas receipts (e.g., total cost of gas)
        this._leases = leases;            // Leases (e.g., car lease expenses)
        this._air = air;                  // Air (e.g., air travel expenses)
        this._hotels = hotels;            // Hotels (e.g., hotel accommodation expenses)
        this._meals = meals;              // Meals (e.g., meal expenses during travel)
    }

    // Getter and Setter for mileage
    get mileage() {
        return this._mileage;
    }

    set mileage(value) {
        this._mileage = value;
    }

    // Getter and Setter for gasReceipts
    get gasReceipts() {
        return this._gasReceipts;
    }

    set gasReceipts(value) {
        this._gasReceipts = value;
    }

    // Getter and Setter for leases
    get leases() {
        return this._leases;
    }

    set leases(value) {
        this._leases = value;
    }

    // Getter and Setter for air
    get air() {
        return this._air;
    }

    set air(value) {
        this._air = value;
    }

    // Getter and Setter for hotels
    get hotels() {
        return this._hotels;
    }

    set hotels(value) {
        this._hotels = value;
    }

    // Getter and Setter for meals
    get meals() {
        return this._meals;
    }

    set meals(value) {
        this._meals = value;
    }
}
