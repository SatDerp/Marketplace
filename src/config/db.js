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

        await Listing.createIndexes();
        await createListing();
    } catch (e) {
        console.error("Error cant connect to db: ", e);
    }
};

async function mapUsertoId(userNames) {
    //userNames is a list of names we want to map name to id for
    const nameToId = new Map();
    const ownerId = await User.find({name : {$in: userNames} }).lean();

    for (let names of ownerId) {
        nameToId.set(`${names.name}`, names._id);
    }

    return nameToId;
}

async function validateUsers(usersToAdd) {
    let uniqueUsers = []
    let seenEmails = new Set();

    for (let users of usersToAdd) {
        if (users && !seenEmails.has(users.email)) {
            uniqueUsers.push(users);
            seenEmails.add(users.email);
        } 
    }

    const validUsers = await Promise.all(
        uniqueUsers.map(async (user) => {
            try {
                await new User(user).validate();
                return user;
            } catch(e) {
                Object.keys(e.errors).forEach((k) => {
                    console.log(e.errors[k].message);
                })
            }
        })
    ).then(result => result.filter(Boolean));
    
    return validUsers
}

async function createUser() {
    console.log("Creating new users");
    const newUsers = [
        { name: "Willz", age: 21, email: "first@gmail.com", password: "qwerty1" },
        { name: "Mimerz", age: 23, email: "second@gmail.com", password: "qwerty2" },
        { name: "Wai", age: 22, email: "third@gmail.com", password: "qwerty3" },
        { name: "Willz", age: 21, email: "first@gmail.com", password: "qwerty1" },
        { name: "MD", age: 22, password: "qwerty4" },
        { name: "MD", age: 22, email: "hi@gmail.com" },
    ];

    //get valid users from newUsers array batch
    const addUsers = await validateUsers(newUsers);

    if (addUsers.length == 0) {
        console.log("No valid users to add");
    } else {
        try {
            //now we can bulk write but also make sure adding users with new emails
            const bulkOperations = addUsers.map(usr => ({
                updateOne: {
                    filter: {email: usr.email}, 
                    update: {$setOnInsert: usr}, //use this field with upsert so usr is added when we are creating a new document
                    upsert: true, //stands for update and insert and if document on filter DNE then create it
                } 
            }));
    
            //bulkwrite performs bulk operations that are defined in the first param: array of operations
            await User.bulkWrite(bulkOperations);
            console.log("Bulk Insert User complete");
        } catch (e) {
            console.error(e);
        }
    }
}

async function validateCars(carsToAdd) {
    let carsUniqueVins = [];
    let seenVins = new Set();

    for (let car of carsToAdd) { //filter only cars with unique vins 
        if (car && !seenVins.has(car.vin)) {
            carsUniqueVins.push(car);
            seenVins.add(car.vin);
        }
    }

    const namesList = carsUniqueVins.map(usr => (usr.owner));
    const nameToIdMap = await mapUsertoId(namesList);
    //populate the owner field with the object ids
    for (let n of carsUniqueVins) {
        n.owner = nameToIdMap.get(n.owner)
    }
    
    //validate unique cars async
    const validCars = await Promise.all(
        carsUniqueVins.map(async (car) => {
            try {
                await new Car(car).validate();
                return car;
            } catch (e) {
                Object.keys(e.errors).forEach((k) => {
                    console.log(e.errors[k].message);
                })
            }
        })
    ).then(results => results.filter(Boolean));

    return validCars;
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
            make: "Toyota",
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
        }, //owner DNE
        {
            vin: "12345",
            mileage: 28000,
            year: 2020,
            model: "ES350",
            make: "Lexus",
            color: "White",
            owner: "Willz"
        }, //same vin
        {
            vin: "99",
            year: 2021,
            model: "Civic Sedan",
            make: "Honda",
            color: "Black",
            owner: "Mimerz"
        } //missing mileage info
    ];

    const validCars = await validateCars(newCars);
    // console.log("valid cars to add to db", validCars);

    if (validCars.length == 0) {
        console.log("No valid cars to add");
    } else {
        try {
            const bulkOp = validCars.map(car => ({
                updateOne: {
                    filter: {vin: car.vin},
                    update: {$setOnInsert: car},
                    upsert: true
                }
            }));
    
            await Car.bulkWrite(bulkOp);
            console.log("Bulk Insert Cars Complete");
        } catch (e) {
            console.error(e);
        }
    }
}

async function mapCarToId(carNames) {
    const carToCarId = new Map();
    const listOfCars = await Car.find({make: {$in : carNames} }).lean();

    for (let car of listOfCars) {
        carToCarId.set(`${car.make}`, car._id);
    }

    return carToCarId;
}

async function validateListings(listingsToAdd){
    //make sure that seller and car exists
    const listingNames = listingsToAdd.map(list => (list.seller));
    const listingCars = listingsToAdd.map(list => (list.description.car));

    const nameToUserId = await mapUsertoId(listingNames);
    const carToCarId = await mapCarToId(listingCars);

    //fill in seller and car objectIds
    for (let listing of listingsToAdd) {
        listing.seller = nameToUserId.get(listing.seller);
        listing.description.car = carToCarId.get(listing.description.car);
    }

    //do input validation 
    const validListings = await Promise.all(
        listingsToAdd.map(async (listing) => {
            try {
                await new Listing(listing).validate();
                
                return listing;
            } catch(e) {
                Object.keys(e.errors).forEach((k) => {
                    console.log(e.errors[k].message);
                })
            }
        })
    ).then(res => res.filter(Boolean));

    return validListings;
}

async function createListing() {
    console.log("Creating listings");

    const newListings = [
        {
            seller: "Willz",
            title: "Used 2022 Honda Civic",
            description: {
                condition: "Lightly Used",
                hasTitle: true,
                car: "Honda"
            },
            price: 5000
        },
        {
            seller: "Wai",
            title: "New Toyota",
            description: {
                condition: "New",
                hasTitle: true,
                car: "Toyota",
            },
            price: 8000
        },
        {
            seller: "Mimerz",
            title: "Used Lexus",
            description: {
                condition: "Lightly Used",
                hasTitle: true,
                car: "Lexus",
            },
            price: 10000
        },
        {
            seller: "Mimerz",
            title: "Lexus",
            description: {
                condition: "Like new", //invalid condition
                hasTitle: true,
                car: "Lexus",
            },
            price: 10000
        },
        {
            seller: "Sam", //no user
            title: "Lexus",
            description: {
                condition: "New", 
                hasTitle: true,
                car: "Lexus",
            },
            price: 10000
        },
        {
            seller: "Willz", 
            title: "Lexus",
            description: {
                condition: "New", 
                hasTitle: true,
            }, //no car
            price: 10000
        },
    ];

    const addListings = await validateListings(newListings);

    if (addListings.length == 0) {
        console.log("No listings to add");
    } else {
        try {
            const bulkOp = addListings.map(listing => ({
                updateOne: {
                    filter: {seller: listing.seller},
                    update: {$setOnInsert: listing},
                    upsert: true
                }
            }));

            await Listing.bulkWrite(bulkOp);
            console.log("Bulk Insert on Listing Complete")
        } catch (e) {
            console.log(e);
        }
    }
}

export default connectDb;