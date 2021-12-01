const express = require("express");
const sectionModel = require("../models/section.model");

const router = express.Router();

// post a section
router.post("/", async(req,res) => {
    try {
        let section = await sectionModel.create(req.body);
        console.log(section);
    
        res.status(200).send(section);
    }
    catch(e) {
        res.status(500).send({status: "failed", message: e.message})
    }
});


// get all sections
router.get("/", async(req,res) => {
    try {
        let section = await sectionModel.find({}).lean().exec();
        console.log(section);
    
        res.status(200).send(section);
    }
    catch(e) {
        res.status(500).send({status: "failed", message: e.message})
    }
});


module.exports = router;