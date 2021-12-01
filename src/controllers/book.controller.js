const express = require("express");
const bookModel = require("../models/book.model");
const authorModel = require("../models/author.model");
const sectionModel = require("../models/section.model");

const router = express.Router();


// create a book
router.post("/", async (req, res) => {
    try {
        let books = await bookModel.create(req.body);
        let newBookId = books._id;
        let authorIds = req.body.author_ids;
        let sectionId = req.body.section_id;

        authorIds.forEach(async (authorId) => {
            let author = await authorModel.findByIdAndUpdate(authorId, { $push: { "books": { newBookId } } }, { new: true }).lean().exec();
        })

        let sectionUpdate = await sectionModel.findByIdAndUpdate(sectionId, { $push: { "all_books": newBookId } }, { new: true }).lean().exec();

        res.status(200).send(books);
    }
    catch (e) {
        res.status(500).send({ status: "failed", message: e.message })
    }
});


// get all books
router.get("/", async (req, res) => {
    try {
        let books = await bookModel.find({}).populate("section_id").lean().exec();
        console.log(books);

        res.status(200).send(books);
    }
    catch (e) {
        res.status(500).send({ status: "failed", message: e.message })
    }
});


// find books that are checked out
router.get("/checkouts", async (req, res) => {
    try {
        let books = await bookModel.find({ "checked_out": "true" }, { "name": true, "checked_out": true, "_id": false }).populate("section_id").lean().exec();
        console.log(books);

        res.status(200).send(books);
    }
    catch (e) {
        res.status(500).send({ status: "failed", message: e.message })
    }
});



// find books in a section
router.get("/section/:sectionId", async (req, res) => {
    try {
        let books = await bookModel.find({ "section_id": req.params.sectionId }, { "name": true }).populate("section_id").lean().exec();
        console.log(books);

        res.status(200).send(books);
    }
    catch (e) {
        res.status(500).send({ status: "failed", message: e.message })
    }
});


// find books in a section that are not checked out
router.get("/notcheckedout/:sectionId", async (req, res) => {
    try {
        let books = await bookModel.find({ $and: [{ "section_id": req.params.sectionId }, { "checked_out": "false" }] }, { "name": true }).populate("section_id").lean().exec();
        console.log(books);

        res.status(200).send(books);
    }
    catch (e) {
        res.status(500).send({ status: "failed", message: e.message })
    }
});


//find books of 1 author inside a section
router.get("/:author/:sectionId", async (req, res) => {
    try {
        let books = await bookModel.find({ $and: [{ "author_ids": req.params.author }, { "section_id": req.params.sectionId }] }, { "name": true }).populate("section_id").lean().exec();
        console.log(books);

        res.status(200).send(books);
    }
    catch (e) {
        res.status(500).send({ status: "failed", message: e.message })
    }
});



module.exports = router;