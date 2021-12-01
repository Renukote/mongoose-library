const mongoose = require("mongoose");

const sectionModel = new mongoose.Schema({
    name: { type: String, required: true },
    all_books: [{
        book_ids: { type: mongoose.Schema.Types.ObjectId },
        required: false
    }]
},
    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model("sections", sectionModel);