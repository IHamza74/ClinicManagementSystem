const mongoose = require("mongoose");

let schema = new mongoose.Schema(
    {
        _id: {
            type: Number,
            required: [true, "You must enter an id for employee"]
        },
        name: {
            type: String,
            required: [true, "You must enter employee name"]
        },
        email: {
            type: String,
            required: [true, "you must enter an e_mail for employee"]
        },
        password: {
            type: String,
            required: [true, "You must enter a password"]
        },
        age: {
            type: String,
        },
        address: {
            type: String,
        }
    }
)
mongoose.model("employees", schema)