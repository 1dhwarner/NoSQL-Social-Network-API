// const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction');
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionBody: { type: String, required: true, max: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const thoughtSchema = new mongoose.Schema(
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
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').
    get(function () { return this.reactions.length; }).
    set(function (v) {
        this.set(this.reactions.length);
    });
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;