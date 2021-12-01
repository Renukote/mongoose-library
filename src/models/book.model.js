const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
    name: { type: String, required: true },
    body: { type: String, required: true },
    author_ids: [{ type: mongoose.Schema.Types.ObjectId, required: true, path: "authors" }],
    section_id: { type: mongoose.Schema.Types.ObjectId, required: true, path: "sections" },
    checked_out: { type: String, required: false, default: "false" },
    checked_out_by: { type: String, required: false, default: "none"}
},  
    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model("books", bookModel);