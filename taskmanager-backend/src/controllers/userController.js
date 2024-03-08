const Joi = require("joi");
const User = require("../models/User");
const Response = require("../services/response");
const Helper = require("../services/helper");
const Auth = require("../services/authService");
const { USER_STATUS } = require("../services/constants")

module.exports = {

    createUser: async (req, res) => {
        try {

            const schema = Joi.object({
                name: Joi.string().min(2).max(50).required(),
                email: Joi.string().min(1).max(50).required(),
                password: Joi.string().min(5).max(50).required(),
                confirmPassword: Joi.string().min(5).max(50).required(),
                phone: Joi.string().optional(),
                city: Joi.string().required()
            });

            const { error, value } = schema.validate(req.body);

            if (error) return Response.joiErrorResponseData(res, error);

            let profilePicPath;

            const emailExist = await User.findOne({ email: value.email })

            if (emailExist) return Response.errorResponseWithoutData(res, 'Email already exist')

            if (!req.files || !req.files.profile) {
                return Response.errorResponseWithoutData(res, "Profile pic is required")
            } else {
                let profilePic = await Helper.imageUpload(
                    req.files.profile,
                    "public/assets/userPics/"
                );
                profilePicPath = `/${profilePic}`;
            }

            const hashPass = await Auth.hashPwd(value.password);

            let userObj = { name: value.name, email: value.email, profile: profilePicPath, password: hashPass, resetToken: null, phone: value.phone, city: value.city, status: USER_STATUS.ACTIVE }

            let user = await User.create(userObj);

            //generate token
            const generateToken = await Auth.issueToken({
                id: user.id,
                email: user.email,
            });

            user["resetToken"] = generateToken;

            //update created user object
            await user.save();

            return Response.successResponseData(res, "User created successfully", user)

        } catch (error) {

            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    login: async (req, res) => {

        try {

            const schema = Joi.object({
                email: Joi.string().min(1).max(50).required().label("Email"),
                password: Joi.string().required().label("Password"),
            });

            const { error, value } = schema.validate(req.body);

            if (error) return Response.joiErrorResponseData(res, error);

            const emailExist = await User.findOne({ email: value.email })

            if (!emailExist) return Response.errorResponseWithoutData(res, 'Invalid credentials');

            const comparePass = await Auth.comparePwd(value.password, emailExist.password);

            if (!comparePass) return Response.errorResponseWithoutData(res, 'Invalid credentials');

            //generate token
            const generateToken = await Auth.issueToken({
                id: emailExist.id,
                email: emailExist.email,
            });

            emailExist["resetToken"] = generateToken;

            //update created user object
            await emailExist.save();

            return Response.successResponseData(res, "User created successfully", emailExist);



        } catch (error) {
            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    fetchUser: async (req, res) => {

        try {

            const user = await User.findOne({ _id: req.authUserId })

            if (!user) return Response.errorResponseWithoutData(res, 'User not exist');

            return Response.successResponseData(res, "User fetched successfully", user)

        } catch (error) {

            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    logout: async (req, res) => {
        
        try{

            const user = await User.findOne({_id: req.authUserId});

            if (!user) return Response.errorResponseWithoutData(res, 'Invalid user');

            user.resetToken = null
            await user.save();

            return Response.successResponseWithoutData(res, 'User logged out successfully');

        } catch (error) {
         
            console.log("error=>", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
}