const mongoose = require("mongoose");
const schema = mongoose.Schema;
let employeeSchema = new schema(
    {
        _id: schema.Types.ObjectId,
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
mongoose.model("employees", employeeSchema)