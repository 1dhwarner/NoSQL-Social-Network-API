const { Schema, model } = require('mongoose');
const thoughtSchema = require('/Thought');

// Schema to create User model 
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        // Array of _id values referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        // Array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        toJSON: {
            virtuals: true,
        },
    }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.arr.length}`
    })

    .set(function () {
        const arr = [{ friends }]
        this.set({ arr });
    });


// Initialize User model
const User = model('user', userSchema);

module.exports = User;
