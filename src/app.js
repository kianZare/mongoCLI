const yargs = require ("yargs");
const {client , connect} = require ("./db/connection");
const Movie = require("./utils/index")

async function app (yargsinput) {
    const movieCollection = await connect();
    if (yargsinput.create){
        console.log("Entering Create");
        const newMovie = new Movie (yargsinput.title, yargsinput.actor);
        await newMovie.create(movieCollection);
        // code to add move put here
    } else if (yargsinput.read) {
        console.log("Entering Read");
        // code to list movies goes here
        const results = await movieCollection.find({}).toArray();
        console.table(results);

    } else if (yargsinput.updateActor) {
        console.log("Entering UpdateActor");
        // code to update movies detail goes here
        const myQuery = {title: yargsinput.title};
        const updateActor = {$set: {actor: yargsinput.actor}};
        console.log (updateActor)
        const updateResult = await movieCollection.updateOne(myQuery, updateActor);
        console.log(updateResult);

    } else if (yargsinput.updateTitle) {
        console.log("Entering Update");
        // code to update movies detail goes here
        const myQuery = {actor: yargsinput.actor};
        const updateTitle = {$set: {title: yargsinput.title}};
        const updateResult = await movieCollection.updateOne(myQuery, updateTitle);
        console.log(updateResult);

    } else if (yargsinput.delete) {
        console.log("Entering Delete");
        // code to delete a movies goes here
        const myQuery = {title: yargsinput.title};
        const deleteResult = await movieCollection.deleteOne(myQuery);
        // console.log(deleteResult);
        if (result.deletedCount === 1 ){
            console.log ("Film successfuly deleted");
        }
    } else {
        console.log("command not recognised.")
    };
    await client.close();
};

app(yargs.argv);