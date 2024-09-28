export function successResponse(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
        status: "success",
        message: message,
        data: data
    });
}

export function errorResponse(res, error, message = "An error occurred", statusCode = 500) {
    return res.status(statusCode).json({
        status: "error",
        message: message,
        error: error.message || error
    });
}