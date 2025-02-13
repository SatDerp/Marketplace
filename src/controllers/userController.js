import User from "../models/users.js";

//display user list
export const userList = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch(e) {
        return next(e);
    }
}

//display user details by id
export const userDetails = (req, res, next) => {
    try {
        if (req.params.id)
        
        res.send(`TO BE IMPLEMENTED: user details: ${req.params.id}`)
    } catch(e) {
        return next(e);
    }
}

//display user create form on GET
export const userCreate_get = (req, res, next) => {
    try {
        res.send(`TO BE IMPLEMENTED: user create GET`)
    } catch(e) {
        return next(e);
    }
}

//handle user create on POST
export const userCreate_post = (req, res, next) => {
    try {
        res.send(`TO BE IMPLEMENTED: user create POST`)
    } catch(e) {
        return next(e);
    }
}

//display user delete form on GET
export const userDelete_get = (req, res, next) => {
    try {
        res.send(`TO BE IMPLEMENTED: user delete GET`)
    } catch(e) {
        return next(e);
    }
}

//handle user delete on POST
export const userDelete_post = (req, res, next) => {
    try {
        res.send(`TO BE IMPLEMENTED: user delete POST`)
    } catch(e) {
        return next(e);
    }
}

//display user update form on GET
export const userUpdate_get = (req, res, next) => {
    try {
        res.send(`TO BE IMPLEMENTED: user update GET`)
    } catch(e) {
        return next(e);
    }
}

//handle user update on POST
export const userUpdate_post = (req, res, next) => {
    try {
        res.send(`TO BE IMPLEMENTED: user update POST`)
    } catch(e) {
        return next(e);
    }
}