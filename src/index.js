const express = require("express");
const connect = require("./configs/db.js");


const userController = require("./controllers/user.controller");
const sectionController = require("./controllers/section.controller");
const bookController = require("./controllers/book.controller");
const authorController = require("./controllers/author.controller");

const app = express();
app.use(express.json());

app.use("/users", userController);
app.use("/sections", sectionController);
app.use("/books", bookController);
app.use("/authors", authorController);


app.listen(2255, async () => {
    await connect();
    console.log("Listening to port 2255");
})


