const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// middle ware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// connect to mongodb
mongoose.connect("mongodb://127.0.0.1/ToDoList", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("connected successfully");
})
.catch((e) => {
    console.log("Error: " + e);
})

// define a schema
const todolistSchema = new mongoose.Schema(
    {
        name: String,
        date: Date,
    }
);

// create a model for todolistSchema
const task = mongoose.model("task", todolistSchema); //mongodb will create a collection named "tasks"

// // create a task object
// const newTask = new task({
//     name: "Go to ce la vi",
//     date: "2024-04-23T19:00:00.000Z"
// });

// // save new task to db
// newTask.save().then(console.log("task is saved")).catch(e => {"Error: " + e});

// routing
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.listen(8000, () => {
    console.log("running to do list on port 8000");
});