const express = require('express');
const cors = require('cors')
const env = require("dotenv").config();

const connectDB = require('./db/config');

const logger = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorMiddleware");
const userRouts = require('./routs/userRouts')
const kitchenRouts = require('./routs/kitchenRouts')
const recipeRouts = require('./routs/recipeRouts')
const categoryRouts = require('./routs/categoryRouts')
const cuisineRouts = require('./routs/cuisineRouts')
const ratingRouts = require('./routs/ratingRouts')
const app = express()


app.use(express.urlencoded({ extended: false }));
app.use(express.static("storage"));

app.use(logger);

app.use(cors());

app.use(express.json())

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Hello From Kitchenary");
  });

app.use('/api/users', userRouts)
app.use('/api/kitchens', kitchenRouts)
app.use('/api/recipes', recipeRouts)
app.use('/api/categories', categoryRouts)
app.use('/api/cuisines', cuisineRouts)
app.use('/api/ratings', ratingRouts)

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(5000, () => console.log('Server Has started on port 5000'))
    } catch (error) {
        console.log(error);
    }
}
  

startServer();
  
