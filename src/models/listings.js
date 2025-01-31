import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: {
        condition: { type: String, enum: ["New", "Lightly Used", "Salvaged"] },
        hasTitle: Boolean,
        car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }
    },
    datePosted: { type: Date, default: Date.now() },
    price: { type: Number, min: 1, required: true }
});

const Listing = new mongoose.model('Listing', listingSchema);

export default Listing;