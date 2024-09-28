import FormData from 'form-data';
import pinata from './config/PinataConfig.js';
import { successResponse, errorResponse } from './utils/response.js';

class PinataController {
    constructor() {}

    async pinJSON(req, res) {
        try {
            const jsonData = req.body;
            const result = await pinata.upload.json(jsonData);

            return successResponse(res, result, "JSON pinned successfully");
        } catch (error) {
            return errorResponse(res, error);
        }
    }

    async pinFile(req, res) {
        const file = req.file;
        if (!file) {
            return errorResponse(res, "No file provided", "Validation Error", 400);
        }

        try {
            const formData = new FormData();

            formData.append('file', file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype
            });

            const result = await pinata.upload.file(formData);

            return successResponse(res, result, "File pinned successfully");
        } catch (error) {
            console.error("Pinata API Error:", error.response ? error.response.data : error.message);
            return errorResponse(res, error);
        }
    }
}

export default PinataController;
