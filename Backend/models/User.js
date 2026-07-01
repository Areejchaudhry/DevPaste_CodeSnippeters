import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    profileImage: {
        type: String,
        default: ""
    },

    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Snippet"
        }
    ]
},
{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema);

export default User;