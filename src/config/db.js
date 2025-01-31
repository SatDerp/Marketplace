import mongoose from "mongoose";
import User from '../models/users.js';
import Listing from '../models/listings.js';
import Car from '../models/car.js';

//connect to db locally
//if you are connected to db on atlas then you need to use uri in .env file
//import dotenv and call dotenv.config() then use process.env.[URIname] as connection url
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Marketplace', { autoIndex: false, });
        console.log("Connected to db");

        //create index for unique emails 
        await User.createIndexes();
        await createUser();

        await Car.createIndexes();
        await createCar();
        // await createListing();
    } catch (e) {
        console.error("Error cant connect to db: ", e);
    }
};


async function createUser() {
    console.log("Creating new user");
    const newUsers = [
        { name: "Willz", age: 21, email: "first@gmail.com", password: "qwerty1" },
        { name: "Mimerz", age: 23, email: "second@gmail.com", password: "qwerty2" },
        { name: "Wai", age: 22, email: "third@gmail.com", password: "qwerty3" },
        { name: "Willz", age: 21, email: "first@gmail.com", password: "qwerty1" },
        { name: "MD", age: 22, password: "qwerty4" },
        { name: "MD", age: 22, email: "hi@gmail.com" },
    ];

    for (let usr of newUsers) {
        try {
            await User.create(usr);
        } catch (e) {
            if (e.code === 11000)
                console.error("Duplicate user")
            else {
                Object.keys(e.errors).forEach((k) => {
                    console.error(e.errors[k].message);
                })
            }
        }
    }


    // try {
    //     const bulkOperation = 
    // } catch (e) {

    // }
}

async function createCar() {
    console.log("Creating new car");

    const newCars = [
        {
            vin: "12345",
            mileage: 26000,
            year: 2022,
            model: "Civic Hatchback",
            make: "Honda",
            color: "White",
            owner: "Willz"
        },
        {
            vin: "67890",
            mileage: 24000,
            year: 2021,
            model: "Civic Sedan",
            make: "Honda",
            color: "Black",
            owner: "Wai"
        },
        {
            vin: "123",
            mileage: 28000,
            year: 2020,
            model: "IS350",
            make: "Lexus",
            color: "White",
            owner: "Mimerz"
        },
        {
            vin: "1234",
            mileage: 28000,
            year: 2020,
            model: "IS350",
            make: "Lexus",
            color: "White",
            owner: "Sam"
        },
        {
            vin: "12345",
            mileage: 28000,
            year: 2020,
            model: "ES350",
            make: "Lexus",
            color: "White",
            owner: "Willz"
        },
    ];

    const ownerID = await User.find({ name: { $in: newCars.map(n => n.owner) } }).distinct("_id", "name");
    console.log(ownerID);

    for (let cars of newCars) {
        try {
            // await Car.create(cars);
        } catch (e) {
            if (e.code === 11000)
                console.error("Duplicate vin/owner")
            else {
                Object.keys(e.errors).forEach((k) => {
                    console.error(e.errors[k].message);
                })
            }
        }
    }

}

// }

// async function createListing() {
//     console.log("Creating listings");

//     const newListings = [
//         {
//             seller: user1._id, //user the id of the create user
//             title: "2022 Honda Civic",
//             description: {

//             },
//             price: 5000
//         },


//     ];

//     const listing1 = new Listing({
//         seller: user1._id, //user the id of the create user
//         title: "2022 Honda Civic",
//         description: {
//             condition: "New",
//             mileage: 26000,
//             year: 2022,
//             model: "Civic Hatchback",
//             make: "Honda",
//             hasTitle: true
//         },
//         price: 5000
//     });

//     try {
//         await listing1.save(); //save instance into the db
//     } catch (e) {
//         Object.keys(e.errors).forEach((k) => {
//             console.error(e.errors[k].message);
//         })
//     }
// }

export default connectDb;
