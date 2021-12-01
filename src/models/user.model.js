const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    name: { type: String, required: true },
    has_checked_out: { type: String, required: false, default: false },
    checked_out_book_id: { type: mongoose.Schema.Types.ObjectId, path: "books", required: false}
},
{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("users",userModel);