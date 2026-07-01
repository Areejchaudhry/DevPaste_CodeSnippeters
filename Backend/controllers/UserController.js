import User from "../models/User.js";
export const registerUser = async (req, res) => {
    try {

        // Get data from request body
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered."
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};