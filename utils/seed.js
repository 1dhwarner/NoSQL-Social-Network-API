const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUser, getRandomThought } = require('.data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connection open');

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Drop exisitng users
    await User.deleteMany({});

    // Create empty array to hold users
    const users = [];

    // Loop 20 times -- add users to the users array 
    for (let i = 0; i < 20; i++) {
        // Get some random reaction objects using a helper function that we imported from ./data
        const reactions = getRandomReactions(20);


    }
})