const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const { User, Project, Reply } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
    await Project.deleteMany({});
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

    // generating projects
    let createdProjects = [];
    for (let i = 0; i < 50; i++) {
        const randomUserIndex = Math.floor(Math.random() * Object.keys(createdUsers.insertedIds).length);

        const projectData = {
            projectTitle: faker.lorem.words(Math.round(Math.random() * 4) + 1),
            projectBody: faker.lorem.words(Math.round(Math.random() * 20) + 1),
            createdBy: createdUsers.insertedIds[randomUserIndex]._id,
            repoLink: faker.internet.domainName(),
            deployedLink: faker.internet.domainName()
        };

        const createdProject = await Project.create({ ...projectData });

        createdProjects.push(createdProject);

        await User.updateOne(
            { _id: createdUsers.insertedIds[randomUserIndex]._id },
            { $push: { projects: createdProject._id } }
        );
    }


    console.log("Projects have been seeded.");
    console.log("---------------------");


    // generating replies on projects
    let createdReplies = [];
    for (let i = 0; i < 100; i++) {
        const randomUserIndex = Math.floor(Math.random() * Object.keys(createdUsers.insertedIds).length);
        const randomProjectIndex = Math.floor(Math.random() * createdProjects.length);

        const deleted = (Math.floor(Math.random() * 100) + 1) < 5 ? true : false;

        const replyData = {
            replyBody: faker.lorem.words(Math.round(Math.random() * 15) + 1),
            createdBy: createdUsers.insertedIds[randomUserIndex]._id,
            projectId: createdProjects[randomProjectIndex]._id,
            isDeleted: deleted
        };

        const createdReply = await Reply.create({ ...replyData });

        createdReplies.push(createdReply);

        await Project.updateOne(
            { _id: createdProjects[randomProjectIndex]._id },
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
            projectId: createdReplies[randomReplyIndex].projectId,
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
            { $addToSet: { likes: createdUsers.insertedIds[randomUserIndex]._id } }
        )
    }


    console.log("Reply likes have been seeded.");
    console.log("---------------------");


    console.log("All seeds have been completed.");
    console.log("---------------------");
    process.exit(0);
})