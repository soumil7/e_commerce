import express from "express";
import itemController from "../controllers/itemController.js";

//image storage 
import multer from "multer"

const itemRouter = express.Router(); 

// Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

itemRouter.post("/add", upload.single("image"), itemController.addItem)
itemRouter.get("/list", itemController.listItem)
itemRouter.post("/remove", itemController.removeItem)

export default itemRouter;