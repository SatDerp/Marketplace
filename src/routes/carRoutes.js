import express from "express";
import * as car from "../controllers/carController.js";

const carRouter = express.Router();

//get
carRouter.get("/", car.carList); // endpoint at: "/cars" for GET request
carRouter.get("/:id", car.carDetails); //endpoint at: "/cars/1234"
carRouter.get("/create", car.carCreate_get);
carRouter.get("/:id/delete", car.carDelete_get);
carRouter.get("/:id/update", car.carUpdate_get);

//post
carRouter.post("/create", car.carCreate_post); //endpoint at: "/cars" for POST request
carRouter.post("/:id/delete", car.carDelete_post);
carRouter.post("/:id/update", car.carUpdate_post);

export default carRouter;