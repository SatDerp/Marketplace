
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

mongoose.connect();

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});