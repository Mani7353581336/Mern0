

const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const app = express();
const UserModel = require('./models/Users');

const cors = require("cors");


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Manipal:z9QzXTFvc6DNSAro@cluster0.wzk4g8j.mongodb.net/merntutorial?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, })

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            req.json(err)
        } else {
            res.json(result)
        }
    })
    // res.send("Hello world to node.js 2")
});

app.post("/createUsers", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
})

app.listen(5000, () => {
    console.log("server started at port :5000")
})