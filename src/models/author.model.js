const mongoose = require("mongoose");

const authorModel = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    books: [{
        book_ids: { type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    path: "authors" }
    }]
},
{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("authors", authorModel);