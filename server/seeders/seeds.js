const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const { User, Post, Reply } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Reply.deleteMany({});

    const userData = [];

    // generating users
    for (let i = 0; i < 50; i++) {
        const username = faker.internet.userName();
        userData.push({
            username: username,
            email: faker.internet.email(username),
            password: faker.internet.password(),
            profileImage: faker.image.avatar()
        });
    }

    const createdUsers = await User.collection.insertMany(userData);

    console.log(Object.keys(createdUsers.insertedIds).length);

    console.log("Users have been seeded.");
    console.log("---------------------");

    // adding friends for users
    for (let i = 0; i < 100; i++) {
        let randomUserIndex = Math.floor(Math.random() * Object.keys(createdUsers.insertedIds).length);
        const _id = createdUsers.insertedIds[randomUserIndex];

        let friendId = _id;

        while (friendId === _id) {
            randomUserIndex = Math.floor(Math.random() * Object.keys(createdUsers.insertedIds).length);
            friendId = createdUsers.insertedIds[randomUserIndex];
        }


        await User.updateOne({ _id: _id }, { $addToSet: { friends: friendId } });
    }


    console.log("Friends have been seeded.");
    console.log("---------------------");

    // generating posts
    let createdPosts = [];
    for (let i = 0; i < 50; i++) {
        const randomUserIndex = Math.floor(Math.random() * Object.keys(createdUsers.insertedIds).length);

        const postData = {
            postBody: faker.lorem.words(Math.round(Math.random() * 20) + 1),
            createdBy: createdUsers.insertedIds[randomUserIndex]._id,
            repoLink: faker.internet.domainName(),
            deployedLink: faker.internet.domainName()
        };

        const createdPost = await Post.create({ ...postData });

        createdPosts.push(createdPost);

        await User.updateOne(
            { _id: createdUsers.insertedIds[randomUserIndex]._id },
            { $push: { posts: createdPost._id } }
        );
    }


    console.log("Posts have been seeded.");
    console.log("---------------------");


    // generating replies on posts
    let createdReplies = [];
    for (let i = 0; i < 100; i++) {
        const randomUserIndex = Math.floor(Math.random() * Object.keys(createdUsers.insertedIds).length);
        const randomPostIndex = Math.floor(Math.random() * createdPosts.length);

        const deleted = (Math.floor(Math.random() * 100) + 1) < 5 ? true : false;

        const replyData = {
            replyBody: faker.lorem.words(Math.round(Math.random() * 15) + 1),
            createdBy: createdUsers.insertedIds[randomUserIndex]._id,
            postId: createdPosts[randomPostIndex]._id,
            isDeleted: deleted
        };

        const createdReply = await Reply.create({ ...replyData });

        createdReplies.push(createdReply);

        await Post.updateOne(
            { _id: createdPosts[randomPostIndex]._id },
            { $push: { replies: createdReply._id } }
        );
    }


    console.log("Replies have been seeded.");
    console.log("---------------------");

    // generating nested replies
    for (let i = 0; i < 200; i++) {
        const randomUserIndex = Math.floor(Math.random() * Object.keys(createdUsers.insertedIds).length);
        const randomReplyIndex = Math.floor(Math.random() * createdReplies.length);

        const deleted = (Math.floor(Math.random() * 100) + 1) < 5 ? true : false;

        const replyData = {
            replyBody: faker.lorem.words(Math.round(Math.random() * 15) + 1),
            createdBy: createdUsers.insertedIds[randomUserIndex]._id,
            postId: createdReplies[randomReplyIndex].postId,
            parentReplyId: createdReplies[randomReplyIndex]._id,
            isDeleted: deleted
        };

        const createdReply = await Reply.create({ ...replyData });

        createdReplies.push(createdReply);

        await Reply.updateOne(
            { _id: createdReplies[randomReplyIndex]._id },
            { $push: { replies: createdReply._id } }
        );
    }


    console.log("Nested Replies have been seeded.");
    console.log("---------------------");

    // generating likes on replies
    for (let i = 0; i < createdReplies.length * 3; i++) {
        const randomUserIndex = Math.floor(Math.random() * Object.keys(createdUsers.insertedIds).length);
        const randomReplyIndex = Math.floor(Math.random() * createdReplies.length);

        await Reply.updateOne(
            { _id: createdReplies[randomReplyIndex]._id },
            { $push: { likes: createdUsers.insertedIds[randomUserIndex]._id } }
        )
    }


    console.log("Reply likes have been seeded.");
    console.log("---------------------");


    console.log("All seeds have been completed.");
    console.log("---------------------");
    process.exit(0);
})