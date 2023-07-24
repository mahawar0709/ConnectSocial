const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const multer = require("multer")
dotenv.config();
var cors = require('cors');
app.use(cors({origin: true, credentials: true}));
const path = require("path")
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

app.use("/images", express.static(path.join(__dirname, "public/images")));

   const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage});
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

// app.get("/users", (req,res)=>{
//     res.send("welcome to users page")
// })


app.listen(3001,()=>{
    console.log("Server is running");
})