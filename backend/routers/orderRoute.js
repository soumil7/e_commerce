import express from "express";
import authMiddleware from "../middleware/auth.js";
import orderController from "../controllers/orderController.js"

const orderRouter = express.Router(); 

//creating API's

orderRouter.post("/place", authMiddleware, orderController.placeOrder); 
orderRouter.post("/verify", orderController.verifyOrder)
orderRouter.post('/userorders', authMiddleware, orderController.userOrders)
orderRouter.get('/list', orderController.listOrders)
orderRouter.post("/status", orderController.updateStatus)

export default orderRouter;
