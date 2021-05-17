import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    googleId: {
        type: String,
        unique: true,
        required: true,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
