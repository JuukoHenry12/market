const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const cors = require('cors');
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const userRouter =require('./Routes/UserRouter')
const productRouter =require('./Routes/ProductRoute')

app.use(express.json())
app.use(cors());
//user routers
app.use('/api/user/',userRouter)

//product router
app.use('/api/product/',productRouter)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
});

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
