import express from 'express'
import User_Controller from '../Controllers/UserController.js'
import { OrderController } from '../Controllers/OrderController.js'
import { Admin_controller } from '../Controllers/AdminController.js'
const router = express.Router()

//login

router.post('/login',User_Controller.login)
router.get('/get-user/:id',User_Controller.get_users)

//orders
router.post('/placeOrder',OrderController.placeOrder)
router.get('/getOrders',OrderController.getOrders)
router.get('/order/:orderid',OrderController.generateBill)
router.post('/generateBill/:orderid/:userid',OrderController.generateBill)
router.get('/bills',OrderController.bills)
router.get('/bills/:userid',OrderController.billsByUser )
router.get('/all-items',Admin_controller.getAllItems)



//profile updations
// router.get('/testPopulation/:id',OrderController.populate)

//Manage Subscriptions



export default router;
