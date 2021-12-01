const express = require("express");
const authorModel = require("../models/author.model");
const bookModel = require("../models/book.model");

const router = express.Router();


// create an author
router.post("/", async (req, res) => {
    try {
        let authors = await authorModel.create(req.body);
        console.log(authors);

        res.status(200).send(authors);
    }
    catch (e) {
        res.status(500).send({ status: "failed", message: e.message })
    }
});


// get all authors
router.get("/booksby/:authorid", async (req, res) => {
    try {
        let authors = await authorModel.findById(req.params.authorid).populate({ path: "books",
                                                                                 populate:{ path:  "_id"} }).lean().exec();
        console.log(authors);

        res.status(200).send(authors);
    }
    catch (e) {
        res.status(500).send({ status: "failed", message: e.message })
    }
});


module.exports = router;