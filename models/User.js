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
        // update regex 
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
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
                ref: 'User.friend',
            }
        ],
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`
    })

    .set(function () {
        const friends = [{ friends }]
        this.set({ friends });
    });


// Initialize User model
const User = model('user', userSchema);

module.exports = User;
