const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
dotenv.config();


//connection to DB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},).then((res) => {
    console.log("Database connected");
  }).catch(error => {
     console.log(error);
   });


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
// app.get("/", (req,res)=>{
//     res.send("welcome to home page")
// })
// app.get("/users", (req,res)=>{
//     res.send("welcome to users page")
// })


app.listen(8800,()=>{
    console.log("Server is running");
})