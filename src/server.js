import express from 'express';
import mongoose, { isObjectIdOrHexString, mongo, Mongoose } from 'mongoose';

const app = express();
const port = 3000;

//connect to db locally
//if you are connected to db on atlas then you need to use uri in .env file
//import dotenv and call dotenv.config() then use process.env.[URIname] as connection url
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Marketplace', { autoIndex: false });
    console.log("Connected to db");
} catch (e) {
    console.error("Error cant connect to db: ", e);
}

//create new Schema that serves as template
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() },
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listings" }]
});

const listingSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: {
        condition: { type: String, enum: ["New", "Lightly Used", "Salvaged"] },
        mileage: { type: Number, required: true },
        year: { type: Number, required: true },
        model: { type: String, required: true },
        make: { type: String, required: true },
        color: String,
        hasTitle: Boolean
    },
    datePosted: { type: Date, default: Date.now() },
    price: { type: Number, min: 1 }
});

//create model which is a wrapper class that we can use to crud
const User = new mongoose.model('User', userSchema);
const Listing = new mongoose.model('Listing', listingSchema);

//create document or instance of model
const user1 = new User({
    name: "Willz",
    age: 21,
    email: "123@gmail.com",
    password: "qwerty"
});

try {
    await user1.save(); //save instance into the db
} catch (e) {
    Object.keys(e.errors).forEach((k) => {
        console.error(e.errors[k].message);
    })
}

const listing1 = new Listing({
    seller: user1._id, //user the id of the create user
    title: "2022 Honda Civic",
    description: {
        condition: "New",
        mileage: 26000,
        year: 2022,
        model: "Civic Hatchback",
        make: "Honda",
        hasTitle: true
    },
    price: 5000
});

try {
    await listing1.save(); //save instance into the db
} catch (e) {
    Object.keys(e.errors).forEach((k) => {
        console.error(e.errors[k].message);
    })
}

await User.updateOne({ name: "Willz" }, { $set: { listings: listing1._id } });
await user1.save();

console.log(await Listing.findOne({ title: "2022 Honda Civic" }));
const res = await Listing.findOne({ title: "2022 Honda Civic" }).populate("seller");
console.log(res);

// await listingModel.find({ title: "2022 Honda Civic" }).then(() => {
//     console.log("successful");
// }); //try to find data in the model using title


//send browser files that it requests
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});