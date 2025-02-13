import Listing from "../models/listings.js";


//display listings
export const listingList = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: listings list");
    } catch(e) {
        return next(e);
    }
};

//display specific listing from id
export const listingDetails = (req, res, next) => {
    try {
        res.send(`TO BE IMPLEMENTED: listing details: ${req.params.id}`);
    } catch (e) {
        return next(e);
    }
};

//display create listing form on GET
export const listingCreate_get = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: listing create on GET");
    } catch(e) {
        return next(e);
    }
};

//handle create listing on POST
export const listingCreate_post = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: listing create on POST");
    } catch(e) {
        return next(e);
    }
}

//display delete listing form on GET
export const listingDelete_get = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: listing delete on GET");
    } catch(e) {
        return next(e);
    }
}

//handle delete listing on POST
export const listingDelete_post = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: listing delete on POST");
    } catch(e) {
        return next(e);
    }
}

//display update listing form on GET
export const listingUpdate_get = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: listing update on GET");
    } catch(e) {
        return next(e);
    }
}

//handle update listing on POST
export const listingUpdate_post = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: listing update on POST");
    } catch(e) {
        return next(e);
    }
}