import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name: String,
    img: String,
    type: String,
    phone: String,
    address: String,
    nid: String,
    birth_date: String,
    password: String,
    create_date: String
}, {timestamps: true})

const UserModel = mongoose.model("users", schema)

export default UserModel;

