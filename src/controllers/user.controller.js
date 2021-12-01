const express = require("express");
const userModel = require("../models/user.model");

const router = express.Router();

// get all users
router.get("/", async(req,res) => {
    try {
        let users = await userModel.find({}).lean().exec();
        console.log(users);
    
        res.status(200).send(users || "no user");
    }
    catch(e) {
        res.status(500).send({status: "failed", message: e.message})
    }
});

// create a new user
router.post("/", async(req,res) => {
    try {
        let users = await userModel.create(req.body);
        console.log(users);
    
        res.status(200).send(users);
    }
    catch(e) {
        res.status(500).send({status: "failed", message: e.message})
    }
});


module.exports = router;