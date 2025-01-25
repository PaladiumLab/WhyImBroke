import mongoose, { trusted } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 8,
        select: false   // Store hashed passwords and don't include in any queries!
     },
    name: {
        type: String,
        required: true
    },
    settings: {
        currency: {
            type: String,
            default: 'CAD',
            required: false
        },
        timezone: {
            type: String,
            default: 'ADT',
            required: false,
        },
        notification: {
            type: Boolean,
            required: false
        },
    },
}, {
    timestamps: true
});

// //User logic to hash passwords
// userSchema.pre('save', async (next) => {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     console.log('Hashed Password: ', hash);
//     next();
// })

// // Match password during login
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

export default mongoose.model('Users', userSchema);