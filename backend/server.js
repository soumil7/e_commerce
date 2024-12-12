import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import itemRouter from "./routers/itemRoute.js"
import userRouter from "./routers/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routers/cartRoute.js"
import orderRouter from "./routers/orderRoute.js"

// app config

const app = express()
const port = process.env.PORT || 3000

// middleware
// first middleware express.json()
// request from front to back end that will be passed using json
app.use(express.json())

//access anything from the frontend
app.use(cors())

// db connection 
connectDB();

//api endpoints
app.use("/api/item", itemRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

//get -> HTTP method ; we request data from server
app.get("/", (req, res)=> {
    res.send("API Working")
})


//to run express server
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://sec21ad097:9994516871@cluster0.ckcfbpe.mongodb.net/?


// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import itemRouter from "./routers/itemRoute.js";
// import userRouter from "./routers/userRoute.js";
// import 'dotenv/config.js';
// import cartRouter from "./routers/cartRoute.js";
// import orderRouter from "./routers/orderRoute.js";

// // app config
// const app = express();
// const port = process.env.PORT || 3000;

// // middleware
// // parse JSON request bodies
// app.use(express.json());

// // enable CORS
// app.use(cors());

// // connect to the database
// connectDB();

// // serve static files from the /dist folder
// app.use(express.static("dist"));

// // API endpoints
// app.use("/api/item", itemRouter);
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// // fallback route for serving the frontend's index.html
// app.get("*", (req, res) => {
//     res.sendFile("index.html", { root: "dist" });
// });

// // start the server
// app.listen(port, () => {
//     console.log(`Server Started on http://localhost:${port}`);
// });

// // mongodb+srv://sec21ad097:9994516871@cluster0.ckcfbpe.mongodb.net/?
