import Car from "../models/car.js";

//display list of cars
export const carList = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: car list");
    } catch (e) {
        return next(e);
    }
};

//display car details based on id
export const carDetails = (req, res, next) => {
    try {
        res.send(`TO BE IMPLEMENTED: car details ${req.params.id}`);
    } catch (e) {
        return next(e);
    }
};

//display car create form on GEt
export const carCreate_get = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: car create on GET");
    } catch (e) {
        return next(e);
    }
};

//handle car create on POST
export const carCreate_post = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: car create on POST");
    } catch (e) {
        return next(e);
    }
};

//display car delete form on GET
export const carDelete_get = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: car delete on GET");
    } catch (e) {
        return next(e);
    }
};

//handle car delete on POST
export const carDelete_post = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: car delete on POST");
    } catch (e) {
        return next(e);
    }
};

//display car update form on GET
export const carUpdate_get = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: car update on GET");
    } catch (e) {
        return next(e);
    }
};

//handle car update on POST
export const carUpdate_post = (req, res, next) => {
    try {
        res.send("TO BE IMPLEMENTED: car update on POST");
    } catch (e) {
        return next(e);
    }
};