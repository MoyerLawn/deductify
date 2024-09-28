class ReceiptsandRecurring {
    constructor(rent, leases) {
        this._rent = rent;        // Rent expenses (e.g., monthly rent)
        this._leases = leases;    // Lease expenses (e.g., equipment or vehicle leases)
    }

    // Getter and Setter for rent
    get rent() {
        return this._rent;
    }

    set rent(value) {
        this._rent = value;
    }

    // Getter and Setter for leases
    get leases() {
        return this._leases;
    }

    set leases(value) {
        this._leases = value;
    }
}
