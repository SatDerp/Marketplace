import express from 'express';
import connectDb from './config/db.js';
import userRouter from './routes/userRoutes.js';
import carRouter from './routes/carRoutes.js';
import listingRouter from './routes/listingRoutes.js';

connectDb(); 
const app = express();
const port = 3000;

//send browser the files in public that it requests
app.use(express.static("public"));

//specify which routers to use based on what url  
app.use("/api/users", userRouter); //for urls like ".../api/users" use userRouter to handle those requests
app.use("/api/cars", carRouter);
app.use("/api/listings", listingRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});