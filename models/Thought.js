const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
            }
        ],
        toJSON: {
            virtuals: true,
        },
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}`
    })

    .set(function () {
        const reactions = [{ reactions }]
        this.set({ reactions });
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;