// const connection = require('../config/connection');
// const { Thought, User } = require('../models');
// const { getRandomUsername, getRandomReactions } = require('.data');

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//     console.log('connection open');

//     // Drop existing thoughts
//     await Thought.deleteMany({});

//     // Drop exisitng users
//     await User.deleteMany({});

//     // Create empty array to hold users
//     const users = [];

//     // Loop 20 times -- add users to the users array 
//     for (let i = 0; i < 20; i++) {
//         // Get some random reaction objects using a helper function that we imported from ./data
//         const reactions = getRandomReactions(20);

//         // not complete 
//         const username = getRandomUsername();
//         const email = `${i} thought`;
//         const thoughts = `${i} thought`;

//         users.push({
//             username,
//             email,
//             thoughts,
//             reactions,
//         });
//     }

//     // Add students to the collection and await the results
//     await User.collection.insertMany(users);

//     // Add thoughts to the collection and await the results

//     // await Thought.collection.insertOne({
//     //     thoughtText: 'I like turtles',
//     //     user: [...users],
//     // });

//     // Log out the seed data to indicate what should appear in the database
//     console.table(users);
//     console.info('Seeding complete! 🌱');
//     process.exit(0);
// })

