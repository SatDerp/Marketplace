import express from "express";
import * as user from "../controllers/userController.js";

const userRouter = express.Router();

//router middleware for get requests
userRouter.get("/", user.userList); //endpoint at: "/users"
userRouter.get("/:id", user.userDetails) //endpoint at: "/users/1234"
userRouter.get("/create", user.userCreate_get);
userRouter.get("/:id/delete", user.userDelete_get);
userRouter.get("/:id/update", user.userUpdate_get);

//router middleware for post requests
userRouter.post("/create", user.userCreate_post);
userRouter.post("/:id/delete", user.userDelete_post);
userRouter.post("/:id/update", user.userUpdate_post);

export default userRouter;
