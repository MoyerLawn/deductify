import PinataController from './PinataController.js';

class MainController {
    constructor() {
        this.pinataController = new PinataController();
    }

    healthCheck(req, res) {
        return res.status(200).json({
            status: "success",
            message: "Server is healthy",
            data: { status: "ok" }
        });
    }

    apiInfo(req, res) {
        return res.status(200).json({
            status: "success",
            message: "API Information",
            data: {
                name: "Deductify API",
                version: "1.0.0",
                description: "API for Deductify, enabling contractors to upload and track expenses using the Pinata API.",
            }
        });
    }

    handlePinataRequests(req, res) {
        const action = req.params.action;
        switch (action) {
            case "pin-json":
                return this.pinataController.pinJSON(req, res);
            case "pin-file":
                return this.pinataController.pinFile(req, res);
            default:
                return res.status(400).json({
                    status: "error",
                    message: "Invalid action",
                });
        }
    }

    logRequest(req, res, next) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
        next();
    }
}

export default MainController;
