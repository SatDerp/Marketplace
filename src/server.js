import express from 'express';
import mongoose, { mongo } from 'mongoose';

const app = express();
const port = 3000;

//connect to db locally
//if you are connected to db on atlas then you need to use uri in .env file
//import dotenv and call dotenv.config() then use process.env.[URIname] as connection url
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Marketplace');
    console.log("Connected to db");
} catch (e) {
    console.error("Error cant connect to db: ", e);
}

//create new Schema that serves as template
const newListing = new mongoose.Schema({
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
    seller: String,
    datePosted: { type: Date, default: Date.now() },
    price: { type: Number, min: 1 }
});

//create model which is a wrapper class that we can use to crud
const listingModel = new mongoose.model('Listing', newListing);

//create document or instance of model
const user1List = new listingModel({
    title: "2022 Honda Civic",
    description: {
        condition: "New",
        mileage: 26000,
        year: 2022,
        model: "Civic Hatchback",
        make: "Honda",
        hasTitle: true
    },
    seller: "Willz",
    price: 5000
});

try {
    await user1List.save(); //save instance into the db
} catch (e) {
    Object.keys(e.errors).forEach((k) => {
        console.error(e.errors[k].message);
    })
}


await listingModel.find({ title: "2022 Honda Civic" }).then(() => {
    console.log("successful");
}); //try to find data in the model using title

//send browser files that it requests
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});