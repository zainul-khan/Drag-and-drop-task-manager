const Response = require("../services/response");
const jwt = require("jsonwebtoken");
const { STATUS_CODES } = require("../services/constants");

module.exports = {
    validateUser: async (req, res, next) => {

        try {

            let token = req.header("Authorization");
            // console.log("token", token);
            if (!token) {
                return Response.errorResponseWithoutData(res, "Unauthorized access", STATUS_CODES["ACCESS_DENIED"]);
            }

            token = token.split("Bearer ")[1];

            await jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
                if (err) {
                    console.log("tokennotverifiedinvalidateuser", err);
                    return res.status(401).json({ error: 'Unauthorized access' });
                }
                else {
                    req.authUserId = decoded.id;
                    next();
                }
            })

        } catch (error) {

            console.log("errorinmiddleware", error);
        }

    },
}