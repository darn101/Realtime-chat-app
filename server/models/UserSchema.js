const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        lowercase: true
    }
    ,
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ''
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;