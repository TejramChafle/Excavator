const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// The user schema only defines the application level user. This will help to manage authentication & authorization
const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contact_id: {
        type: mongoose.Schema.Types.ObjectId, // id used to get the user detail from contact info (every user must be a contact)
        ref: 'Contact',
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    // soft delete flag
    is_active: {
        type: Boolean,
        default: true
    },
    // created by user id
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // last updated by user id
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // date & time of record creation
    created_date: {
        type: Date,
        required: true
    },
    // last date & time of record updation
    updated_date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// compare encrypted password with the password saved in db
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);