const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            lowercase: true,
            unique: true,
            minLength: [4, "is too short (must be at least 4 characters)"],
            maxLength: [32, "is too long (must be at most 32 characters)"],
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, 'is invalid (must have only letters and numbers)'],
            index: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'is invalid']
        },
        password: {
            type: String,
            required: true
        },
        emailIsVerified: {
            type: Boolean,
            required: true,
            default: false
        },
        characterPresets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CharacterPreset",
            required: true,
            default: []
        }],
        gamePresets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "GamePreset",
            required: true,
            default: []
        }]
    },
    { timestamps: true },
)

UserSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err,passwordHash) => {
        if(err) {
            return next(err);
        }
        this.password = passwordHash;
        next();
    })
})

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch)=>{
        if(err) { return cb(err); }
        if(!isMatch) { return cb(null, isMatch); }
        return cb(null, this);
    });
}

module.exports = mongoose.model('User', UserSchema)