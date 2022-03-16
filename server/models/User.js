const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            lowercase: true,
            unique: true,
            min: [4, "is too short (must be at least 4 characters)"],
            mas: [32, "is too long (must be at most 32 characters)"],
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
            index: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid'],
            index: true
        },
        password: {
            type: String,
            required: true
        }
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