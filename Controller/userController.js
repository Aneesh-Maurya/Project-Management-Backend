const UserModel = require('../Model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateTokens } = require('../utils/auth')


module.exports = {
    // ====================== User Registration =============================
    signupUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // chaeck required field ..............
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // check if user already exists............
            const existingUser = await UserModel.findOne({ email: email });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            // hash password .................

            const hashesPassword = await bcrypt.hash(password, 10);

            // create new user ...............
            const newUser = new UserModel({
                name: name,
                email: email,
                password: hashesPassword

            })
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });

        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    },

    // =============== user Login =====================================

    loginUser: async (req, res) => {
        try {


            const { email, password } = req.body;

            // check required field ..............
            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const userData = await UserModel.findOne({ email: email })
            // console.log(userData);
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isPasswordValid = await bcrypt.compare(password, userData.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            // generate JWT token ...............
            const { accessToken, refreshToken } = generateTokens({ id: userData._id, name: userData.name });


            // ✅ Set cookies
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000 // 15 min
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            res.status(200).json({ message: 'Login successful', accessToken: accessToken,refreshToken:refreshToken, user: userData });
        }
        catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
}