
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://william12102003:fFUM3rzdDvq4Pcsb@cluster0.niwip.mongodb.net/");

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});