import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateTokens.js";
import Snippet from "../models/Snippets.js";

// ===============================
// Register User
// ===============================
export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Registration Successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ===============================
// Login User
// ===============================
export const loginUser = async (req, res) => {
    try {
        console.log("Login request received");

        const { email, password } = req.body;
        console.log("Email:", email);

        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const token = generateToken(user._id);
        console.log("Token Generated");

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};

// ===============================
// Get Logged In User
// ===============================
export const getProfile = async (req, res) => {

    res.status(200).json(req.user);

};

// ===============================
// Update Logged In User
// ===============================
export const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const { name, email, password } = req.body;

        user.name = name || user.name;
        user.email = email || user.email;

        if (password && password.trim() !== "") {

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

        }

        const updatedUser = await user.save();

        res.status(200).json({

            message: "Profile Updated Successfully",

            user: {

                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt

            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
