const { STATUS_CODES } = require("./constants");

module.exports = {

    successResponseData(res, message, data, extras, code = STATUS_CODES["OK"]) {
        const response = {
            message: message,
            data,
        }

        if (extras) {
            Object.assign(response, extras)
        }

        return res.status(code).json(response)
    },

    successResponseWithoutData(res, message, code = STATUS_CODES["OK"]) {
        const response = {
            code,
            message: message,
        }
        return res.status(code).json(response)
    },

    errorResponseWithoutData(res, message, code = STATUS_CODES["BAD_REQUEST"]) {
        const response = {
            error: message,
        }
        return res.status(code).send(response)
    },

    errorResponseData(res ,data, message, code = STATUS_CODES["BAD_REQUEST"]) {
        const response = {
            data,
            error: message
        }
        return res.status(code).send(response)
    },

    joiErrorResponseData(res, err, code = STATUS_CODES["BAD_REQUEST"]){
        let error = {}
        if (err.name == 'ValidationError' && err.isJoi) {
            error.error_message = err.message.replace(/"/g, "");
        }
        const response = {
            code,
            error: error.error_message
        }
        return res.status(code).json(response);
    },
    
}