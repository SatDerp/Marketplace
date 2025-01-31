import express from 'express';
import connectDb from './config/db.js';

connectDb();
const app = express();
const port = 3000;

//send browser files that it requests
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});