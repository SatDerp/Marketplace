import express from "express";
import * as listing from "../controllers/listingController.js";

const listingRouter = express.Router();

//get
listingRouter.get("/", listing.listingList);
listingRouter.get("/:id", listing.listingDetails);
listingRouter.get("/create", listing.listingCreate_get);
listingRouter.get("/:id/delete", listing.listingDelete_get);
listingRouter.get("/:id/update", listing.listingUpdate_get);

//post
listingRouter.post("/create", listing.listingCreate_post);
listingRouter.post("/:id/delete", listing.listingDelete_post);
listingRouter.post("/:id/update", listing.listingUpdate_post);

export default listingRouter;