const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const mongoose = require('mongoose');

// Schema to create User model 
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        // update regex 
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        // Array of _id values referencing the Thought model
        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        // Array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').
    get(function () { return this.friends.length; }).
    set(function (v) {
        this.set(this.friends.length);
    });
// Initialize User model
const User = model('user', userSchema);

module.exports = User;
