import mongoose, { mongo } from "mongoose";

const carSchema = new mongoose.Schema({
    vin: { type: String, required: true, unique: true },
    mileage: { type: Number, required: true },
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    color: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }
});

const Car = new mongoose.model('Car', carSchema);

export default Car;