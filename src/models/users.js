import mongoose from "mongoose";

//create new Schema that serves as template
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() },
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listings" }]
});

//create model which is a wrapper class that we can use to crud
const User = new mongoose.model('User', userSchema);
export default User;